'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, X } from 'lucide-react'
import { navItems } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/language-provider'

const tamilLabels: Record<string, string> = {
  Dashboard: 'முகப்பு',
  Analyze: 'ஆய்வு',
  Recommendations: 'பரிந்துரைகள்',
  Marketing: 'மார்க்கெட்டிங்',
  Campaigns: 'பிரச்சாரங்கள்',
}

function BrandMark() {
  const { language } = useLanguage()

  return (
    <Link href="/dashboard" className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Sparkles className="size-5" />
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] font-bold tracking-tight">
          LocalBiz AI
        </span>

        <span className="text-[0.7rem] text-muted-foreground">
          {language === 'ta'
            ? 'ஸ்மார்ட் கடை உதவியாளர்'
            : 'Smart shop assistant'}
        </span>
      </span>
    </Link>
  )
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { language } = useLanguage()

  return (
    <nav
      className="flex flex-1 flex-col gap-1 px-3"
      aria-label="Main"
    >
      {navItems.map((item) => {
        const active =
          pathname === item.href ||
          pathname.startsWith(item.href + '/')

        const Icon = item.icon

        const label =
          language === 'ta'
            ? tamilLabels[item.label] ?? item.label
            : item.label

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon
              className={cn(
                'size-[1.15rem] shrink-0',
                active
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-foreground',
              )}
            />

            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export function DesktopSidebar() {
  const { language } = useLanguage()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center px-6">
        <BrandMark />
      </div>

      <div className="flex flex-1 flex-col py-4">
        <SidebarNav />
      </div>

      <div className="m-3 rounded-xl border border-border bg-muted/50 p-4">
        <p className="font-display text-sm font-semibold">
          {language === 'ta'
            ? 'இலவச டெமோ முறை'
            : 'Free demo mode'}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {language === 'ta'
            ? 'நீங்கள் மாதிரி தரவுடன் பயன்படுத்துகிறீர்கள். நேரடியாக பயன்படுத்த உங்கள் கடையை இணைக்கவும்.'
            : "You're exploring with sample data. Connect your shop to go live."}
        </p>
      </div>
    </aside>
  )
}

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden',
        open
          ? 'pointer-events-auto'
          : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          'absolute inset-0 bg-foreground/40 transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-sidebar shadow-xl transition-transform duration-300',
          open
            ? 'translate-x-0'
            : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <BrandMark />

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col py-4">
          <SidebarNav onNavigate={onClose} />
        </div>
      </aside>
    </div>
  )
}
