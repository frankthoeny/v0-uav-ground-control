"use client"

import { Bell, Settings, Wifi, WifiOff, Radio, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  isConnected: boolean
  signalStrength: number
  activeVehicle: string
  vehicles: string[]
  onVehicleChange: (vehicle: string) => void
}

export function Header({ isConnected, signalStrength, activeVehicle, vehicles, onVehicleChange }: HeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg tracking-tight">SkyNet GCS</span>
        </div>
        
        <div className="h-6 w-px bg-border" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 h-8">
              <span className="text-sm">{activeVehicle}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {vehicles.map((v) => (
              <DropdownMenuItem key={v} onClick={() => onVehicleChange(v)}>
                {v}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          {isConnected ? (
            <>
              <Wifi className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">{signalStrength}%</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-destructive" />
              <span className="text-destructive text-xs">Disconnected</span>
            </>
          )}
        </div>

        <Badge variant={isConnected ? "default" : "destructive"} className="text-xs">
          {isConnected ? "ARMED" : "DISARMED"}
        </Badge>

        <div className="h-6 w-px bg-border" />

        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
