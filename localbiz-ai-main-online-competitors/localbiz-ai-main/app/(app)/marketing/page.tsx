import Image from "next/image"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CopyCard } from "@/components/copy-card"
import { api } from "@/services/api"
import { Megaphone, Sparkles } from "lucide-react"

export const metadata = { title: "Marketing Studio — LocalBiz AI" }

export default async function MarketingPage() {
  const [content, analysis] = await Promise.all([
    api.getMarketingContent(),
    api.getAnalysisResult(),
  ])

  const m = content

  return (
    <div className="dashboard-glass relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
      <div className="relative z-10 flex flex-col gap-6 text-slate-100">
        <header className="rounded-3xl border border-white/[0.14] bg-white/[0.06] p-5 backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-cyan-200">
            <span className="flex size-8 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10">
              <Megaphone className="size-4" />
            </span>
            <span>Ready-to-use content for</span>
            <span className="rounded-full border border-violet-300/20 bg-violet-400/10 px-2.5 py-1 font-medium text-violet-200">
              {analysis.identification}
            </span>
          </div>

          <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-white text-balance sm:text-3xl">
            Marketing Studio
          </h2>

          <p className="mt-2 max-w-2xl text-pretty text-slate-300">
            AI-written posts, messages, and descriptions you can copy and post
            in seconds. No writing skills needed.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="overflow-hidden !border-white/[0.16] !bg-white/[0.07] text-white backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.08)] lg:col-span-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950/40">
              <Image
                src="/poster-raincoat.png"
                alt="Promotional poster for the monsoon rain coat offer"
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/45 via-transparent to-[#050816]/70" />

              <div className="absolute inset-x-0 top-0 flex flex-col gap-2 p-5">
                <Badge className="w-fit border border-cyan-200/20 bg-cyan-300/15 text-cyan-100 backdrop-blur-xl">
                  <Sparkles className="size-3.5" />
                  {m.posterTag}
                </Badge>

                <h3 className="font-sans text-2xl font-bold text-white text-balance drop-shadow-lg">
                  {m.posterHeadline}
                </h3>

                <p className="text-sm font-medium text-slate-100 drop-shadow-md">
                  {m.posterSubhead}
                </p>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-base text-white">
                Suggested poster
              </CardTitle>

              <CardDescription className="text-slate-300">
                Print it or share it on social media as-is.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            <CopyCard
              aurora
              title="Instagram Caption"
              description="Ready to post with hashtags"
              content={m.instagramCaption}
              icon="Camera"
            />

            <CopyCard
              aurora
              title="WhatsApp Message"
              description="Send to your customer list"
              content={m.whatsappMessage}
              icon="MessageCircle"
            />

            <CopyCard
              aurora
              title="Product Description"
              description="For your catalog or listing"
              content={m.productDescription}
              icon="FileText"
            />

            <CopyCard
              aurora
              title="Offer Message"
              description="Short and punchy for stories"
              content={m.offerMessage}
              icon="Tag"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
