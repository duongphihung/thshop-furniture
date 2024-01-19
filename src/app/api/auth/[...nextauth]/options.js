import * as argon from 'argon2';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

import prisma from "../../../lib/prisma";

export const authConfig = {
    providers: [
        FacebookProvider({
            profile(profile) {
                console.log("Google Profile", profile);
                let userRole = "Google user";
                return {
                    ...profile,
                    id: profile.sub,
                    image: profile.picture,
                    role: userRole,
                }
            },
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,

        }),
        GoogleProvider({
            profile(profile) {
                console.log("Google Profile", profile);
                let userRole = "Google user";
                return {
                    ...profile,
                    id: profile.sub,
                    image: profile.picture,
                    role: userRole,
                }
            },
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        }),

        GithubProvider({
            profile(profile) {
                console.log("Github Profile", profile);
                let userRole = "GitHub user";
                if (profile?.email == "nguyeenxtaanstaif@gmail.com") {
                    userRole = 'admin';
                }
                return {
                    ...profile,
                    image: profile.avatar_url,
                    role: userRole,
                }
            },
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "Email",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;
                const dbUser = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })

                if (dbUser) {
                    const passwordMatched = await argon.verify(dbUser.hashedPassword, credentials.password);
                    if (passwordMatched) {
                        const { password, createdAt, ...dbUserWithoutPassword } = dbUser;
                        return dbUserWithoutPassword;
                    }
                }
                return null;
            },
        }),
    ],
    session: {
        maxAge: 30 * 60,
        strategy: "jwt", // <- this does the job
    },
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                // Return false to display a default error message
                return {
                    error: "Login failed"
                }
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.role = user.role;
            }
            // console.log("Jwt Callbackk", { token, user, account });
            return token;
        },
        async session({ session, token, user }) {
            if (session?.user) {
                session.user.id = token.sub;
                session.user.role = token.role;
            }
            // console.log("session callback", { session });
            return session;
        },
    }
};
