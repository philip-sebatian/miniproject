import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle creating a new comment
export async function POST(req: Request) {
    try {
        const { post_id, comment, owner_id } = await req.json();

        if (!post_id || !comment || !owner_id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Log the incoming data for debugging
        console.log({ post_id, comment, owner_id });

        // Ensure you are using the correct model name
        const newComment = await prisma.comment.create({
            data: {
                post_id: parseInt(post_id),
                comment,
                owner_id: parseInt(owner_id),
            },
        });

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }
}
// Handle fetching comments for a specific post
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const post_id = searchParams.get('post_id');

    if (!post_id) {
        return NextResponse.json({ error: 'post_id is required' }, { status: 400 });
    }

    try {
        const comments = await prisma.comment.findMany({  // Adjust to your model name, if necessary
            where: { post_id: parseInt(post_id) },
            include: {
                user: {
                    select: {
                        userName: true,
                    },
                },
            },
            orderBy: { id: 'desc' },
        });

        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}
