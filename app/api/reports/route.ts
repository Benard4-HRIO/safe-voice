import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { encryptData, generateAnonymousId, generateEncryptionKey } from '@/lib/encryption';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { incidentDate, location, description, latitude, longitude, isEmergency, mediaUrls } = body;

    // Generate anonymous report ID
    const reportId = generateAnonymousId();
    
    // Generate encryption key for this report
    const encryptionKey = generateEncryptionKey();
    
    // Prepare data to encrypt
    const reportData = {
      incidentDate,
      location,
      description,
      latitude,
      longitude,
      isEmergency,
      mediaUrls,
      createdAt: new Date().toISOString(),
    };

    // Encrypt the report data
    const encryptedData = encryptData(JSON.stringify(reportData), encryptionKey);
    
    // Encrypt the encryption key itself (for secure storage)
    const encryptedKey = encryptData(encryptionKey);

    // Save to database
    const report = await prisma.report.create({
      data: {
        reportId,
        encryptedData,
        encryptedKey,
        incidentDate: incidentDate ? new Date(incidentDate) : null,
        location,
        latitude: latitude || null,
        longitude: longitude || null,
        isEmergency: isEmergency || false,
        panicTriggered: isEmergency || false,
        hasMedia: !!mediaUrls && mediaUrls.length > 0,
        mediaUrls: mediaUrls ? JSON.stringify(mediaUrls) : null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      reportId: report.reportId,
      message: 'Report submitted successfully. Your report ID has been saved.',
    });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit report' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reportId = searchParams.get('reportId');

    if (reportId) {
      const report = await prisma.report.findUnique({
        where: { reportId },
        select: {
          id: true,
          reportId: true,
          status: true,
          createdAt: true,
          isEmergency: true,
        },
      });

      if (!report) {
        return NextResponse.json(
          { success: false, error: 'Report not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, report });
    }

    // For moderators/admins - list reports (without encrypted data)
    const reports = await prisma.report.findMany({
      select: {
        id: true,
        reportId: true,
        status: true,
        isEmergency: true,
        createdAt: true,
        reviewedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    return NextResponse.json({ success: true, reports });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}


