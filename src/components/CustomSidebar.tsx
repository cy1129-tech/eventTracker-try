import { Home, LogOut, Settings, HelpCircle, Calendar } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/shadcn/ui/sidebar"
import { Button } from "@/shadcn/ui/button"
import { Separator } from "@/shadcn/ui/separator"

const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
  },
]

const bottomItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Help & FAQ",
    url: "/faq",
    icon: HelpCircle,
  },
]

export default function CustomSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser")
    localStorage.removeItem("rememberMe")
    navigate("/login")
  }

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col items-start gap-2">
               {isCollapsed&&
            <SidebarTrigger></SidebarTrigger>

            }
            <div className="flex size-8 items-center justify-center rounded-lg 
            bg-gradient-to-br from-blue-500 to-blue-600">
                
              <span className="text-sm font-bold text-white">ET</span>
              
            </div>
            
            {!isCollapsed && (
              <div>
                
                <h2 className="font-semibold">EventTracker</h2>
                <p className="text-xs text-muted-foreground">Event Management</p>
              </div>
            )}
          </div>
          {!isCollapsed && <SidebarTrigger />}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Separator className="my-2" />

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                onClick={() => navigate(item.url)}
                isActive={location.pathname === item.url}
                tooltip={item.title}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Logout Button */}
        <div className="p-2">
          <Button
            onClick={handleLogout}
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <LogOut className="size-4" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}