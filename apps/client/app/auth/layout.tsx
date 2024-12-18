import { Toaster } from '@/components/ui/sonner'
import '../globals.css'

export const metadata = {
  title: 'Auth - Tennis Port',
  description: 'user auth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}
