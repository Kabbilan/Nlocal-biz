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
}: {
  title: string
  description: string
  content: string
  icon: string
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
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
              <Icon className="size-4 text-primary" />
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            aria-label={`Copy ${title}`}
            className="shrink-0"
          >
            {copied ? (
              <>
                <Check className="size-4 text-primary" />
                <span className="text-primary">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-4 text-sm leading-relaxed text-foreground">
          {content}
        </p>
      </CardContent>
    </Card>
  )
}
