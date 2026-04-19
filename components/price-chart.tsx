import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useEffect } from "react"

interface PriceEntry {
  price: number
  date: string
}

interface PriceChartProps {
  data: PriceEntry[]
}

function formatPrice(price: number): string {
  return `MX$${price.toLocaleString("en-US")}`
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("es-MX", {  
    month: "short", 
    day: "numeric" 
  });
}

export function PriceChart({ data }: PriceChartProps) {
  const chartData = data.map((entry) => {
    
    return({
    ...entry,
    formattedDate: formatDate(entry.date),
  })})
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Price History</CardTitle>
        <CardDescription>Coursera Plus subscription price over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="oklch(0.269 0 0)" 
                vertical={false}
              />
              <XAxis
                dataKey="formattedDate"
                stroke="oklch(0.708 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                minTickGap={30}
              />
              <YAxis
                stroke="oklch(0.708 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                domain={["dataMin - 500", "dataMax + 500"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.205 0 0)",
                  border: "1px solid oklch(0.269 0 0)",
                  borderRadius: "8px",
                  color: "oklch(0.985 0 0)",
                }}
                labelStyle={{ color: "oklch(0.708 0 0)" }}
                formatter={(value: number) => [formatPrice(value), "Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#fff"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
