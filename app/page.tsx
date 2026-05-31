"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/uav/header"
import { SidebarNav } from "@/components/uav/sidebar-nav"
import { TelemetryPanel } from "@/components/uav/telemetry-panel"
import { AltitudeChart } from "@/components/uav/altitude-chart"
import { SpeedChart } from "@/components/uav/speed-chart"
import { MapView } from "@/components/uav/map-view"
import { CameraFeed } from "@/components/uav/camera-feed"
import { FlightControls } from "@/components/uav/flight-controls"
import { SystemAlerts } from "@/components/uav/system-alerts"
import { MissionStatus } from "@/components/uav/mission-status"

// Simulated telemetry data generator
const generateTelemetry = (isFlying: boolean) => ({
  altitude: isFlying ? 45 + Math.random() * 10 : 0,
  groundSpeed: isFlying ? 8 + Math.random() * 4 : 0,
  airSpeed: isFlying ? 10 + Math.random() * 5 : 0,
  heading: 45 + Math.random() * 20,
  battery: Math.max(15, 78 - Math.floor(Math.random() * 5)),
  temperature: 24 + Math.floor(Math.random() * 6),
  gpsCount: 10 + Math.floor(Math.random() * 4),
  verticalSpeed: isFlying ? (Math.random() - 0.5) * 4 : 0,
  roll: isFlying ? (Math.random() - 0.5) * 10 : 0,
  pitch: isFlying ? (Math.random() - 0.5) * 8 : 0,
  yaw: 45 + Math.random() * 20,
  flightMode: isFlying ? "AUTO" : "STABILIZE"
})

// Static initial telemetry for SSR
const initialTelemetry = {
  altitude: 50,
  groundSpeed: 10,
  airSpeed: 12,
  heading: 55,
  battery: 78,
  temperature: 26,
  gpsCount: 12,
  verticalSpeed: 0.5,
  roll: 1.2,
  pitch: -0.8,
  yaw: 55,
  flightMode: "AUTO"
}

// Generate chart data
const generateChartData = (points: number) => {
  const data = []
  let altitude = 40
  let groundSpeed = 8
  let airSpeed = 10
  
  for (let i = 0; i < points; i++) {
    altitude += (Math.random() - 0.5) * 5
    groundSpeed += (Math.random() - 0.5) * 1
    airSpeed += (Math.random() - 0.5) * 1.5
    
    data.push({
      time: `${i}s`,
      altitude: Math.max(0, altitude),
      target: 50,
      groundSpeed: Math.max(0, groundSpeed),
      airSpeed: Math.max(0, airSpeed)
    })
  }
  return data
}

// Static initial chart data for SSR
const initialChartData = Array.from({ length: 30 }, (_, i) => ({
  time: `${i}s`,
  altitude: 45 + (i * 0.3),
  target: 50,
  groundSpeed: 8 + (i * 0.1),
  airSpeed: 10 + (i * 0.15)
}))

// Initial waypoints
const initialWaypoints = [
  { id: 0, lat: 37.7749, lng: -122.4394, altitude: 0, type: "home" as const },
  { id: 1, lat: 37.7780, lng: -122.4350, altitude: 50, type: "waypoint" as const },
  { id: 2, lat: 37.7820, lng: -122.4280, altitude: 50, type: "waypoint" as const },
  { id: 3, lat: 37.7850, lng: -122.4220, altitude: 45, type: "waypoint" as const },
  { id: 4, lat: 37.7880, lng: -122.4180, altitude: 40, type: "current" as const },
]

// Initial alerts
const initialAlerts = [
  { id: "1", type: "success" as const, message: "GPS lock acquired - 12 satellites", timestamp: "14:32:15" },
  { id: "2", type: "info" as const, message: "Mission waypoint 3 reached", timestamp: "14:31:42" },
  { id: "3", type: "warning" as const, message: "Wind speed increasing to 15 km/h", timestamp: "14:30:18" },
  { id: "4", type: "info" as const, message: "Battery level at 78%", timestamp: "14:29:55" },
  { id: "5", type: "success" as const, message: "Telemetry link stable", timestamp: "14:28:30" },
]

