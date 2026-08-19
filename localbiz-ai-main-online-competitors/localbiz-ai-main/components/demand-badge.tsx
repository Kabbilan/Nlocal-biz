import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Demand } from '@/services/api'

export function DemandBadge({ demand }: { demand: Demand }) {
  if (demand === 'HIGH') {
    return (
      <Badge variant="success">
        <TrendingUp />
        High demand
      </Badge>
    )
  }
  if (demand === 'MEDIUM') {
    return (
      <Badge variant="warning">
        <Minus />
        Medium demand
      </Badge>
    )
  }
  return (
    <Badge variant="secondary">
      <TrendingDown />
      Low demand
    </Badge>
  )
}
