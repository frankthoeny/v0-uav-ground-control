"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { 
  Play, 
  Pause, 
  Home, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  RotateCw,
  Square,
  Crosshair
} from "lucide-react"

interface FlightControlsProps {
  isFlying: boolean
  throttle: number
  onThrottleChange: (value: number) => void
  onTakeoff: () => void
  onLand: () => void
  onReturnHome: () => void
}

export function FlightControls({ 
  isFlying, 
  throttle,
  onThrottleChange,
  onTakeoff, 
  onLand,
  onReturnHome
}: FlightControlsProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Flight Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            className="h-12 gap-2"
            variant={isFlying ? "secondary" : "default"}
            onClick={onTakeoff}
            disabled={isFlying}
          >
            <Play className="h-4 w-4" />
            <span className="text-xs">Takeoff</span>
          </Button>
          <Button 
            className="h-12 gap-2"
            variant="secondary"
            onClick={onReturnHome}
            disabled={!isFlying}
          >
            <Home className="h-4 w-4" />
            <span className="text-xs">RTH</span>
          </Button>
          <Button 
            className="h-12 gap-2"
            variant={isFlying ? "destructive" : "secondary"}
            onClick={onLand}
            disabled={!isFlying}
          >
            <Square className="h-4 w-4" />
            <span className="text-xs">Land</span>
          </Button>
        </div>

        {/* Throttle control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Throttle</span>
            <span className="font-mono text-primary">{throttle}%</span>
          </div>
          <Slider
            value={[throttle]}
            onValueChange={(v) => onThrottleChange(v[0])}
            max={100}
            step={1}
            className="w-full"
            disabled={!isFlying}
          />
        </div>

        {/* Directional controls */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Manual Control</span>
          <div className="grid grid-cols-3 gap-1">
            <div />
            <Button variant="outline" size="icon" className="h-10 w-10" disabled={!isFlying}>
              <ArrowUp className="h-4 w-4" />
            </Button>
            <div />
            <Button variant="outline" size="icon" className="h-10 w-10" disabled={!isFlying}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10" disabled={!isFlying}>
              <Crosshair className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10" disabled={!isFlying}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <div />
            <Button variant="outline" size="icon" className="h-10 w-10" disabled={!isFlying}>
              <ArrowDown className="h-4 w-4" />
            </Button>
            <div />
          </div>
        </div>

        {/* Altitude adjustment */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 h-10 gap-1" disabled={!isFlying}>
            <ArrowUp className="h-3 w-3" />
            <span className="text-xs">+10m</span>
          </Button>
          <Button variant="outline" className="flex-1 h-10 gap-1" disabled={!isFlying}>
            <ArrowDown className="h-3 w-3" />
            <span className="text-xs">-10m</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
