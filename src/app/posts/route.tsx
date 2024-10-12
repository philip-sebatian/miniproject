
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { username, avatar, caption, likes, image } = body;

  // Ensure required fields are provided
  if (!username || !caption) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Create a new post in the database
    const newUser = await prisma.post.create({
      data: {
        username,
        avatar,
        caption,
        likes: likes ?? 0, // Default to 0 if not provided
        image,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}