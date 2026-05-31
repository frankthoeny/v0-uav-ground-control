"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

interface AltitudeChartProps {
  data: Array<{ time: string; altitude: number; target: number }>
}

export function AltitudeChart({ data }: AltitudeChartProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Altitude Profile</CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-chart-1" />
              <span className="text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-chart-3" />
              <span className="text-muted-foreground">Target</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="altitudeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.72 0.19 165)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="oklch(0.72 0.19 165)" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                unit="m"
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
              <Area
                type="monotone"
                dataKey="target"
                stroke="oklch(0.75 0.15 85)"
                strokeWidth={1}
                strokeDasharray="4 4"
                fill="none"
              />
              <Area
                type="monotone"
                dataKey="altitude"
                stroke="oklch(0.72 0.19 165)"
                strokeWidth={2}
                fill="url(#altitudeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
