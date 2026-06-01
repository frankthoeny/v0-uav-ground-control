"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Maximize2, Layers, MapPin, Navigation } from "lucide-react"
import L, { LatLngExpression, Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMemo, useEffect, useRef } from 'react'

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
  const mapRef = useRef<LeafletMap | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const pathLayerRef = useRef<L.Polyline | null>(null)

  const center: LatLngExpression = [currentPosition.lat, currentPosition.lng]

  const path = useMemo(() => waypoints.map((w) => [w.lat, w.lng] as LatLngExpression), [waypoints])

  const esriSatellite = {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
  }

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      center,
      zoom: 16,
      scrollWheelZoom: true,
      zoomControl: true,
    })

    L.tileLayer(esriSatellite.url, {
      attribution: esriSatellite.attribution,
    }).addTo(map)

    const pathLayer = L.polyline(path, {
      color: '#4f46e5',
      dashArray: '6 6',
      weight: 3,
    }).addTo(map)

    const markers = L.layerGroup(
      waypoints.map((wp) => {
        const marker = L.circleMarker([wp.lat, wp.lng], {
          radius: wp.type === 'home' ? 8 : wp.type === 'current' ? 6 : 5,
          color: wp.type === 'home' ? '#f59e0b' : wp.type === 'current' ? '#06b6d4' : '#7c3aed',
          fillColor: wp.type === 'home' ? '#fbbf24' : wp.type === 'current' ? '#67e8f9' : '#a78bfa',
          weight: 1,
          fillOpacity: 1,
        })

        marker.bindPopup(`ID: ${wp.id}<br/>Lat: ${wp.lat.toFixed(5)}<br/>Lng: ${wp.lng.toFixed(5)}<br/>Alt: ${wp.altitude}`)
        return marker
      })
    ).addTo(map)

    const uavMarker = L.circleMarker([currentPosition.lat, currentPosition.lng], {
      radius: 8,
      color: '#ef4444',
      fillColor: '#fca5a5',
      weight: 1,
      fillOpacity: 1,
    }).bindPopup(`UAV<br/>${currentPosition.lat.toFixed(5)}, ${currentPosition.lng.toFixed(5)}`)

    markers.addLayer(uavMarker)

    mapRef.current = map
    markersLayerRef.current = markers
    pathLayerRef.current = pathLayer

    return () => {
      map.remove()
      mapRef.current = null
      markersLayerRef.current = null
      pathLayerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    map.setView(center, map.getZoom())

    if (pathLayerRef.current) {
      pathLayerRef.current.setLatLngs(path)
    }

    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers()

      waypoints.forEach((wp) => {
        const marker = L.circleMarker([wp.lat, wp.lng], {
          radius: wp.type === 'home' ? 8 : wp.type === 'current' ? 6 : 5,
          color: wp.type === 'home' ? '#f59e0b' : wp.type === 'current' ? '#06b6d4' : '#7c3aed',
          fillColor: wp.type === 'home' ? '#fbbf24' : wp.type === 'current' ? '#67e8f9' : '#a78bfa',
          weight: 1,
          fillOpacity: 1,
        })
        marker.bindPopup(`ID: ${wp.id}<br/>Lat: ${wp.lat.toFixed(5)}<br/>Lng: ${wp.lng.toFixed(5)}<br/>Alt: ${wp.altitude}`)
        markersLayerRef.current?.addLayer(marker)
      })

      const uavMarker = L.circleMarker([currentPosition.lat, currentPosition.lng], {
        radius: 8,
        color: '#ef4444',
        fillColor: '#fca5a5',
        weight: 1,
        fillOpacity: 1,
      }).bindPopup(`UAV<br/>${currentPosition.lat.toFixed(5)}, ${currentPosition.lng.toFixed(5)}`)
      markersLayerRef.current.addLayer(uavMarker)
    }
  }, [currentPosition, path, waypoints])

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
        <div className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden border border-border/50">
          <div ref={mapContainerRef} className="h-full w-full" />

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
