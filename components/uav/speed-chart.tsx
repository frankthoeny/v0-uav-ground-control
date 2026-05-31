"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

interface SpeedChartProps {
  data: Array<{ time: string; groundSpeed: number; airSpeed: number }>
}

export function SpeedChart({ data }: SpeedChartProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Speed Telemetry</CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-chart-2" />
              <span className="text-muted-foreground">Ground</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-chart-5" />
              <span className="text-muted-foreground">Air</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'oklch(0.6 0 0)', fontSize: 10 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'oklch(0.6 0 0)', fontSize: 10 }}
                domain={[0, 'auto']}
                unit=" m/s"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(0.12 0.005 260)',
                  border: '1px solid oklch(0.25 0.01 260)',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
                labelStyle={{ color: 'oklch(0.6 0 0)' }}
              />
              <Line
                type="monotone"
                dataKey="groundSpeed"
                stroke="oklch(0.65 0.18 220)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="airSpeed"
                stroke="oklch(0.65 0.12 280)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
