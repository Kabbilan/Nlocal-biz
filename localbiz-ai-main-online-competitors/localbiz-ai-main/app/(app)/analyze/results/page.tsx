'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Check,
  CloudRain,
  Globe2,
  Clock,
  Users,
  Target,
  Lightbulb,
  FileSearch,
  Megaphone,
  ArrowRight,
  Tag,
  BadgeCheck,
} from 'lucide-react'

import { api, formatCurrency } from '@/services/api'
import { DemandBadge } from '@/components/demand-badge'
import { PriceRangeBar } from '@/components/price-range-bar'
import { useLanguage } from '@/components/language-provider'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const translations = {
  en: {
    analysisComplete: 'Analysis complete',
    createMarketing: 'Create marketing',
    recommendedPrice: 'Recommended price',
    keepsMargin: 'Keeps a',
    margin: 'margin',
    perUnit: 'per unit',
    suggestedOffer: 'Suggested offer',
    aiConfidence: 'AI confidence',
    highConfidence: 'High confidence in this identification',

    pricePosition: 'Where your price sits in the market',

    competitorPrices: 'Online competitor listings',
    online: 'Online',
    listed: 'listed',

    whyRecommendation: 'Why this recommendation',
    evidence: 'Evidence behind the numbers',

    productIdentification: 'Product identification',
    category: 'Category',
    keyFeatures: 'Key features',

    weather: 'Weather',

    gamePlan: 'Your game plan',
    bestTime: 'Best time to sell',
    targetCustomer: 'Target customer',
    strategy: 'Strategy',

    readyToAct: 'Ready to act on this?',
    readyDescription:
      'Turn this analysis into ready-to-share marketing and a launch plan.',
    planCampaign: 'Plan a campaign',
  },

  ta: {
    analysisComplete: 'ஆய்வு முடிந்தது',
    createMarketing: 'மார்க்கெட்டிங் உருவாக்கு',
    recommendedPrice: 'பரிந்துரைக்கப்பட்ட விலை',
    keepsMargin: 'ஒரு பொருளுக்கு',
    margin: 'லாபம்',
    perUnit: 'கிடைக்கும்',
    suggestedOffer: 'பரிந்துரைக்கப்படும் சலுகை',
    aiConfidence: 'AI நம்பகத்தன்மை',
    highConfidence: 'இந்த பொருள் அடையாளம் காணப்பட்டதில் அதிக நம்பிக்கை',

    pricePosition: 'சந்தையில் உங்கள் விலை நிலை',

    competitorPrices: 'ஆன்லைன் போட்டியாளர் பட்டியல்கள்',
    online: 'ஆன்லைன்',
    listed: 'பட்டியலிடப்பட்ட விலை',

    whyRecommendation: 'இந்த பரிந்துரை ஏன்?',
    evidence: 'இந்த எண்ணிக்கைகளுக்கான ஆதாரம்',

    productIdentification: 'பொருள் அடையாளம்',
    category: 'வகை',
    keyFeatures: 'முக்கிய அம்சங்கள்',

    weather: 'வானிலை',

    gamePlan: 'உங்கள் செயல்திட்டம்',
    bestTime: 'விற்பனைக்கு சிறந்த நேரம்',
    targetCustomer: 'இலக்கு வாடிக்கையாளர்',
    strategy: 'வியூகம்',

    readyToAct: 'இதை செயல்படுத்த தயாரா?',
    readyDescription:
      'இந்த ஆய்வை பகிரக்கூடிய மார்க்கெட்டிங் மற்றும் வெளியீட்டு திட்டமாக மாற்றுங்கள்.',
    planCampaign: 'Campaign திட்டமிடு',
  },
} as const

