import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateStoryId, anonymizeText } from '@/lib/encryption';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!content || content.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Story content must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Generate anonymous story ID
    const storyId = generateStoryId();
    
    // Anonymize the content
    const anonymizedContent = anonymizeText(content);

    // Save to database
    const story = await prisma.story.create({
      data: {
        storyId,
        title: title || null,
        content: anonymizedContent,
        status: 'PENDING', // Requires moderation
      },
    });

    return NextResponse.json({
      success: true,
      storyId: story.storyId,
      message: 'Story submitted successfully. It will be reviewed before publication.',
    });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit story' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'APPROVED';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const stories = await prisma.story.findMany({
      where: {
        status: status as any,
      },
      select: {
        id: true,
        storyId: true,
        title: true,
        content: true,
        upvotes: true,
        createdAt: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    return NextResponse.json({ success: true, stories });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}


