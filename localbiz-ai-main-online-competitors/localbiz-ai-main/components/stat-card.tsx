import {
  TrendingUp,
  TrendingDown,
  ScanSearch,
  Flame,
  ListChecks,
  Megaphone,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { DashboardStat } from '@/services/api'

const iconMap = {
  analyzed: ScanSearch,
  'high-demand': Flame,
  actions: ListChecks,
  campaigns: Megaphone,
} as const

export function StatCard({
  stat,
  accent,
}: {
  stat: DashboardStat
  accent?: boolean
}) {
  const positive = stat.trend === 'up'
  const Icon = iconMap[stat.id as keyof typeof iconMap]

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {stat.label}
          </p>

          <p className="mt-2 font-display text-3xl font-bold tracking-tight">
            {stat.value}
          </p>
        </div>

        {Icon ? (
          <span
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-xl',
              accent
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground',
            )}
          >
            <Icon className="size-5" />
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-semibold',
            positive
              ? 'bg-success/12 text-success'
              : 'bg-destructive/10 text-destructive',
          )}
        >
          {positive ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}

          {Math.abs(stat.change)}%
        </span>

        <span className="truncate text-muted-foreground">
          {stat.hint}
        </span>
      </div>
    </Card>
  )
}
