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
    const currentDate = new Date();
    const productData = await prisma.product.findUnique({
        where: {
            id: id,
        },
        include: {
            category: true,
            comments: {
                include: {
                    user: true,
                }
            },
        },
    });

    let product = {};

    const totalRating = productData.comments.reduce((sum, comment) => {
        return sum + (comment.rating || 0);
    }, 0);
    // Add rating
    const averageRating = productData.comments.length > 0
        ? totalRating / productData.comments.length
        : 0;
    //Change status 
    const updatedAtDate = new Date(productData.updatedAt);
    const isRecent = currentDate - updatedAtDate < 3 * 24 * 60 * 60 * 1000;

    const statusIndex = productData.status - 1;
    const statusChange = statusIndex >= 0 && statusIndex < statusProduct.length
        ? statusProduct[statusIndex]
        : "Selling";

    const finalStatus = isRecent ? "New" : statusChange;

    product = {
        ...productData,
        status: finalStatus,
        rating: averageRating.toFixed(2),
    };

    return NextResponse.json({
        success: true,
        message: "Detail product",
        product,
    }, { status: 200 });
}