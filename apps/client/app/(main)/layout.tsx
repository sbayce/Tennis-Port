import type { Metadata } from "next"
import "../globals.css"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import CartContextProvider from "@/contexts/CartContext"
import { Poppins } from 'next/font/google'
import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap'
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
        className={`${poppins.className} antialiased min-h-[100vh] flex flex-col`}
      >
        <CartContextProvider>
          <Suspense>
          <Toaster richColors position="top-center" />
          <Header />
          <div className="px-2 sm:px-10 lg:px-20 mt-28">
            {children}
          </div>
          <Footer />
          </Suspense>
        </CartContextProvider>
      </body>
    </html>
  )
}
