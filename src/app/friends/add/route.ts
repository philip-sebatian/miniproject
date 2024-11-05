 // Adjust this path as needed for your Prisma setup

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjust based on your project structure

export async function POST(request) {
    try {
        const { user1Id, user2Id } = await request.json();

        // Convert IDs to integers
        const parsedUser1Id = parseInt(user1Id, 10);
        const parsedUser2Id = parseInt(user2Id, 10);
        console.log(user1Id,parsedUser2Id)

        // Validate the converted IDs
        if (isNaN(parsedUser1Id) || isNaN(parsedUser2Id) || parsedUser1Id === parsedUser2Id) {
            return NextResponse.json({ error: "Invalid user IDs" }, { status: 400 });
        }

        // Check if friendship already exists
        const existingFriendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { user1Id: parsedUser1Id, user2Id: parsedUser2Id },
                    { user1Id: parsedUser2Id, user2Id: parsedUser1Id },
                ],
            },
        });

        if (existingFriendship) {
            return NextResponse.json({ message: "Friendship already exists" }, { status: 200 });
        }

        // Create the friendship
        await prisma.friendship.create({
            data: { user1Id: parsedUser1Id, user2Id: parsedUser2Id },
        });

        return NextResponse.json({ message: "Friend added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error adding friend:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
