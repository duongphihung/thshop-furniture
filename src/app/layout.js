import { getServerSession } from "next-auth";
import { authConfig } from '../app/api/auth/[...nextauth]/options'
import { SessionProvider } from "./providers/SessionProvider";
import "@uploadthing/react/styles.css";
import './globals.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'THShop',
  description: 'The best shop app!',
  icons: {
    icon: "/android-chrome-512x512.png"
  }
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authConfig);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session} refetchInterval={60}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
