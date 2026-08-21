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
    <Card className="group relative overflow-hidden !border-white/[0.16] !bg-white/[0.07] p-5 text-white backdrop-blur-[22px] shadow-[0_20px_55px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-1 hover:!border-cyan-300/25 hover:shadow-[0_24px_65px_rgba(34,211,238,0.12)]">
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-blue-500/20 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/25" />
      <div className="pointer-events-none absolute -bottom-14 -left-10 size-28 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-300">{stat.label}</p>

          <p className="mt-2 bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text font-display text-3xl font-bold tracking-tight text-transparent">
            {stat.value}
          </p>
        </div>

        {Icon ? (
          <span
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-2xl border backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]',
              accent
                ? 'border-violet-300/25 bg-gradient-to-br from-blue-500/80 to-violet-500/80 text-white shadow-[0_10px_30px_rgba(99,102,241,0.28)]'
                : 'border-white/15 bg-white/[0.09] text-cyan-200',
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
              ? 'border-emerald-300/20 bg-emerald-400/10 text-emerald-300'
              : 'border-rose-300/20 bg-rose-400/10 text-rose-300',
          )}
        >
          {positive ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}

          {Math.abs(stat.change)}%
        </span>

        <span className="truncate text-slate-400">{stat.hint}</span>
      </div>
    </Card>
  )
}
