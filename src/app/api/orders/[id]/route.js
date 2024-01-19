import prisma from '@/app/lib/prisma';

import { NextResponse } from 'next/server';

const statusProduct = [
    "Selling",
    "New",
    "OnSale",
    "OutOfStock",
    "Block"
];

export async function GET(req, { params }) {
    const id = params.id;
    // const currentDate = new Date();
    const order = await prisma.order.findUnique({
        where: {
            id: id,
        },
        include: {
            user: true,
            orderItems: {
                include: {
                    product: {
                        include: {
                            category: true,
                        }
                    }
                },
            },
        },
    });


    return NextResponse.json({
        success: true,
        message: "Detail order",
        order,
    }, { status: 200 });
}