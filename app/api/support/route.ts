import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { findNearby } from '@/lib/geolocation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const radius = parseFloat(searchParams.get('radius') || '50');

    let where: any = {
      isVerified: true,
      isAvailable: true,
    };

    if (type) {
      where.type = type;
    }

    const profiles = await prisma.supportProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
          },
        },
      },
    });

    // If location provided, sort by distance
    if (lat && lon) {
      const userLat = parseFloat(lat);
      const userLon = parseFloat(lon);
      
      const nearby = findNearby(
        profiles.map(p => ({
          ...p,
          latitude: p.latitude,
          longitude: p.longitude,
        })),
        userLat,
        userLon,
        radius
      );

      return NextResponse.json({
        success: true,
        profiles: nearby.map(item => ({
          ...item.profile,
          distance: Math.round(item.distance * 10) / 10,
        })),
      });
    }

    return NextResponse.json({ success: true, profiles });
  } catch (error) {
    console.error('Error fetching support profiles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch support profiles' },
      { status: 500 }
    );
  }
}


