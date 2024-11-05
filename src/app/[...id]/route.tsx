
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request : NextRequest,{ params }: { params: { id: number } }) {
    const id =  params.id
    if (!id) {
        return NextResponse.error("Missing 'id' parameter");
      }

      const post = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        }
      });

      return NextResponse.json(post);
}


