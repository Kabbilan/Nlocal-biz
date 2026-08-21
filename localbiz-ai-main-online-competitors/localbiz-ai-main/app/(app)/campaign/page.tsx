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
  live: {
    label: "Live now",
    className: "border-cyan-300/25 bg-cyan-400/15 text-cyan-200",
    dot: "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.85)]",
  },
  ready: {
    label: "Ready",
    className: "border-emerald-300/25 bg-emerald-400/15 text-emerald-200",
    dot: "bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.75)]",
  },
  scheduled: {
    label: "Scheduled",
    className: "border-violet-300/20 bg-violet-400/12 text-violet-200",
    dot: "bg-violet-300",
  },
}

export default async function CampaignPage() {
  const phases = await api.getCampaignPlan()

  return (
    <div className="dashboard-glass relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
      <div className="relative z-10 flex flex-col gap-6 text-slate-100">
        <header className="rounded-3xl border border-white/[0.14] bg-white/[0.06] p-5 backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-6">
          <div className="flex items-center gap-2 text-sm text-cyan-200">
            <span className="flex size-8 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10">
              <CalendarClock className="size-4" />
            </span>
            <span>Auto-planned around the weather forecast</span>
          </div>

          <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-white text-balance sm:text-3xl">
            Monsoon Raincoat Campaign
          </h2>

          <p className="mt-2 max-w-2xl text-pretty text-slate-300">
            A step-by-step promotion timed to peak right as the rain arrives. Each phase tells you exactly what to post
            and where.
          </p>
        </header>

        <Card className="!border-cyan-300/20 !bg-gradient-to-r !from-cyan-400/[0.10] !via-blue-400/[0.08] !to-violet-400/[0.10] text-white backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
          <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/15 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.15)]">
                <CloudRain className="size-5" />
              </div>
              <div>
                <p className="font-medium text-white">Rain expected in 2 days</p>
                <p className="text-sm text-slate-300">
                  Your campaign is timed to build demand and convert during the rain.
                </p>
              </div>
            </div>
            <Badge className="w-fit border border-violet-300/20 bg-violet-400/15 text-violet-100">
              5-phase plan
            </Badge>
          </CardContent>
        </Card>

        <div className="relative flex flex-col gap-0">
          <div
            className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-cyan-300/50 via-blue-300/30 to-violet-300/30"
            aria-hidden="true"
          />

          {phases.map((phase, i) => {
            const s = statusMap[phase.status]
            return (
              <div key={phase.id} className="relative flex gap-4 pb-6 last:pb-0">
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/[0.16] bg-[#0b1224]/90 shadow-[0_10px_30px_rgba(0,0,0,0.30)] backdrop-blur-xl">
                  <span className={`size-3 rounded-full ${s.dot}`} aria-hidden="true" />
                </div>

                <Card className="flex-1 !border-white/[0.16] !bg-white/[0.07] text-white backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                        <Clock className="size-3.5 text-cyan-300" />
                        {phase.timing}
                      </div>
                      <Badge variant="outline" className={s.className}>
                        {phase.status === "live" && <Radio className="size-3" />}
                        {phase.status === "ready" && <CheckCircle2 className="size-3" />}
                        {s.label}
                      </Badge>
                    </div>

                    <CardTitle className="text-lg text-white">
                      <span className="text-cyan-300">Step {i + 1} — </span>
                      {phase.title}
                    </CardTitle>

                    <CardDescription className="text-slate-300">
                      <span className="font-medium text-white">{phase.channel}</span> · {phase.goal}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 text-sm leading-relaxed text-slate-200 backdrop-blur-xl">
                      {phase.content}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
