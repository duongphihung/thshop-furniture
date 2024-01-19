import prisma from '@/app/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET(req) {
    const comments = await prisma.comment.findMany();
    return NextResponse.json({
        success: true,
        message: "All comment",
        comments,
    }, { status: 200 });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const data = body.comment;
        const { rating, ...formData } = data;
        if (!data) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "No data provided for update",
            }, { status: 400 });
        }
        const newComment = await prisma.comment.create({
            data: {
                ...formData,
                rating: parseInt(rating),
            }
        })

        console.log(newComment);

        return NextResponse.json({
            success: true,
            message: "Add product success",
            newComment,
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error", error
        }, { status: 500 })
    }
}

// export async function PUT(req) {
//     try {
//         const body = await req.json();
//         const data = body.formData;

//         if (!data) {
//             return NextResponse.json({
//                 success: false,
//                 message: "Error",
//                 error: "No data provided for update",
//             }, { status: 400 });
//         }
//         const { id, category, ...formData } = data;
//         // console.log(formData);

//         const existingProduct = await prisma.product.findUnique({
//             where: {
//                 id: id,
//             },
//         });

//         if (!existingProduct) {
//             return NextResponse.json({
//                 success: false,
//                 message: "Error",
//                 error: "Product not found",
//             }, { status: 404 });
//         }

//         // Update the product
//         const updatedProduct = await prisma.product.update({
//             where: {
//                 id: id,
//             },
//             data: {
//                 ...formData,
//             },
//         });

//         // console.log(updatedProduct);

//         return NextResponse.json({
//             success: true,
//             message: "Update product success",
//             updatedProduct,
//         }, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({
//             success: false,
//             message: "Error",
//             error: "Internal server error",
//         }, { status: 500 });
//     }
// }


export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    // console.log(id);

    const deleteComment = await prisma.comment.delete({
        where: {
            id: id,
        },
    })

    return NextResponse.json({
        success: true,
        message: "Delete successfully",
        deleteComment,
    }, { status: 200 });
}