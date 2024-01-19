
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import * as argon from 'argon2';


export async function POST(req) {
    const data = await req.json();
    try {
        const isUserAlreadyExists = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (isUserAlreadyExists) {
            return NextResponse.json({
                success: false,
                message: "User is already exists. Please try with different email.",
            });
        } else {
            const hashPassword = await argon.hash(data.password, { hashLength: 12 });

            const newlyCreatedUser = await prisma.user.create({
                data: {
                    name: data.firstname + data.lastname,
                    email: data.email,
                    image: data.imageUrl ? data.imageUrl : process.env.NEXT_URL + "/admin-imgs/users/3.jpg",
                    hashedPassword: hashPassword,
                    role: data.role,
                    phoneNumber: data?.phone,
                }
            });

            if (newlyCreatedUser) {
                return NextResponse.json({
                    success: true,
                    message: "Account created successfully.",
                });
            }
        }

    } catch (error) {
        console.log("Error while new user registration. Please try again");

        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }





    return NextResponse.json({ message: "This Worked", success: true, data: data.password });
}