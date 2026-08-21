import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { api } from "@/services/api"
import { Lightbulb, TrendingUp, Zap, CheckCircle2, ArrowUpRight } from "lucide-react"
import type { Recommendation } from "@/services/api"

export const metadata = { title: "AI Recommendations — LocalBiz AI" }

const priorityStyles: Record<Recommendation["priority"], { label: string; className: string }> = {
  high: {
    label: "High priority",
    className: "border-rose-300/25 bg-rose-400/15 text-rose-200",
  },
  medium: {
    label: "Medium priority",
    className: "border-cyan-300/25 bg-cyan-400/15 text-cyan-200",
  },
  low: {
    label: "Low priority",
    className: "border-white/15 bg-white/[0.07] text-slate-300",
  },
}

export default async function RecommendationsPage() {
  const recs = await api.getRecommendations()
  const highCount = recs.filter((r) => r.priority === "high").length

  return (
    <div className="dashboard-glass relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
      <div className="relative z-10 flex flex-col gap-6 text-slate-100">
        <header className="rounded-3xl border border-white/[0.14] bg-white/[0.06] p-5 backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-6">
          <div className="flex items-center gap-2 text-sm text-cyan-200">
            <span className="flex size-8 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10">
              <Lightbulb className="size-4" />
            </span>
            <span>AI-generated action plan</span>
          </div>

          <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-white text-balance sm:text-3xl">
            Recommendations for you
          </h2>

          <p className="mt-2 max-w-2xl text-pretty text-slate-300">
            Clear, prioritized actions based on your prices, stock, competitors, and the weather. Start with the high
            priority items for the biggest impact.
          </p>
        </header>

        {highCount > 0 && (
          <div className="flex items-start gap-3 rounded-2xl border border-violet-300/20 bg-gradient-to-r from-violet-400/[0.12] via-blue-400/[0.08] to-cyan-400/[0.08] p-4 backdrop-blur-[22px] shadow-[0_18px_55px_rgba(0,0,0,0.20)]">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/15 text-violet-200">
              <Zap className="size-5" />
            </span>
            <div className="text-sm">
              <p className="font-medium text-white">
                {highCount} action{highCount > 1 ? "s" : ""} need your attention today
              </p>
              <p className="text-slate-300">
                These are time-sensitive because rain is forecast in the next few days.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {recs.map((rec) => {
            const p = priorityStyles[rec.priority]
            return (
              <Card
                key={rec.id}
                className="overflow-hidden !border-white/[0.16] !bg-white/[0.07] text-white backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <div className="flex flex-col gap-0 md:flex-row">
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className={p.className}>
                          {p.label}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="border border-white/10 bg-white/[0.08] text-xs text-slate-200"
                        >
                          {rec.category}
                        </Badge>
                      </div>

                      <CardTitle className="mt-1 text-lg text-white text-balance">
                        {rec.title}
                      </CardTitle>

                      <CardDescription className="text-pretty leading-relaxed text-slate-300">
                        {rec.summary}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4">
                      <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                          How to do it
                        </p>
                        <ul className="flex flex-col gap-2">
                          {rec.steps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <Button
                          size="sm"
                          className="border border-cyan-300/20 bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.24)] hover:from-blue-400 hover:to-violet-400"
                        >
                          Apply this action
                          <ArrowUpRight className="size-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>

                  <div className="flex flex-row justify-between gap-4 border-t border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:w-56 md:flex-col md:border-l md:border-t-0">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-cyan-300">
                        <TrendingUp className="size-3.5" />
                        Expected impact
                      </div>
                      <p className="mt-1 font-sans text-sm font-semibold text-white text-balance">
                        {rec.impact}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Effort</p>
                      <p className="mt-1 font-sans text-sm font-semibold text-white">{rec.effort}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
