import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface PriceEntry {
  price: number
  date: string
}

interface PriceTableProps {
  data: PriceEntry[]
}

function formatPrice(price: number): string {
  return `MX$${price.toLocaleString("en-US")}`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function PriceTable({ data }: PriceTableProps) {
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  const lowestPrice = Math.min(...data.map((d) => d.price))
  const highestPrice = Math.max(...data.map((d) => d.price))

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Historical Data</CardTitle>
        <CardDescription>All recorded price entries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className=" border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-right text-muted-foreground">Price (MXN)</TableHead>
                <TableHead className="text-right text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((entry, index) => (
                <TableRow key={index} className="border-border">
                  <TableCell className="font-medium text-foreground">
                    {formatDate(entry.date)}
                  </TableCell>
                  <TableCell className="text-right text-foreground">
                    {formatPrice(entry.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {entry.price === lowestPrice && (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Lowest
                      </span>
                    )}
                    {entry.price === highestPrice && (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                        Highest
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
