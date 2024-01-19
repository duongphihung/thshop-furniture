import prisma from '@/app/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const id = params.id;
    const category = await prisma.category.findUnique({
        where: {
            id: id,
        },
    })
    return NextResponse.json({
        success: true,
        message: "Detail category",
        category,
    }, { status: 200 });
}