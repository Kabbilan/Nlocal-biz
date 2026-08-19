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
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <LiveGreeting />
        </div>

        <Button
          size="lg"
          className="h-10 self-start px-4"
          render={<Link href="/analyze" />}
        >
          <ScanSearch />
          {t.analyzeProduct}
        </Button>
      </div>

      {/* Weather */}
      <div className="flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-warning/20 text-warning-foreground">
          <CloudRain className="size-5" />
        </span>

        <div className="text-sm">
          <p className="font-semibold text-foreground">
            {t.rainExpected}
          </p>

          <p className="text-muted-foreground">
            {t.rainDescription}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden shrink-0 sm:inline-flex"
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
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{t.featuredInsight}</CardTitle>

            <Badge variant="default">
              <Lightbulb />
              {t.aiPick}
            </Badge>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl border border-border bg-muted sm:w-40">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">
                    {featured.name}
                  </h3>

                  <DemandBadge demand={featured.demand} />
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {featured.category}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Metric
                    label={t.currentPrice}
                    value={formatCurrency(featured.price)}
                  />

                  <Metric
                    label={t.recommended}
                    value={formatCurrency(featured.recommendedPrice)}
                    highlight
                  />

                  <Metric
                    label={t.marginUnit}
                    value={formatCurrency(margin)}
                  />

                  <Metric
                    label={t.inStock}
                    value={`${featured.stock} units`}
                  />

                  <Metric
                    label={t.marketRange}
                    value="₹650–₹750"
                  />

                  <Metric
                    label={t.cost}
                    value={formatCurrency(featured.cost)}
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    render={<Link href="/analyze/results" />}
                  >
                    {t.viewAnalysis}
                    <ArrowRight />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
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
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{t.nextAction}</CardTitle>

            <Link
              href="/recommendations"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              {t.all}
              <ArrowUpRight className="size-3.5" />
            </Link>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <Badge variant="destructive">
                {t.highPriority}
              </Badge>

              <h4 className="mt-2 font-display text-base font-semibold leading-snug">
                {topRec.title}
              </h4>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {topRec.summary}
              </p>

              <p className="mt-3 text-sm font-medium text-success">
                {topRec.impact}
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              render={<Link href="/recommendations" />}
            >
              {t.reviewRecommendations}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent products */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>{t.recentProducts}</CardTitle>

          <Link
            href="/analyze"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t.analyzeNew}
            <ArrowUpRight className="size-3.5" />
          </Link>
        </CardHeader>

        <CardContent className="px-0 pb-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-y border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
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
                    className="border-b border-border last:border-0 hover:bg-muted/40"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">
                            {p.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {p.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-3 text-muted-foreground">
                      {formatCurrency(p.price)}
                    </td>

                    <td className="px-6 py-3 font-medium text-primary">
                      {formatCurrency(p.recommendedPrice)}
                    </td>

                    <td className="px-6 py-3 text-muted-foreground">
                      {p.stock}
                    </td>

                    <td className="px-6 py-3">
                      <DemandBadge demand={p.demand} />
                    </td>

                    <td className="px-6 py-3 text-muted-foreground">
                      {p.analyzedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
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
    <div className="rounded-xl border border-border bg-muted/40 px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p
        className={`mt-0.5 font-display text-base font-semibold ${
          highlight ? 'text-primary' : ''
        }`}
      >
        {value}
      </p>
    </div>
  )
}
