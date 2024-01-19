import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const id = params.userId;
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            accounts: true,
            cart: true,
            locations: true,
            orders: {
                include: {
                    orderItems: {
                        include: {
                            product: {
                                include: {
                                    category: true,
                                }
                            }
                        },
                    },
                }
            },
        },
    });
    delete user["hashedPassword"];
    return NextResponse.json({
        success: true,
        message: "All infomation user",
        user,
    }, { status: 200 });
}

export async function PUT(req, { params }) {
    try {
        const body = await req.json();
        const id = params.userId;
        const data = body.profileData;
        console.log(data, id);


        return NextResponse.json({
            success: true,
            message: "Upload profile",
            id
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error", error
        }, { status: 500 })
    }
}