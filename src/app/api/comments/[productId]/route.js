import prisma from '@/app/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const productId = params.productId;
    const comments = await prisma.comment.findMany({
        where: {
            productId: productId,
        },
        include: {
            user: true,
        }
    })
    return NextResponse.json({
        success: true,
        message: "List comments by product",
        comments,
    }, { status: 200 });
}