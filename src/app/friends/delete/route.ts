import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjust the import path based on your project setup

export async function DELETE(request: Request) {
    const { user1Id, user2Id } = await request.json(); // Get user IDs from the request body

    try {
        // Check if friendship exists
        const existingFriendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { user1Id, user2Id },
                    { user1Id: user2Id, user2Id: user1Id },
                ],
            },
        });

        if (!existingFriendship) {
            return NextResponse.json({ error: "Friendship does not exist" }, { status: 404 });
        }

        // Remove friendship
        await prisma.friendship.delete({
            where: {
                id: existingFriendship.id,
            },
        });

        return NextResponse.json({ message: "Friend removed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error removing friend:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
