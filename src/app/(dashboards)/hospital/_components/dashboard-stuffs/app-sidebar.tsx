"use client"

import * as React from "react"


import { NavMain } from "./nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { IconBox, IconDroplet, IconUser, IconUserCheck } from "@tabler/icons-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Profile",
      url: "/hospital/dashboard/profile",
      icon: IconUser,
    },
    {
      title: "Patients",
      url: "/hospital/dashboard/patients",
      icon: IconUserCheck,
    },
    {
      title: "Blood Stock",
      url: "/hospital/dashboard/blood-stock",
      icon: IconBox,
    },
    {
      title: "Appointments",
      url: "/hospital/dashboard/appointments",
      icon: IconBox,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile, isMobile } = useSidebar()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/" passHref onClick={() => isMobile && setOpenMobile(false)} className="flex items-center gap-2">
                <IconDroplet className="h-5 w-5 fill-primary-foreground" />
                <span className="text-base font-semibold text-primary">Rakt Care</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
