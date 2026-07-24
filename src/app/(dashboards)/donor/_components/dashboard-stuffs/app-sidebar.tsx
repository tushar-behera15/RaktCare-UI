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
      url: "/donor/dashboard/profile",
      icon: IconUser,
    },
    {
      title: "Requests",
      url: "/donor/dashboard/requests",
      icon: IconUserCheck,
    },
    {
      title: "Appointments",
      url: "/donor/dashboard/appointments",
      icon: IconBox,
    },
    {
      title: "Donation History",
      url: "/donor/dashboard/donation-history",
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
