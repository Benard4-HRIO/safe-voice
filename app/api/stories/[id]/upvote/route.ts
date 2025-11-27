import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const storyId = params.id;

    const story = await prisma.story.update({
      where: { storyId },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true, upvotes: story.upvotes });
  } catch (error) {
    console.error('Error upvoting story:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upvote story' },
      { status: 500 }
    );
  }
}


