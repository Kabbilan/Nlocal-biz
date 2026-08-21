"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Check,
  Copy,
  Camera,
  MessageCircle,
  FileText,
  Tag,
  type LucideIcon,
} from "lucide-react"

const icons: Record<string, LucideIcon> = {
  Camera,
  MessageCircle,
  FileText,
  Tag,
}

export function CopyCard({
  title,
  description,
  content,
  icon,
  aurora = false,
}: {
  title: string
  description: string
  content: string
  icon: string
  aurora?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const Icon = icons[icon] ?? FileText

  function handleCopy() {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Card
      className={
        aurora
          ? "flex flex-col !border-white/[0.16] !bg-white/[0.07] text-white backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.08)]"
          : "flex flex-col"
      }
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className={
                aurora
                  ? "flex size-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/15 to-violet-400/15 text-cyan-200"
                  : "flex size-8 items-center justify-center rounded-md bg-primary/10"
              }
            >
              <Icon className={aurora ? "size-4" : "size-4 text-primary"} />
            </div>
            <CardTitle className={aurora ? "text-base text-white" : "text-base"}>
              {title}
            </CardTitle>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            aria-label={`Copy ${title}`}
            className={
              aurora
                ? "shrink-0 border border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/[0.12] hover:text-white"
                : "shrink-0"
            }
          >
            {copied ? (
              <>
                <Check className={aurora ? "size-4 text-cyan-300" : "size-4 text-primary"} />
                <span className={aurora ? "text-cyan-300" : "text-primary"}>Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        <CardDescription className={aurora ? "text-slate-300" : undefined}>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <p
          className={
            aurora
              ? "whitespace-pre-wrap rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4 text-sm leading-relaxed text-slate-200 backdrop-blur-xl"
              : "whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-4 text-sm leading-relaxed text-foreground"
          }
        >
          {content}
        </p>
      </CardContent>
    </Card>
  )
}