export default function ResultsPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [r, setR] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const result = await api.getAnalysisResult()
        setR(result)
      } catch (error) {
        console.error('Failed to load analysis result:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAnalysis()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {language === 'ta'
            ? 'ஆய்வு முடிவுகள் ஏற்றப்படுகின்றன...'
            : 'Loading analysis results...'}
        </p>
      </div>
    )
  }

  if (!r) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-destructive">
          {language === 'ta'
            ? 'ஆய்வு முடிவுகளை ஏற்ற முடியவில்லை.'
            : 'Unable to load analysis results.'}
        </p>
      </div>
    )
  }

  const margin = r.recommendedPrice - r.cost
  const marginPct =
    r.recommendedPrice > 0
      ? Math.round((margin / r.recommendedPrice) * 100)
      : 0

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src="/products/raincoat.png"
            alt={r.identification}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">
              <BadgeCheck />
              {t.analysisComplete}
            </Badge>

            <DemandBadge demand={r.demand} />
          </div>

          <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
            {r.identification}
          </h2>

          <p className="text-sm text-muted-foreground">
            {r.category}
          </p>
        </div>

        <Button
          size="lg"
          className="h-10 shrink-0 px-4"
          render={<Link href="/marketing" />}
        >
          <Megaphone />
          {t.createMarketing}
        </Button>
      </div>

      {/* Recommendation */}
      <div className="grid gap-4 md:grid-cols-3">

        <Card className="border-primary/30 bg-primary/5 md:col-span-2">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">

            <div className="flex-1">
              <p className="text-sm font-medium text-primary">
                {t.recommendedPrice}
              </p>

              <div className="mt-1 flex items-end gap-2">
                <span className="font-display text-4xl font-extrabold tracking-tight">
                  {formatCurrency(r.recommendedPrice)}
                </span>

                <span className="mb-1 text-sm text-muted-foreground line-through">
                  {formatCurrency(r.currentPrice)}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {t.keepsMargin}{' '}
                <span className="font-semibold">
                  {formatCurrency(margin)}
                </span>{' '}
                {t.margin} ({marginPct}%) {t.perUnit}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3">
              <Tag className="size-5 text-warning-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">
                  {t.suggestedOffer}
                </p>

                <p className="font-display text-sm font-semibold">
                  {r.offer}
                </p>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Confidence */}
        <Card>
          <CardContent className="flex flex-col justify-center gap-2 p-6">

            <p className="text-sm font-medium text-muted-foreground">
              {t.aiConfidence}
            </p>

            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold">
                {r.confidence}%
              </span>
            </div>

            <Progress
              value={r.confidence}
              indicatorClassName="bg-success"
            />

            <p className="text-xs text-muted-foreground">
              {t.highConfidence}
            </p>

          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left column */}
        <div className="flex flex-col gap-6 lg:col-span-2">

          {/* Price positioning */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t.pricePosition}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <PriceRangeBar
                min={r.marketRange.min}
                max={r.marketRange.max}
                current={r.currentPrice}
                recommended={r.recommendedPrice}
              />
            </CardContent>
          </Card>

          {/* Competitors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe2 className="size-4 text-primary" />
                {t.competitorPrices}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-2.5">
                {r.onlineCompetitors.map((c: any) => (
                <div
                    key={`${c.platform}-${c.seller}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {c.platform} · {c.seller}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {c.delivery} · {c.rating}★ ({c.reviews.toLocaleString('en-IN')} reviews) · {c.note}
                    </p>
                  </div>

                  <span className="font-display text-lg font-semibold">
                    {formatCurrency(c.price + c.shipping)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Reasoning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="size-4 text-primary" />
                {t.whyRecommendation}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="flex flex-col gap-3">
                {r.reasoning.map((why: string, i: number) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-xs font-bold text-primary">
                      {i + 1}
                    </span>

                    <span className="text-muted-foreground">
                      {why}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Evidence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSearch className="size-4 text-primary" />
                {t.evidence}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {r.evidence.map((e: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/30 p-3 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    {e}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">

          {/* Product identification */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t.productIdentification}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t.category}
                </p>

                <p className="mt-1 font-medium">
                  {r.category}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t.keyFeatures}
                </p>

                <ul className="mt-2 flex flex-col gap-1.5">
                  {r.features.map((f: string) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />

                      <span className="text-muted-foreground">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </CardContent>
          </Card>

          {/* Weather */}
          <Card>
            <CardContent className="flex gap-4 p-6">

              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CloudRain className="size-5" />
              </span>

              <div>
                <p className="font-display font-semibold">
                  {r.weather.condition}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {r.weather.detail}
                </p>

                <p className="mt-2 text-sm font-medium text-primary">
                  {r.weather.impact}
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Strategy */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t.gamePlan}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">

              <InfoRow
                icon={Clock}
                label={t.bestTime}
                value={r.bestTime}
              />

              <InfoRow
                icon={Users}
                label={t.targetCustomer}
                value={r.targetCustomer}
              />

              <InfoRow
                icon={Target}
                label={t.strategy}
                value={r.strategy}
              />

            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-secondary/50">
            <CardContent className="flex flex-col gap-3 p-6">

              <p className="font-display font-semibold">
                {t.readyToAct}
              </p>

              <p className="text-sm text-muted-foreground">
                {t.readyDescription}
              </p>

              <div className="flex flex-col gap-2">

                <Button
                  className="w-full"
                  render={<Link href="/marketing" />}
                >
                  {t.createMarketing}
                  <ArrowRight />
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  render={<Link href="/campaigns" />}
                >
                  {t.planCampaign}
                </Button>

              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon className="size-4" />
      </span>

      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="mt-0.5 text-sm leading-relaxed">
          {value}
        </p>
      </div>
    </div>
  )
}
