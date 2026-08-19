import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import {
  EngagementChart,
  ChannelChart,
  ProductPerformanceChart,
} from "@/components/charts/analytics-charts"
import { api } from "@/services/api"
import { BarChart3 } from "lucide-react"

export const metadata = { title: "Analytics — LocalBiz AI" }

export default async function AnalyticsPage() {
  const data = await api.getAnalytics()

  const funnelMax = data.funnel[0].value

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BarChart3 className="size-4 text-primary" />
          <span>Last 7 days</span>
        </div>
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-balance">Analytics</h2>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          See how your campaigns and products are performing, in numbers anyone can understand.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((kpi) => (
          <StatCard key={kpi.id} stat={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Views &amp; enquiries over time</CardTitle>
            <CardDescription>How interest built up over the week</CardDescription>
          </CardHeader>
          <CardContent>
            <EngagementChart data={data.engagementOverTime} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Where customers come from</CardTitle>
            <CardDescription>Share of engagement by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChannelChart data={data.channelSplit} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Product performance</CardTitle>
            <CardDescription>Views vs. actual conversions per product</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductPerformanceChart data={data.productPerformance} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer journey</CardTitle>
            <CardDescription>From first view to purchase</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-2">
            {data.funnel.map((stage, i) => {
              const pct = Math.round((stage.value / funnelMax) * 100)
              return (
                <div key={stage.stage} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stage.stage}</span>
                    <span className="text-muted-foreground">{stage.value.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${pct}%`, opacity: 1 - i * 0.15 }}
                    />
                  </div>
                </div>
              )
            })}
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              About{" "}
              <span className="font-semibold text-foreground">
                {Math.round((data.funnel[3].value / data.funnel[0].value) * 100)}%
              </span>{" "}
              of people who saw your campaign ended up buying — a strong result for a local shop.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
