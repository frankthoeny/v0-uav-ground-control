"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Compass, 
  Gauge, 
  ThermometerSun, 
  Battery, 
  Navigation,
  Wind,
  ArrowUp,
  RotateCw
} from "lucide-react"

interface TelemetryData {
  altitude: number
  groundSpeed: number
  airSpeed: number
  heading: number
  battery: number
  temperature: number
  gpsCount: number
  verticalSpeed: number
  roll: number
  pitch: number
  yaw: number
  flightMode: string
}

interface TelemetryPanelProps {
  data: TelemetryData
}

export function TelemetryPanel({ data }: TelemetryPanelProps) {
  const telemetryItems = [
    { 
      label: "Altitude", 
      value: `${data.altitude.toFixed(1)}m`, 
      icon: ArrowUp,
      color: "text-chart-1"
    },
    { 
      label: "Ground Speed", 
      value: `${data.groundSpeed.toFixed(1)} m/s`, 
      icon: Gauge,
      color: "text-chart-2"
    },
    { 
      label: "Air Speed", 
      value: `${data.airSpeed.toFixed(1)} m/s`, 
      icon: Wind,
      color: "text-chart-2"
    },
    { 
      label: "Heading", 
      value: `${data.heading.toFixed(0)}°`, 
      icon: Compass,
      color: "text-chart-3"
    },
    { 
      label: "Battery", 
      value: `${data.battery}%`, 
      icon: Battery,
      color: data.battery > 30 ? "text-chart-1" : "text-chart-4"
    },
    { 
      label: "Temperature", 
      value: `${data.temperature}°C`, 
      icon: ThermometerSun,
      color: "text-chart-3"
    },
    { 
      label: "GPS Satellites", 
      value: data.gpsCount.toString(), 
      icon: Navigation,
      color: data.gpsCount >= 8 ? "text-chart-1" : "text-chart-4"
    },
    { 
      label: "V. Speed", 
      value: `${data.verticalSpeed > 0 ? "+" : ""}${data.verticalSpeed.toFixed(1)} m/s`, 
      icon: RotateCw,
      color: "text-chart-5"
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Flight Telemetry</CardTitle>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-mono">
            {data.flightMode}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {telemetryItems.map((item) => (
            <div 
              key={item.label}
              className="bg-secondary/50 rounded-lg p-3 border border-border/50"
            >
              <div className="flex items-center gap-2 mb-1">
                <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
              <p className="text-lg font-mono font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3 border border-border/50 text-center">
            <span className="text-xs text-muted-foreground block mb-1">Roll</span>
            <p className="text-sm font-mono font-semibold">{data.roll.toFixed(1)}°</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 border border-border/50 text-center">
            <span className="text-xs text-muted-foreground block mb-1">Pitch</span>
            <p className="text-sm font-mono font-semibold">{data.pitch.toFixed(1)}°</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 border border-border/50 text-center">
            <span className="text-xs text-muted-foreground block mb-1">Yaw</span>
            <p className="text-sm font-mono font-semibold">{data.yaw.toFixed(0)}°</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
