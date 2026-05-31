"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Info, CheckCircle2, XCircle, Clock } from "lucide-react"

interface Alert {
  id: string
  type: "info" | "warning" | "error" | "success"
  message: string
  timestamp: string
}

interface SystemAlertsProps {
  alerts: Alert[]
}

export function SystemAlerts({ alerts }: SystemAlertsProps) {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-3.5 w-3.5 text-chart-2" />
      case "warning":
        return <AlertTriangle className="h-3.5 w-3.5 text-chart-3" />
      case "error":
        return <XCircle className="h-3.5 w-3.5 text-chart-4" />
      case "success":
        return <CheckCircle2 className="h-3.5 w-3.5 text-chart-1" />
    }
  }

  const getAlertBadge = (type: Alert["type"]) => {
    switch (type) {
      case "info":
        return <Badge variant="outline" className="text-xs bg-chart-2/10 text-chart-2 border-chart-2/30">Info</Badge>
      case "warning":
        return <Badge variant="outline" className="text-xs bg-chart-3/10 text-chart-3 border-chart-3/30">Warning</Badge>
      case "error":
        return <Badge variant="outline" className="text-xs bg-chart-4/10 text-chart-4 border-chart-4/30">Error</Badge>
      case "success":
        return <Badge variant="outline" className="text-xs bg-chart-1/10 text-chart-1 border-chart-1/30">OK</Badge>
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {alerts.filter(a => a.type === "warning" || a.type === "error").length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="flex items-start gap-3 p-2 rounded-lg bg-secondary/30 border border-border/50"
              >
                <div className="mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-tight">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-mono">
                      {alert.timestamp}
                    </span>
                  </div>
                </div>
                {getAlertBadge(alert.type)}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
