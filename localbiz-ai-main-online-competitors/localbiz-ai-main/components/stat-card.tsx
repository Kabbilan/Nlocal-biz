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
    <Card className="group relative overflow-hidden border-white/35 bg-white/55 p-5 shadow-[0_12px_35px_rgba(67,56,202,0.10)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_45px_rgba(67,56,202,0.18)] dark:border-white/10 dark:bg-white/[0.06]">
      <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/12 blur-3xl transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {stat.label}
          </p>

          <p className="mt-2 bg-gradient-to-r from-foreground to-primary bg-clip-text font-display text-3xl font-bold tracking-tight text-transparent">
            {stat.value}
          </p>
        </div>

        {Icon ? (
          <span
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-2xl border shadow-sm backdrop-blur-xl',
              accent
                ? 'border-primary/20 bg-primary/90 text-primary-foreground shadow-primary/20'
                : 'border-white/40 bg-white/60 text-primary dark:border-white/10 dark:bg-white/10',
            )}
          >
            <Icon className="size-5" />
          </span>
        ) : null}
      </div>

      <div className="relative mt-4 flex items-center gap-2 text-sm">
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold backdrop-blur-md',
            positive
              ? 'border-success/20 bg-success/10 text-success'
              : 'border-destructive/20 bg-destructive/10 text-destructive',
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
