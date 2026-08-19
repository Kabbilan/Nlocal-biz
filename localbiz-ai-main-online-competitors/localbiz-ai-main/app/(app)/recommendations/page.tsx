import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { api } from "@/services/api"
import { Lightbulb, TrendingUp, Zap, CheckCircle2, ArrowUpRight } from "lucide-react"
import type { Recommendation } from "@/services/api"

export const metadata = { title: "AI Recommendations — LocalBiz AI" }

const priorityStyles: Record<Recommendation["priority"], { label: string; className: string }> = {
  high: { label: "High priority", className: "bg-destructive/10 text-destructive border-destructive/20" },
  medium: { label: "Medium priority", className: "bg-chart-4/15 text-chart-4 border-chart-4/25" },
  low: { label: "Low priority", className: "bg-muted text-muted-foreground border-border" },
}

export default async function RecommendationsPage() {
  const recs = await api.getRecommendations()
  const highCount = recs.filter((r) => r.priority === "high").length

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lightbulb className="size-4 text-primary" />
          <span>AI-generated action plan</span>
        </div>
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-balance">Recommendations for you</h2>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          Clear, prioritized actions based on your prices, stock, competitors, and the weather. Start with the high
          priority items for the biggest impact.
        </p>
      </header>

      {highCount > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <Zap className="mt-0.5 size-5 shrink-0 text-primary" />
          <div className="text-sm">
            <p className="font-medium text-foreground">
              {highCount} action{highCount > 1 ? "s" : ""} need your attention today
            </p>
            <p className="text-muted-foreground">
              These are time-sensitive because rain is forecast in the next few days.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {recs.map((rec) => {
          const p = priorityStyles[rec.priority]
          return (
            <Card key={rec.id} className="overflow-hidden">
              <div className="flex flex-col gap-0 md:flex-row">
                <div className="flex-1">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={p.className}>
                        {p.label}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {rec.category}
                      </Badge>
                    </div>
                    <CardTitle className="mt-1 text-lg text-balance">{rec.title}</CardTitle>
                    <CardDescription className="text-pretty leading-relaxed">{rec.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        How to do it
                      </p>
                      <ul className="flex flex-col gap-2">
                        {rec.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Button size="sm">
                        Apply this action
                        <ArrowUpRight className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>

                <div className="flex flex-row justify-between gap-4 border-t border-border bg-muted/30 p-6 md:w-56 md:flex-col md:border-l md:border-t-0">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      <TrendingUp className="size-3.5" />
                      Expected impact
                    </div>
                    <p className="mt-1 font-sans text-sm font-semibold text-foreground text-balance">{rec.impact}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Effort</p>
                    <p className="mt-1 font-sans text-sm font-semibold text-foreground">{rec.effort}</p>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
