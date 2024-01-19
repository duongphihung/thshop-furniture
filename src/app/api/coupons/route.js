import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import moment from 'moment';
import { statusProduct } from "@/app/utils/index"

export async function GET(req) {
    const couponsData = await prisma.coupon.findMany({
        include: {
            products: true,
        }
    });
    return NextResponse.json({
        success: true,
        message: "All coupon",
        couponsData,
    }, { status: 200 });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const data = body.formData;
        const { dateStart, dateEnd, quantity, ...formData } = data;
        const dateTo = moment(dateStart).toDate();
        const dateFrom = moment(dateEnd).toDate();

        if (!data) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "No data provided for update",
            }, { status: 400 });
        }
        const newCoupons = await prisma.coupon.create({
            data: {
                ...formData,
                quantity: Number(quantity),
                dateStart: dateTo,
                dateEnd: dateFrom
            }
        })

        console.log(newCoupons);

        return NextResponse.json({
            success: true,
            message: "Add coupons success",
            newCoupons,
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error", error
        }, { status: 500 })
    }
}

export async function PATCH(req) {
    try {
        const body = await req.json();
        const code = body.coupon;
        console.log(code);
        if (!code) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "No data provided for update",
            }, { status: 400 });
        }
        const updatedCoupons = await prisma.coupon.update({
            where: {
                code: code,
                quantity: {
                    gt: 0, // Đảm bảo rằng quantity vẫn lớn hơn 0 trước khi giảm
                },
            },
            data: {
                quantity: {
                    decrement: 1,
                },
            },
        });

        return NextResponse.json({
            success: true,
            message: "Use coupon success",
            coupon: updatedCoupons,
        }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Error",
            error: "Internal server error",
        }, { status: 500 });
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

    const coupons = await prisma.coupon.delete({
        where: {
            id: id,
        },
    });

    return NextResponse.json({
        success: true,
        message: "Delete successfully",
        coupons,
    }, { status: 200 });
}