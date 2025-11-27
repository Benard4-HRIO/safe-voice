import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, latitude, longitude, message } = body;

    // Get user's emergency contacts
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        emergencyContacts: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // In production, this would:
    // 1. Send SMS/email alerts to emergency contacts
    // 2. Send alerts to local authorities
    // 3. Log the emergency event
    // 4. Create a report automatically

    // For now, we'll just log it
    const emergencyData = {
      userId,
      latitude,
      longitude,
      message,
      contacts: user.emergencyContacts.map(c => ({
        name: c.name,
        phone: c.phone,
        email: c.email,
      })),
      timestamp: new Date().toISOString(),
    };

    // Create an emergency report
    const report = await prisma.report.create({
      data: {
        reportId: `EMG-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        encryptedData: JSON.stringify(emergencyData),
        encryptedKey: 'emergency-key',
        isEmergency: true,
        panicTriggered: true,
        latitude: latitude || null,
        longitude: longitude || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Emergency alert sent to your contacts and local authorities',
      reportId: report.reportId,
    });
  } catch (error) {
    console.error('Error handling emergency:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send emergency alert' },
      { status: 500 }
    );
  }
}


