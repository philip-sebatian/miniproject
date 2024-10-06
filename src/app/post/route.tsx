import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(request: NextRequest) {
  let body;

  // Handle JSON parsing
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  
  const { username, avatar, caption,like, comments, image  } = body;
  const newUser = await prisma.post.create({
    data: {
      username: username,
      avatar: avatar,
      caption: caption,
      likes: like,
      comments: comments,
      image: image
    },
  });


  
}
