import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';// Adjust based on your prisma setup path

// GET /api/likes?post_id=POST_ID&user_id=USER_ID
// GET /api/likes?post_id=POST_ID&user_id=USER_ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const post_id = searchParams.get('post_id');
  const user_id = searchParams.get('user_id');

  if (!post_id || !user_id) {
      return NextResponse.json({ error: "post_id and user_id are required" }, { status: 400 });
  }

  try {
      const like = await prisma.like.findUnique({
          where: {
              user_id_post_id: { // This should match the unique constraint defined in your Prisma schema
                  user_id: parseInt(user_id),
                  post_id: parseInt(post_id),
              },
          },
      });
      
      // Fetch total like count for the post
      const likeCount = await prisma.like.count({
          where: {
              post_id: parseInt(post_id),
          },
      });

      return NextResponse.json({ isLiked: !!like, likeCount }); // Include like count
  } catch (error) {
      console.error("Error fetching like:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



// POST /api/likes
// POST /api/likes
export async function POST(req: Request) {
    const body = await req.json();
    const { post_id, user_id } = body;

    if (!post_id || !user_id) {
        return NextResponse.json({ error: "post_id and user_id are required" }, { status: 400 });
    }

    try {
        // Create the like
        const newLike = await prisma.like.create({
            data: {
                post_id: parseInt(post_id),
                user_id: parseInt(user_id),
            },
        });

        // Update the likes count in the Post model
        await prisma.post.update({
            where: { id: parseInt(post_id) },
            data: { likes: { increment: 1 } },
        });

        return NextResponse.json(newLike, { status: 201 });
    } catch (error) {
        console.error("Error creating like:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const post_id = searchParams.get('post_id');
  const user_id = searchParams.get('user_id');

  if (!post_id || !user_id) {
      return NextResponse.json({ error: "post_id and user_id are required" }, { status: 400 });
  }

  try {
      await prisma.like.delete({
          where: {
              user_id_post_id: { // This should match the unique constraint defined in your Prisma schema
                  user_id: parseInt(user_id),
                  post_id: parseInt(post_id),
              },
          },
      });
      // No content to return for 204
      return new Response(null, { status: 204 }); // Return a response with 204
  } catch (error) {
      console.error("Error deleting like:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
