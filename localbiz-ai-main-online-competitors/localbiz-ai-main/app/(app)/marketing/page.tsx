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
import { Megaphone } from "lucide-react"

export const metadata = { title: "Marketing Studio — LocalBiz AI" }

export default async function MarketingPage() {
  const [content, analysis] = await Promise.all([
    api.getMarketingContent(),
    api.getAnalysisResult(),
  ])

  const m = content

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Megaphone className="size-4 text-primary" />
          <span>Ready-to-use content for</span>
          <span className="font-medium text-foreground">
            {analysis.identification}
          </span>
        </div>

        <h2 className="font-sans text-2xl font-semibold tracking-tight text-balance">
          Marketing Studio
        </h2>

        <p className="max-w-2xl text-pretty text-muted-foreground">
          AI-written posts, messages, and descriptions you can copy and post
          in seconds. No writing skills needed.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden lg:col-span-1">
          <div className="relative aspect-[4/5] w-full bg-muted">
            <Image
              src="/poster-raincoat.png"
              alt="Promotional poster for the monsoon rain coat offer"
              fill
              className="object-cover"
            />

            <div className="absolute inset-x-0 top-0 flex flex-col gap-1 bg-gradient-to-b from-background/80 to-transparent p-5">
              <Badge className="w-fit">{m.posterTag}</Badge>

              <h3 className="font-sans text-2xl font-bold text-foreground text-balance drop-shadow-sm">
                {m.posterHeadline}
              </h3>

              <p className="text-sm font-medium text-foreground/90">
                {m.posterSubhead}
              </p>
            </div>
          </div>

          <CardHeader>
            <CardTitle className="text-base">
              Suggested poster
            </CardTitle>

            <CardDescription>
              Print it or share it on social media as-is.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
          <CopyCard
            title="Instagram Caption"
            description="Ready to post with hashtags"
            content={m.instagramCaption}
            icon="Camera"
          />

          <CopyCard
            title="WhatsApp Message"
            description="Send to your customer list"
            content={m.whatsappMessage}
            icon="MessageCircle"
          />

          <CopyCard
            title="Product Description"
            description="For your catalog or listing"
            content={m.productDescription}
            icon="FileText"
          />

          <CopyCard
            title="Offer Message"
            description="Short and punchy for stories"
            content={m.offerMessage}
            icon="Tag"
          />
        </div>
      </div>
    </div>
  )
}
