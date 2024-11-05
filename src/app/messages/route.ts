import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Make sure this path is correct
async function connect() {
    if (!prisma.isConnected) {
      await prisma.$connect();
    }
  }
// GET messages between two users
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        
        const senderId = parseInt(searchParams.get('senderId') || '');
        const receiverId = parseInt(searchParams.get('receiverId') || '');
        console.log(senderId+","+receiverId)
        if (!senderId || !receiverId) {
            return NextResponse.json(
                { error: 'Sender and receiver IDs are required' },
                { status: 400 }
            );
        }

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        const formattedMessages = messages.map(msg => ({
            ...msg,
            timestamp: msg.createdAt.toISOString(),
          }));

        return NextResponse.json(formattedMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}

// POST new message
export async function POST(req: Request) {
    try {
      const body = await req.json(); // Parse the request body
      const { senderId, receiverId, content } = body;

      if (!senderId || !receiverId || !content) {
        return NextResponse.json(
          { error: 'Sender ID, receiver ID, and content are required' },
          { status: 400 }
        );
      }

      // Convert senderId and receiverId to integers if they are not already
      const senderIdInt = parseInt(senderId);
      const receiverIdInt = parseInt(receiverId);

      // Create the message using correct field names as per Prisma schema
      const message = await prisma.message.create({
        data: {
          senderId: senderIdInt,
          receiverId: receiverIdInt,
          content
        }
      });

      return NextResponse.json(message, { status: 201 });
    } catch (error) {
      console.error('Error creating message:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }
}
