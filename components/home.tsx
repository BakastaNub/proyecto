'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, LabelList } from 'recharts'
import { MemoizedClock } from './clock'
import dynamic from 'next/dynamic'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']
const MACHINE_COLORS = ['#FF0000', '#FF3300', '#FF6600', '#FF9900', '#FFCC00', '#FFFF00', '#CCFF00', '#99FF00', '#66FF00', '#33FF00']

// Lazy load the charts
const LazyPieChart = dynamic(() => import('./pie-chart'), { ssr: false })
const LazyBarChart = dynamic(() => import('./bar-chart'), { ssr: false })

export function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [timeFilter, setTimeFilter] = useState('24h')
  const [data, setData] = useState([
    { name: 'Reembolsos', value: 400 },
    { name: 'Domicilios', value: 300 },
    { name: 'Sin problemas', value: 500 },
  ])
  const [machineData, setMachineData] = useState(() => 
    Array.from({ length: 35 }, (_, i) => ({
      name: `Máquina ${i + 1}`,
      fallos: Math.floor(Math.random() * 100)
    }))
  )

  const updateData = useCallback(() => {
    // Simular cambio de datos basado en el filtro de tiempo
    const newData = timeFilter === '24h' 
      ? [
          { name: 'Reembolsos', value: 400 },
          { name: 'Domicilios', value: 300 },
          { name: 'Sin problemas', value: 500 }
        ]
      : timeFilter === '7d'
      ? [
          { name: 'Reembolsos', value: 2800 },
          { name: 'Domicilios', value: 2100 },
          { name: 'Sin problemas', value: 3500 }
        ]
      : [
          { name: 'Reembolsos', value: 12000 },
          { name: 'Domicilios', value: 9000 },
          { name: 'Sin problemas', value: 15000 }
        ]
    setData(newData)

    // Simular cambio de datos de máquinas basado en el filtro de tiempo
    const newMachineData = Array.from({ length: 35 }, (_, i) => ({
      name: `Máquina ${i + 1}`,
      fallos: Math.floor(Math.random() * (timeFilter === '24h' ? 100 : timeFilter === '7d' ? 700 : 3000))
    }))
    setMachineData(newMachineData)
  }, [timeFilter])

  useEffect(() => {
    updateData()
  }, [updateData])

  const totalValue = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data])

  const sortedMachineData = useMemo(() => {
    return [...machineData]
      .sort((a, b) => b.fallos - a.fallos)
      .slice(0, 10)
      .map((item, index) => ({
        ...item,
        color: MACHINE_COLORS[index]
      }))
  }, [machineData])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-col space-y-2">
        <div className="text-center md:text-left">
          <MemoizedClock />
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {selectedDate?.toLocaleDateString()}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Select onValueChange={setTimeFilter} defaultValue={timeFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Últimas 24 horas</SelectItem>
            <SelectItem value="7d">Últimos 7 días</SelectItem>
            <SelectItem value="1m">Último mes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Distribución de Operaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[400px]">
            <LazyPieChart data={data} colors={COLORS} totalValue={totalValue} />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Top 10 Máquinas con Más Fallos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] md:h-[500px]">
            <LazyBarChart data={sortedMachineData} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

