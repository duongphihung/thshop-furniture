import prisma from '@/app/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET(req) {
    const categorys = await prisma.category.findMany({
        include: {
            products: true,
        }
    });
    return NextResponse.json({
        success: true,
        message: "List categorys",
        categorys,
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
                message: "Error", error
            }, { status: 500 })
        }
        const newCategory = await prisma.category.create({
            data: {
                ...data,
            }
        })

        console.log(newCategory);

        return NextResponse.json({
            success: true,
            message: "Add category success",
            newCategory
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error", error
        }, { status: 500 })
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
        const {id, ...formData} = data;
        // console.log(formData);

        const existingCategory = await prisma.category.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingCategory) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "Category not found",
            }, { status: 404 });
        }

        // Update the product
        const updateCategory = await prisma.category.update({
            where: {
                id: id,
            },
            data: {
                ...formData,
            },
        });

        // console.log(updateCategory);

        return NextResponse.json({
            success: true,
            message: "Update product success",
            updateCategory,
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

    const deleteCategory = await prisma.category.delete({
        where: {
            id: id,
        },
    })

    return NextResponse.json({
        success: true,
        message: "Delete successfully",
        deleteCategory,
    }, { status: 200 });
}