// Mission waypoints
const missionWaypoints = [
  { id: 1, name: "Takeoff Point", altitude: 10, status: "completed" as const },
  { id: 2, name: "Survey Area A", altitude: 50, status: "completed" as const },
  { id: 3, name: "Survey Area B", altitude: 50, status: "completed" as const },
  { id: 4, name: "Survey Area C", altitude: 45, status: "current" as const },
  { id: 5, name: "Return Path", altitude: 40, status: "pending" as const },
  { id: 6, name: "Landing Zone", altitude: 5, status: "pending" as const },
]

export default function UAVDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isConnected] = useState(true)
  const [isFlying, setIsFlying] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [throttle, setThrottle] = useState(65)
  const [activeVehicle, setActiveVehicle] = useState("Falcon-01")
  const [telemetry, setTelemetry] = useState(initialTelemetry)
  const [altitudeData, setAltitudeData] = useState(initialChartData)
  const [speedData, setSpeedData] = useState(initialChartData)
  const [currentPosition, setCurrentPosition] = useState({ lat: 37.7865, lng: -122.4200 })
  const [isMounted, setIsMounted] = useState(false)

  const vehicles = ["Falcon-01", "Eagle-02", "Hawk-03"]

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Simulate telemetry updates (only after mount to avoid hydration mismatch)
  useEffect(() => {
    if (!isMounted) return
    
    const interval = setInterval(() => {
      setTelemetry(generateTelemetry(isFlying))
      
      // Update chart data with new point
      setAltitudeData(prev => {
        const newData = [...prev.slice(1)]
        const lastAltitude = prev[prev.length - 1].altitude
        newData.push({
          time: `${parseInt(prev[prev.length - 1].time) + 1}s`,
          altitude: isFlying ? Math.max(0, lastAltitude + (Math.random() - 0.5) * 3) : 0,
          target: 50,
          groundSpeed: 0,
          airSpeed: 0
        })
        return newData
      })

      setSpeedData(prev => {
        const newData = [...prev.slice(1)]
        const lastGround = prev[prev.length - 1].groundSpeed
        const lastAir = prev[prev.length - 1].airSpeed
        newData.push({
          time: `${parseInt(prev[prev.length - 1].time) + 1}s`,
          altitude: 0,
          target: 0,
          groundSpeed: isFlying ? Math.max(0, lastGround + (Math.random() - 0.5) * 1) : 0,
          airSpeed: isFlying ? Math.max(0, lastAir + (Math.random() - 0.5) * 1.2) : 0
        })
        return newData
      })

      // Slowly move UAV position
      if (isFlying) {
        setCurrentPosition(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.0002,
          lng: prev.lng + (Math.random() - 0.5) * 0.0002
        }))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isFlying, isMounted])

  const handleTakeoff = useCallback(() => {
    setIsFlying(true)
    setThrottle(50)
  }, [])

  const handleLand = useCallback(() => {
    setIsFlying(false)
    setThrottle(0)
  }, [])

  const handleReturnHome = useCallback(() => {
    setCurrentPosition({ lat: 37.7749, lng: -122.4394 })
  }, [])

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header 
        isConnected={isConnected}
        signalStrength={92}
        activeVehicle={activeVehicle}
        vehicles={vehicles}
        onVehicleChange={setActiveVehicle}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
            {/* Left column - Map & Camera */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex-1 min-h-[300px]">
                <MapView 
                  waypoints={initialWaypoints}
                  currentPosition={currentPosition}
                />
              </div>
              <div className="h-[280px]">
                <CameraFeed 
                  isRecording={isRecording}
                  onToggleRecord={() => setIsRecording(!isRecording)}
                />
              </div>
            </div>

            {/* Center column - Telemetry & Charts */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <TelemetryPanel data={telemetry} />
              <AltitudeChart data={altitudeData} />
              <SpeedChart data={speedData} />
            </div>

            {/* Right column - Controls & Status */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <FlightControls 
                isFlying={isFlying}
                throttle={throttle}
                onThrottleChange={setThrottle}
                onTakeoff={handleTakeoff}
                onLand={handleLand}
                onReturnHome={handleReturnHome}
              />
              <MissionStatus 
                missionName="Area Survey Alpha"
                progress={67}
                waypoints={missionWaypoints}
                elapsedTime="00:23:45"
                estimatedRemaining="00:11:30"
                distanceCovered={2.4}
                totalDistance={3.6}
              />
              <SystemAlerts alerts={initialAlerts} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
