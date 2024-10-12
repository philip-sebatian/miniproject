import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
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
  
  const { name, password } = body;

  // Check if required fields are present
  if (!name || !password) {
    return NextResponse.json({ error: "Missing required field: name or password" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        userName: name, // Use the correct property
      },
    });

    // Validate the user and password
    if (!user || user.password !== password) {
      return NextResponse.json({ status: 401, message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = sign({ userName: user.userName }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Serialize the cookie
    const serialized = serialize("OutsiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return new Response(JSON.stringify({ message: "Authenticated" }), {
      status: 200,
      headers: {
        "Set-Cookie": serialized,
      },
    });

  } catch (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json({ success: 0, message: "Error retrieving user" }, { status: 500 });
  }
}
