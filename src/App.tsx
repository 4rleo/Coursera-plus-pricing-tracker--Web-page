import { DollarSign, TrendingDown, TrendingUp, Clock, GraduationCap } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { PriceChart } from "@/components/price-chart"
import { PriceTable } from "@/components/price-table"
import {useState, useEffect} from 'react'
import '../styles/globals.css'

import priceData from "./../../data.json"

interface PriceEntry {
  price: number
  date: string
}

function formatPrice(price: number): string {
  return `MX$${price.toLocaleString("en-US")}`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function getLastPriceChange(data: PriceEntry[]): { date: string; change: number } {
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  for (let i = 0; i < sortedData.length - 1; i++) {
    if (sortedData[i].price !== sortedData[i + 1].price) {
      return {
        date: sortedData[i].date,
        change: sortedData[i].price - sortedData[i + 1].price,
      }
    }
  }
  
  return { date: sortedData[0]?.date || "", change: 0 }
}

export default function App() {
  const [data, setData] = useState<PriceEntry[]>([])
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await fetch
        ("https://raw.githubusercontent.com/4rleo/Coursera-plus-pricing-tracker/master/data.json")
        const json = await response.json()
        setData(json)
      } catch (error){
        console.error("Error cargando el historial de datos") 
      }
    }
    fetchData()
  }, [])
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  const currentPrice = sortedData[0]?.price || 0
  const lowestPrice = Math.min(...data.map((d) => d.price))
  const highestPrice = Math.max(...data.map((d) => d.price))
  const lastChange = getLastPriceChange(data)
  
  const lowestPriceEntry = data.find((d) => d.price === lowestPrice)
  const highestPriceEntry = data.find((d) => d.price === highestPrice)

  

  return (
    <main className="min-h-screen bg-background font-[Montserrat]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            
            <h1 className="text-3xl font-bold text-foreground">
              Coursera Plus Price Tracker
            </h1>
          </div>
          <p className="text-muted-foreground">
            Monitor Coursera Plus annual subscription prices in Mexico
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Current Price"
            value={formatPrice(currentPrice)}
            subtitle={`As of ${formatDate(sortedData[0]?.date || "")}`}
            icon={DollarSign}
            iconColor="text-chart-1"
          />
          <StatCard
            title="Lowest Price"
            value={formatPrice(lowestPrice)}
            subtitle={lowestPriceEntry ? `On ${formatDate(lowestPriceEntry.date)}` : undefined}
            icon={TrendingDown}
            iconColor="text-emerald-400"
          />
          <StatCard
            title="Highest Price"
            value={formatPrice(highestPrice)}
            subtitle={highestPriceEntry ? `On ${formatDate(highestPriceEntry.date)}` : undefined}
            icon={TrendingUp}
            iconColor="text-red-400"
          />
          <StatCard
            title="Last Price Change"
            value={formatDate(lastChange.date)}
            subtitle={
              lastChange.change > 0
                ? `Increased by ${formatPrice(lastChange.change)}`
                : lastChange.change < 0
                ? `Decreased by ${formatPrice(Math.abs(lastChange.change))}`
                : "No change recorded"
            }
            icon={Clock}
            iconColor="text-amber-400"
          />
        </div>

        {/* Price Chart */}
        <div className="mb-8">
          <PriceChart data={data} />
        </div>

        {/* Price Table */}
        <PriceTable data={data} />
      </div>
    </main>
  )
}
