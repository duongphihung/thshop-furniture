import prisma from '@/app/lib/prisma';
import { useRouter } from 'next/navigation';

import { NextResponse } from 'next/server';
const statusProduct = [
    "Selling",
    "New",
    "OnSale",
    "OutOfStock",
    "Block"
]
export async function GET(req) {
    const params = await req.nextUrl.searchParams;
    const room = params.get('room') ? params.get('room') : "";
    // const page = params.get('page') ? params.get('page') : 2;
    const type = params.get('type') ? params.get('type') : "";
    const color = params.get('color') ? params.get('color') : "";
    const priceTo = params.get('priceTo') ? Number(params.get('priceTo')) : 0;
    const priceFrom = params.get('priceFrom') ? Number(params.get('priceFrom')) : 9999999;
    {
        const query = params.get('query') ? params.get('query') : "";
        if (query !== "") {
            const products = await prisma.product.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                take: 8,
            });

            return NextResponse.json({
                success: true,
                message: "Search result",
                products,
            }, { status: 200 });
        }
    }
    const currentDate = new Date();
    const productsData = await prisma.product.findMany({
        where: {
            AND: [
                {
                    placement: {
                        contains: room,
                        mode: "insensitive",
                    },
                },
                {
                    material: {
                        contains: type,
                        mode: "insensitive",
                    },
                },
                {
                    color: {
                        contains: color,
                        mode: "insensitive",
                    },
                },
                {
                    AND: [
                        {
                            price: {
                                gte: priceTo,
                            },
                        },
                        {
                            price: {
                                lte: priceFrom,
                            },
                        },
                    ],
                },
            ],
        },
        include: {
            category: true,
            comments: true,
            discount: true,
        },
        take: 8, // Page size
        // skip: (Number(page) - 1) * 3, // Skip the cursor row
    });
    // console.log(productsData);

    const products = productsData.map(product => {
        const totalRating = product.comments.reduce((sum, comment) => {
            return sum + (comment.rating || 0);
        }, 0);
        // Add rating
        const averageRating = product.comments.length > 0
            ? totalRating / product.comments.length
            : 0;
        //Change status 
        const updatedAtDate = new Date(product.createAt);
        const isRecent = currentDate - updatedAtDate < 3 * 24 * 60 * 60 * 1000;

        const statusIndex = product.status - 1;
        const statusChange = statusIndex >= 0 && statusIndex < statusProduct.length
            ? statusProduct[statusIndex]
            : "Selling";

        const finalStatus = isRecent ? "New" : statusChange;

        return {
            ...product,
            discount: product.discount ? product.price * Number(product.discount.discount) / 100 : 0,
            status: finalStatus,
            rating: averageRating.toFixed(2),
        };
    });

    return NextResponse.json({
        success: true,
        message: "All List",
        products,
    }, { status: 200 });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const data = body.formData;
        console.log(data);
        if (!data) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "No data provided for update",
            }, { status: 400 });
        }
        const newProduct = await prisma.product.create({
            data: {
                ...data,
            }
        })

        console.log(newProduct);

        return NextResponse.json({
            success: true,
            message: "Add product success",
            newProduct
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
        const data = body.formData;

        if (!data) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "No data provided for update",
            }, { status: 400 });
        }
        const { id, ...formData } = data;
        // console.log(formData);

        const existingProduct = await prisma.product.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingProduct) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "Product not found",
            }, { status: 404 });
        }

        if (formData.status && formData.status != "") {

            const updatedStatus = await prisma.product.update({
                where: {
                    id: id,
                },
                data: {
                    status: formData.status,
                },
            });

            return NextResponse.json({
                success: true,
                message: "Update status product success",
                updatedStatus,
            }, { status: 200 });
        }

        return NextResponse.json({
            success: false,
            message: "Update field not found",
            // updatedProduct,
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Error",
            error: "Internal server error",
        }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const data = body.formData;

        if (!data) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "No data provided for update",
            }, { status: 400 });
        }
        const { id, category, comments, ...formData } = data;
        // console.log(formData);

        const existingProduct = await prisma.product.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingProduct) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "Product not found",
            }, { status: 404 });
        }

        // Update the product
        const updatedProduct = await prisma.product.update({
            where: {
                id: id,
            },
            data: {
                ...formData,
            },
        });

        // console.log(updatedProduct);

        return NextResponse.json({
            success: true,
            message: "Update product success",
            updatedProduct,
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Error",
            error: "Internal server error",
        }, { status: 500 });
    }
}


export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    // console.log(id);

    const deleteProduct = await prisma.product.delete({
        where: {
            id: id,
        },
    })

    return NextResponse.json({
        success: true,
        message: "Delete successfully",
        deleteProduct,
    }, { status: 200 });
}