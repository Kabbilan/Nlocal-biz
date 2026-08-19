import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DemandBadge } from "@/components/demand-badge"
import { CompetitorChart } from "@/components/charts/competitor-chart"
import { api, formatCurrency } from "@/services/api"
import { Globe2, TrendingDown, ArrowRight, Star, Truck } from "lucide-react"

export const metadata = { title: "Competitor Intelligence — LocalBiz AI" }

export default async function CompetitorsPage() {
  const analysis = await api.getAnalysisResult()
  const prices = analysis.onlineCompetitors
  const yourPrice = analysis.currentPrice
  const recommended = analysis.recommendedPrice

  const lowest = Math.min(...prices.map((p) => p.price + p.shipping))
  const highest = Math.max(...prices.map((p) => p.price + p.shipping))
  const avg = Math.round(prices.reduce((s, p) => s + p.price + p.shipping, 0) / prices.length)

  const chartData = [
    { name: "You", price: yourPrice, you: true },
    ...prices.map((p) => ({ name: p.platform, price: p.price + p.shipping, you: false })),
  ]

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe2 className="size-4" />
          <span>Online analysis for</span>
          <span className="font-medium text-foreground">{analysis.identification}</span>
        </div>
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-balance">Competitor Intelligence</h2>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          Compare online marketplace listings, including delivery costs and seller signals, so you can position your
          product to win shoppers without hurting your margin.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col gap-1 pt-6">
            <span className="text-sm text-muted-foreground">Lowest delivered price</span>
            <span className="font-sans text-2xl font-semibold">{formatCurrency(lowest)}</span>
            <span className="text-xs text-muted-foreground">The price to beat online</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1 pt-6">
            <span className="text-sm text-muted-foreground">Average market price</span>
            <span className="font-sans text-2xl font-semibold">{formatCurrency(avg)}</span>
            <span className="text-xs text-muted-foreground">Across {prices.length} online listings</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1 pt-6">
            <span className="text-sm text-muted-foreground">Highest delivered price</span>
            <span className="font-sans text-2xl font-semibold">{formatCurrency(highest)}</span>
            <span className="text-xs text-muted-foreground">Room above the market</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Price comparison</CardTitle>
            <CardDescription>Your price vs. online listings, including delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <CompetitorChart data={chartData} recommended={recommended} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="size-5 text-primary" />
              What this means
            </CardTitle>
            <CardDescription>Plain-language takeaway</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm leading-relaxed">
            <p>
              You are currently priced at{" "}
              <span className="font-semibold text-foreground">{formatCurrency(yourPrice)}</span> — that is{" "}
              <span className="font-semibold text-destructive">
                {formatCurrency(yourPrice - lowest)} more expensive
              </span>{" "}
                than the cheapest delivered listing online.
            </p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">Recommended move</p>
              <p className="text-foreground">
                Set your price to{" "}
                 <span className="font-semibold">{formatCurrency(recommended)}</span> to stay below the delivered
                 online market floor while keeping a{" "}
                <span className="font-semibold">{formatCurrency(recommended - analysis.cost)}</span> margin per unit.
              </p>
            </div>
            <p className="text-muted-foreground">
               Matching the online market floor on listed price while offering local availability can make your
               product the faster, more convenient choice for price-conscious shoppers.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
           <CardTitle>Online listings</CardTitle>
           <CardDescription>Sorted by delivered price, with seller and delivery signals</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {[...prices]
             .sort((a, b) => (a.price + a.shipping) - (b.price + b.shipping))
            .map((p) => {
              const isCheapest = p.price === lowest
              return (
                <div
                   key={`${p.platform}-${p.seller}`}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                       <Globe2 className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                         <span className="font-medium">{p.platform}</span>
                        {isCheapest && (
                          <Badge variant="secondary" className="text-xs">
                            Cheapest
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/80">{p.seller}</span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="size-3 fill-current text-warning-foreground" />
                          {p.rating} ({p.reviews.toLocaleString("en-IN")})
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Truck className="size-3" />
                          {p.delivery}
                        </span>
                        <span>· {p.note}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-right">
                      <span className="font-sans text-xl font-semibold">{formatCurrency(p.price + p.shipping)}</span>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(p.price)} +{" "}
                        {p.shipping === 0 ? "free delivery" : `${formatCurrency(p.shipping)} delivery`}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        <ArrowRight className="size-4 shrink-0 text-primary" />
        <span>
          Want us to turn this into a pricing action?{" "}
          <span className="font-medium text-foreground">Check the AI Recommendations page</span> for a ready-to-apply
          plan.
        </span>
      </div>
    </div>
  )
}
