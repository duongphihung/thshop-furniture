import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import moment from 'moment';
import { statusProduct } from "@/app/utils/index"

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const getDiscount = searchParams.get('getDiscount');
    const discountsData = await prisma.discount.findMany({
        include: {
            product: {
                include: {
                    category: true,
                    comments: true,
                }
            },
        }
    });
    if (getDiscount) {
        return NextResponse.json({
            success: true,
            message: "All discount",
            discounts: discountsData,
        }, { status: 200 });
    }
    const currentDate = new Date();
    const discounts = discountsData.map(discount => {
        const totalRating = discount.product.comments.reduce((sum, comment) => {
            return sum + (comment.rating || 0);
        }, 0);
        // Add rating
        const averageRating = discount.product.comments.length > 0
            ? totalRating / discount.product.comments.length
            : 0;
        //Change status 
        const updatedAtDate = new Date(discount.product.createAt);
        const isRecent = currentDate - updatedAtDate < 3 * 24 * 60 * 60 * 1000;

        const statusIndex = discount.product.status - 1;
        const statusChange = statusIndex >= 0 && statusIndex < statusProduct.length
            ? statusProduct[statusIndex]
            : "Selling";

        const finalStatus = isRecent ? "New" : statusChange;

        return {
            ...discount.product,
            discount: discount.discount ? discount.product.price * discount.discount / 100 : 0,
            status: finalStatus,
            rating: averageRating.toFixed(2),
        };
    });

    return NextResponse.json({
        success: true,
        message: "All product discount",
        discounts,
    }, { status: 200 });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const data = body.discountForm;
        console.log(data);
        const { dateStart, dateEnd, ...formData } = data;
        const dateTo = moment(dateStart).toDate();
        const dateFrom = moment(dateEnd).toDate();
        console.log(dateTo, dateFrom);

        if (!data) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "No data provided for update",
            }, { status: 400 });
        }
        const newDiscount = await prisma.discount.create({
            data: {
                ...formData,
                dateStart: dateTo,
                dateEnd: dateFrom
            }
        })
        if (newDiscount) {
            const updateStatus = await prisma.product.update({
                where: {
                    id: formData.productId
                },
                data: {
                    status: 3,
                }
            });
            return NextResponse.json({
                success: true,
                message: "Add product discount success",
                newDiscount,
                updateStatus,
            }, { status: 200 })
        }

        console.log(newDiscount);

        return NextResponse.json({
            success: true,
            message: "Add product discount success",
            newDiscount,
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
    const productId = searchParams.get('productId');

    // console.log(id);

    const deleteDiscount = await prisma.discount.delete({
        where: {
            id: id,
        },
    });
    if (!deleteDiscount) {
        return NextResponse.json({
            success: false,
            message: "Delete fail",
        }, { status: 400 });
    }

    const updateStatus = await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            status: 0,
        }
    });

    return NextResponse.json({
        success: true,
        message: "Delete successfully",
        deleteDiscount,
        updateStatus,
    }, { status: 200 });
}