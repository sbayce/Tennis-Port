import "../../globals.css"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/Sidebar"

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
      </body>
    </html>
  )
}
