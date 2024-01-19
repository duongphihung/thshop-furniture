import NextAuth from "next-auth";
import { authConfig } from "../[...nextauth]/options"; 
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };