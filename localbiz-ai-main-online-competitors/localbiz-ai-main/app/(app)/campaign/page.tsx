import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/services/api"
import { CalendarClock, Radio, CheckCircle2, Clock, CloudRain } from "lucide-react"
import type { CampaignPhase } from "@/services/api"

export const metadata = { title: "Campaign Planner — LocalBiz AI" }

const statusMap: Record<
  CampaignPhase["status"],
  { label: string; className: string; dot: string }
> = {
  live: { label: "Live now", className: "bg-primary/10 text-primary border-primary/20", dot: "bg-primary" },
  ready: { label: "Ready", className: "bg-chart-2/15 text-chart-2 border-chart-2/25", dot: "bg-chart-2" },
  scheduled: {
    label: "Scheduled",
    className: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground",
  },
}

export default async function CampaignPage() {
  const phases = await api.getCampaignPlan()

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarClock className="size-4 text-primary" />
          <span>Auto-planned around the weather forecast</span>
        </div>
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-balance">Monsoon Raincoat Campaign</h2>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          A step-by-step promotion timed to peak right as the rain arrives. Each phase tells you exactly what to post
          and where.
        </p>
      </header>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-primary/15">
              <CloudRain className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Rain expected in 2 days</p>
              <p className="text-sm text-muted-foreground">
                Your campaign is timed to build demand and convert during the rain.
              </p>
            </div>
          </div>
          <Badge className="w-fit">5-phase plan</Badge>
        </CardContent>
      </Card>

      <div className="relative flex flex-col gap-0">
        {/* vertical timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

        {phases.map((phase, i) => {
          const s = statusMap[phase.status]
          return (
            <div key={phase.id} className="relative flex gap-4 pb-6 last:pb-0">
              <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                <span className={`size-3 rounded-full ${s.dot}`} aria-hidden="true" />
              </div>

              <Card className="flex-1">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      <Clock className="size-3.5" />
                      {phase.timing}
                    </div>
                    <Badge variant="outline" className={s.className}>
                      {phase.status === "live" && <Radio className="size-3" />}
                      {phase.status === "ready" && <CheckCircle2 className="size-3" />}
                      {s.label}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">
                    <span className="text-muted-foreground">Step {i + 1} — </span>
                    {phase.title}
                  </CardTitle>
                  <CardDescription>
                    <span className="font-medium text-foreground">{phase.channel}</span> · {phase.goal}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="rounded-lg border border-border bg-muted/40 p-4 text-sm leading-relaxed text-foreground">
                    {phase.content}
                  </p>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
