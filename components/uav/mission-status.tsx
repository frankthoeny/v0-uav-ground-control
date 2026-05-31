"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Clock, MapPin, CheckCircle2 } from "lucide-react"

interface Waypoint {
  id: number
  name: string
  altitude: number
  status: "completed" | "current" | "pending"
}

interface MissionStatusProps {
  missionName: string
  progress: number
  waypoints: Waypoint[]
  elapsedTime: string
  estimatedRemaining: string
  distanceCovered: number
  totalDistance: number
}

export function MissionStatus({
  missionName,
  progress,
  waypoints,
  elapsedTime,
  estimatedRemaining,
  distanceCovered,
  totalDistance
}: MissionStatusProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Mission Status
          </CardTitle>
          <Badge variant="default" className="text-xs">Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mission info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Mission</span>
            <span className="font-medium">{missionName}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{progress}% Complete</span>
            <span>{distanceCovered.toFixed(1)} / {totalDistance.toFixed(1)} km</span>
          </div>
        </div>

        {/* Time info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary/50 rounded-lg p-2.5 border border-border/50">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Elapsed</span>
            </div>
            <p className="font-mono text-sm font-medium">{elapsedTime}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-2.5 border border-border/50">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Remaining</span>
            </div>
            <p className="font-mono text-sm font-medium">{estimatedRemaining}</p>
          </div>
        </div>

        {/* Waypoints */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Waypoints</span>
          <div className="space-y-1.5">
            {waypoints.map((wp) => (
              <div 
                key={wp.id}
                className={`flex items-center justify-between p-2 rounded border ${
                  wp.status === "current" 
                    ? "bg-primary/10 border-primary/30" 
                    : wp.status === "completed"
                    ? "bg-secondary/30 border-border/50"
                    : "bg-secondary/20 border-border/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  {wp.status === "completed" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-chart-1" />
                  ) : wp.status === "current" ? (
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-muted-foreground/50" />
                  )}
                  <span className="text-sm">{wp.name}</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {wp.altitude}m
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
