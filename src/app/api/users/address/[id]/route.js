import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const id = params.id;
    const location = await prisma.location.findMany({
        where: {
            userId: id
        }
    });
    return NextResponse.json({
        success: true,
        message: "User location",
        location,
    }, { status: 200 });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const data = body.uAdrress;
        console.log(data);
        const { addressId, ...formData } = data;
        if (!data) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "No data provided for update",
            }, { status: 400 });
        }

        const newLocation = await prisma.location.create({
            data: {
                ...formData,
            }
        })

        console.log(newLocation);

        return NextResponse.json({
            success: true,
            message: "Add location user success",
            newLocation
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
        const data = body.uAdrress;
        if (!data) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "No data provided for update",
            }, { status: 400 });
        }

        const { addressId, ...formData } = data;
        console.log(addressId, formData);


        const existingLocation = await prisma.location.findUnique({
            where: {
                id: addressId,
            },
        });

        if (!existingLocation) {
            return NextResponse.json({
                success: false,
                message: "Error",
                error: "Location not found",
            }, { status: 404 });
        }

        const updateLocation = await prisma.location.update({
            where: {
                id: addressId,
            },
            data: {
                ...formData,
            },
        });

        const location = await prisma.location.findMany({
            where: {
                userId: formData.userId,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Update location success",
            newLocation: location,
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error", error
        }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    const id = params.id;
    // console.log(id);

    const deleteProduct = await prisma.location.delete({
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
