import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import Link from "next/link"
  
  export function AdminSidebar() {
    return (
      <Sidebar>
        <SidebarHeader className="font-semibold"><Link href="/admin">Admin Port</Link></SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Products</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem><Link href="/admin/rackets">Rackets</Link></SidebarMenuItem>
                    <SidebarMenuItem>Shoes</SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  