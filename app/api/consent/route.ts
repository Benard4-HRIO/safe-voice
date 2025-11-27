import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Add this line to explicitly mark the route as dynamic
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action, details } = body;

    // Validate required fields
    if (!userId || !action) {
      return NextResponse.json(
        { success: false, error: 'User ID and action are required' },
        { status: 400 }
      );
    }

    // Log consent action
    await prisma.consentLog.create({
      data: {
        userId,
        action,
        details: details ? JSON.stringify(details) : null,
      },
    });

    // Handle different consent actions
    if (action === 'GIVEN') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          consentGiven: true,
          consentDate: new Date(),
        },
      });
    } else if (action === 'REVOKED') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          consentGiven: false,
        },
      });
    } else if (action === 'DATA_DELETED') {
      // Anonymize or delete user data
      await prisma.user.update({
        where: { id: userId },
        data: {
          email: null,
          phone: null,
          displayName: null,
        },
      });
    } else if (action === 'DATA_ANONYMIZED') {
      // Anonymize user data but keep records
      await prisma.user.update({
        where: { id: userId },
        data: {
          email: `anonymous_${userId}@safevoice.org`,
          phone: null,
          displayName: 'Anonymous User',
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling consent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process consent action' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    const logs = await prisma.consentLog.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error('Error fetching consent logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch consent logs' },
      { status: 500 }
    );
  }
}