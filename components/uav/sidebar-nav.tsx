"use client"

import { 
  LayoutDashboard, 
  Map, 
  Video, 
  Target, 
  Settings2, 
  History,
  Gauge,
  FileText,
  type LucideIcon 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItem {
  icon: LucideIcon
  label: string
  id: string
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Map, label: "Map View", id: "map" },
  { icon: Video, label: "Camera Feed", id: "camera" },
  { icon: Target, label: "Mission Planner", id: "mission" },
  { icon: Gauge, label: "Telemetry", id: "telemetry" },
  { icon: History, label: "Flight Logs", id: "logs" },
  { icon: FileText, label: "Reports", id: "reports" },
  { icon: Settings2, label: "Configuration", id: "config" },
]

interface SidebarNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SidebarNav({ activeTab, onTabChange }: SidebarNavProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside className="w-14 border-r border-border bg-sidebar flex flex-col items-center py-3 gap-1">
        {navItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-lg",
                  activeTab === item.id && "bg-sidebar-accent text-primary"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </aside>
    </TooltipProvider>
  )
}
