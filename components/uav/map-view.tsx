"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Maximize2, Layers, MapPin, Navigation } from "lucide-react"

interface WaypointData {
  id: number
  lat: number
  lng: number
  altitude: number
  type: "waypoint" | "home" | "current"
}

interface MapViewProps {
  waypoints: WaypointData[]
  currentPosition: { lat: number; lng: number }
}

export function MapView({ waypoints, currentPosition }: MapViewProps) {
  // Convert coordinates to SVG positions (simplified for demo)
  const mapToSvg = (lat: number, lng: number) => {
    const minLat = 37.76
    const maxLat = 37.80
    const minLng = -122.46
    const maxLng = -122.40
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 100
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100
    
    return { x, y }
  }

  const currentPos = mapToSvg(currentPosition.lat, currentPosition.lng)

  return (
    <Card className="bg-card border-border h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Navigation className="h-4 w-4 text-primary" />
            Mission Map
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Layers className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Maximize2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-2">
        <div className="relative w-full h-full min-h-[300px] bg-secondary/30 rounded-lg overflow-hidden border border-border/50">
          {/* Grid overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Map content */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Flight path line */}
            <path
              d={waypoints.map((wp, i) => {
                const pos = mapToSvg(wp.lat, wp.lng)
                return `${i === 0 ? 'M' : 'L'} ${pos.x} ${pos.y}`
              }).join(' ')}
              fill="none"
              stroke="oklch(0.72 0.19 165)"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              opacity={0.6}
            />
            
            {/* Waypoints */}
            {waypoints.map((wp) => {
              const pos = mapToSvg(wp.lat, wp.lng)
              return (
                <g key={wp.id}>
                  {wp.type === "home" ? (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="2.5"
                      fill="oklch(0.75 0.15 85)"
                      stroke="oklch(0.12 0.005 260)"
                      strokeWidth="0.5"
                    />
                  ) : wp.type === "current" ? (
                    <>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="4"
                        fill="oklch(0.72 0.19 165)"
                        opacity={0.3}
                      />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="2"
                        fill="oklch(0.72 0.19 165)"
                      />
                    </>
                  ) : (
                    <>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="1.5"
                        fill="oklch(0.65 0.18 220)"
                        stroke="oklch(0.12 0.005 260)"
                        strokeWidth="0.3"
                      />
                      <text
                        x={pos.x + 3}
                        y={pos.y + 1}
                        fontSize="3"
                        fill="oklch(0.6 0 0)"
                      >
                        {wp.id}
                      </text>
                    </>
                  )}
                </g>
              )
            })}
            
            {/* UAV icon */}
            <g transform={`translate(${currentPos.x}, ${currentPos.y})`}>
              <circle r="3" fill="oklch(0.72 0.19 165)" opacity={0.3}>
                <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <polygon
                points="0,-3 2,2 0,1 -2,2"
                fill="oklch(0.72 0.19 165)"
                stroke="oklch(0.95 0 0)"
                strokeWidth="0.3"
              />
            </g>
          </svg>

          {/* Map info overlay */}
          <div className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm rounded px-2 py-1 text-xs border border-border/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-primary" />
                <span className="font-mono text-muted-foreground">
                  {currentPosition.lat.toFixed(5)}, {currentPosition.lng.toFixed(5)}
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm rounded px-2 py-1.5 text-xs border border-border/50 space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[oklch(0.75_0.15_85)]" />
              <span className="text-muted-foreground">Home</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[oklch(0.65_0.18_220)]" />
              <span className="text-muted-foreground">Waypoint</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">UAV</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
