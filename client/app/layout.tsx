import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import CartContextProvider from "@/contexts/CartContext"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Tennis Port",
  description: "Your tennis online shop.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartContextProvider>
          <Header />
          <div className="px-2 sm:px-10 md:px-32 lg:px-auto">
            {children}
          </div>
          <Footer />
        </CartContextProvider>
      </body>
    </html>
  )
}
