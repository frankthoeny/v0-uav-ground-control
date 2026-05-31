"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Maximize2, Square, Circle, SwitchCamera, Video } from "lucide-react"

interface CameraFeedProps {
  isRecording: boolean
  onToggleRecord: () => void
}

export function CameraFeed({ isRecording, onToggleRecord }: CameraFeedProps) {
  const [timestamp, setTimestamp] = useState("")
  
  useEffect(() => {
    setTimestamp(new Date().toLocaleTimeString())
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <Card className="bg-card border-border h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Video className="h-4 w-4 text-primary" />
            Camera Feed
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <SwitchCamera className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Maximize2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-2">
        <div className="relative w-full h-full min-h-[200px] bg-secondary/30 rounded-lg overflow-hidden border border-border/50 flex items-center justify-center">
          {/* Simulated camera feed with grid overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-secondary/20" />
          
          {/* Crosshair */}
          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Center crosshair */}
            <line x1="45" y1="50" x2="55" y2="50" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
            <line x1="50" y1="45" x2="50" y2="55" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
            <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
            
            {/* Corner brackets */}
            <path d="M 5 15 L 5 5 L 15 5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            <path d="M 85 5 L 95 5 L 95 15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            <path d="M 95 85 L 95 95 L 85 95" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            <path d="M 15 95 L 5 95 L 5 85" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
            
            {/* Horizon line */}
            <line x1="0" y1="50" x2="40" y2="50" stroke="currentColor" strokeWidth="0.2" className="text-muted-foreground" opacity={0.5} />
            <line x1="60" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.2" className="text-muted-foreground" opacity={0.5} />
          </svg>

          {/* Camera icon placeholder */}
          <Camera className="h-12 w-12 text-muted-foreground/30" />
          
          {/* Recording indicator */}
          {isRecording && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-destructive/90 text-destructive-foreground px-2 py-0.5 rounded text-xs font-medium">
              <Circle className="h-2 w-2 fill-current animate-pulse" />
              REC
            </div>
          )}

          {/* Timestamp overlay */}
          <div className="absolute bottom-3 left-3 bg-card/80 backdrop-blur-sm rounded px-2 py-1 text-xs font-mono text-muted-foreground">
            {timestamp || "--:--:--"}
          </div>

          {/* Camera controls */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1">
            <Button 
              size="sm" 
              variant={isRecording ? "destructive" : "secondary"}
              className="h-7 gap-1 text-xs"
              onClick={onToggleRecord}
            >
              {isRecording ? <Square className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
              {isRecording ? "Stop" : "Record"}
            </Button>
            <Button size="sm" variant="secondary" className="h-7 gap-1 text-xs">
              <Camera className="h-3 w-3" />
              Capture
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
