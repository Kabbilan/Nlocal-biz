'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ScanSearch,
  CloudRain,
  ArrowRight,
  ArrowUpRight,
  Lightbulb,
} from 'lucide-react'

import { formatCurrency } from '@/services/api'
import { StatCard } from '@/components/stat-card'
import { DemandBadge } from '@/components/demand-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LiveGreeting } from './live-greeting'
import { useDashboardText } from './dashboard-text'

type DashboardContentProps = {
  stats: any[]
  products: any[]
  featured: any
  recommendations: any[]
}

const glassCard =
  '!border-white/[0.16] !bg-white/[0.07] text-white backdrop-blur-[22px] shadow-[0_20px_60px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)]'

export default function DashboardContent({
  stats,
  products,
  featured,
  recommendations,
}: DashboardContentProps) {
  const t = useDashboardText()

  const topRec = recommendations[0]
  const margin = featured.recommendedPrice - featured.cost

  return (
    <div className="relative isolate overflow-hidden rounded-[30px] border border-white/[0.12] bg-[#07111f] p-4 text-slate-100 shadow-[0_30px_100px_rgba(2,6,23,0.55)] sm:p-6 lg:p-7">
      {/* Mesh-gradient ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_8%,rgba(59,130,246,0.28),transparent_32%),radial-gradient(circle_at_88%_14%,rgba(34,211,238,0.20),transparent_28%),radial-gradient(circle_at_68%_78%,rgba(139,92,246,0.24),transparent_34%),radial-gradient(circle_at_18%_88%,rgba(99,102,241,0.20),transparent_30%),linear-gradient(135deg,#07111f_0%,#0b1327_48%,#11102a_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-blue-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-20 top-36 -z-10 h-96 w-96 rounded-full bg-cyan-400/15 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[140px]" />

      <div className="flex flex-col gap-6">
        {/* Welcome */}
        <div className="glass-panel flex flex-col gap-4 rounded-3xl border border-white/[0.14] bg-white/[0.06] p-5 backdrop-blur-[24px] lg:flex-row lg:items-center lg:justify-between">
          <div className="text-white [&_*]:!text-inherit">
            <LiveGreeting />
          </div>

          <Button
            size="lg"
            nativeButton={false}
            className="h-10 self-start border border-blue-300/20 bg-gradient-to-r from-blue-500 to-violet-500 px-4 text-white shadow-[0_10px_30px_rgba(59,130,246,0.30)] hover:from-blue-400 hover:to-violet-400"
            render={<Link href="/analyze" />}
          >
            <ScanSearch />
            {t.analyzeProduct}
          </Button>
        </div>

        {/* Weather */}
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200/20 bg-amber-300/[0.08] p-4 backdrop-blur-[20px] shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-amber-200/20 bg-amber-300/15 text-amber-200 shadow-inner">
            <CloudRain className="size-5" />
          </span>

          <div className="text-sm">
            <p className="font-semibold text-white">{t.rainExpected}</p>
            <p className="text-slate-300">{t.rainDescription}</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            className="ml-auto hidden shrink-0 border-white/15 bg-white/[0.08] text-white backdrop-blur-xl hover:bg-white/[0.14] hover:text-white sm:inline-flex"
            render={<Link href="/campaigns" />}
          >
            {t.planCampaign}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              stat={stat}
              accent={stat.id === 'campaigns'}
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Featured product */}
          <Card className={`${glassCard} lg:col-span-2`}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-white">{t.featuredInsight}</CardTitle>

              <Badge className="border border-violet-300/20 bg-violet-400/15 text-violet-100">
                <Lightbulb />
                {t.aiPick}
              </Badge>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:w-40">
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    fill
                    loading="eager"
                    className="object-cover"
                    sizes="160px"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {featured.name}
                    </h3>
                    <DemandBadge demand={featured.demand} />
                  </div>

                  <p className="mt-1 text-sm text-slate-300">{featured.category}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <Metric label={t.currentPrice} value={formatCurrency(featured.price)} />
                    <Metric
                      label={t.recommended}
                      value={formatCurrency(featured.recommendedPrice)}
                      highlight
                    />
                    <Metric label={t.marginUnit} value={formatCurrency(margin)} />
                    <Metric label={t.inStock} value={`${featured.stock} units`} />
                    <Metric label={t.marketRange} value="₹650–₹750" />
                    <Metric label={t.cost} value={formatCurrency(featured.cost)} />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      nativeButton={false}
                      className="bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-[0_8px_24px_rgba(59,130,246,0.25)] hover:from-blue-400 hover:to-violet-400"
                      render={<Link href="/analyze/results" />}
                    >
                      {t.viewAnalysis}
                      <ArrowRight />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      className="border-white/15 bg-white/[0.07] text-white backdrop-blur-xl hover:bg-white/[0.14] hover:text-white"
                      render={<Link href="/marketing" />}
                    >
                      {t.createMarketing}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendation */}
          <Card className={glassCard}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-white">{t.nextAction}</CardTitle>

              <Link
                href="/recommendations"
                className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200"
              >
                {t.all}
                <ArrowUpRight className="size-3.5" />
              </Link>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-400/[0.12] to-blue-400/[0.06] p-4 backdrop-blur-xl">
                <Badge variant="destructive">{t.highPriority}</Badge>

                <h4 className="mt-2 font-display text-base font-semibold leading-snug text-white">
                  {topRec.title}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {topRec.summary}
                </p>

                <p className="mt-3 text-sm font-medium text-emerald-300">
                  {topRec.impact}
                </p>
              </div>

              <Button
                variant="outline"
                nativeButton={false}
                className="w-full border-white/15 bg-white/[0.07] text-white backdrop-blur-xl hover:bg-white/[0.14] hover:text-white"
                render={<Link href="/recommendations" />}
              >
                {t.reviewRecommendations}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent products */}
        <Card className={glassCard}>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-white">{t.recentProducts}</CardTitle>

            <Link
              href="/analyze"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200"
            >
              {t.analyzeNew}
              <ArrowUpRight className="size-3.5" />
            </Link>
          </CardHeader>

          <CardContent className="px-0 pb-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-y border-white/10 bg-white/[0.035] text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="px-6 py-3 font-medium">{t.product}</th>
                    <th className="px-6 py-3 font-medium">{t.price}</th>
                    <th className="px-6 py-3 font-medium">{t.recommended}</th>
                    <th className="px-6 py-3 font-medium">{t.stock}</th>
                    <th className="px-6 py-3 font-medium">{t.demand}</th>
                    <th className="px-6 py-3 font-medium">{t.analyzed}</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-white/10 transition-colors last:border-0 hover:bg-white/[0.06]"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-white/[0.06]">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-medium text-white">{p.name}</p>
                            <p className="truncate text-xs text-slate-400">{p.category}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-3 text-slate-300">
                        {formatCurrency(p.price)}
                      </td>

                      <td className="px-6 py-3 font-medium text-cyan-300">
                        {formatCurrency(p.recommendedPrice)}
                      </td>

                      <td className="px-6 py-3 text-slate-300">{p.stock}</td>
                      <td className="px-6 py-3">
                        <DemandBadge demand={p.demand} />
                      </td>
                      <td className="px-6 py-3 text-slate-400">{p.analyzedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 py-2 backdrop-blur-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <p className="text-xs text-slate-400">{label}</p>
      <p
        className={`mt-0.5 font-display text-base font-semibold ${
          highlight ? 'text-cyan-300' : 'text-white'
        }`}
      >
        {value}
      </p>
    </div>
  )
}
