import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor = "text-chart-1" }: StatCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  )
}
