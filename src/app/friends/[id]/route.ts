import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    const { id } = params;
    console.log(params)
    
    try {
        const userIdInt = parseInt(id, 10);
        
        if (isNaN(userIdInt)) {
            return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
        }

        // Fetch friendships where the current user is either user1 or user2
        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [
                    { user1Id: userIdInt },
                    { user2Id: userIdInt },
                ],
            },
            include: {
                user1: true, // Fetch user1 details
                user2: true, // Fetch user2 details
            },
        });

        // Map each friendship to get the friend details
        const friends = friendships.map(friendship => {
            return friendship.user1Id === userIdInt ? friendship.user2 : friendship.user1;
        });

        return NextResponse.json(friends, { status: 200 });
    } catch (error) {
        console.error("Error fetching friends:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
