import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
export async function POST(request: NextRequest){
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
      return NextResponse.json({ error: "Missing required field: name" }, { status: 400 });
    }
  
    try {
      const newUser = await prisma.user.create({
        data: {
          password: password, // Assuming you want to use the `id` from params
          userName: name,
        },
      });
  
      return NextResponse.json({ success: 1, message: "User created successfully", user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ success: 0, message: "Error creating user" }, { status: 500 });
    }
  }