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

const auroraRoutes = [
  '/dashboard',
  '/recommendations',
  '/marketing',
  '/campaign',
  '/campaigns',
]

function isAuroraRoute(pathname: string) {
  return auroraRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  )
}

function BrandMark({ dashboardMode = false }: { dashboardMode?: boolean }) {
  const { language } = useLanguage()

  return (
    <Link href="/dashboard" className="flex items-center gap-2.5">
      <span
        className={cn(
          'flex size-9 items-center justify-center rounded-xl text-primary-foreground shadow-sm',
          dashboardMode
            ? 'border border-cyan-300/20 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_8px_28px_rgba(34,211,238,0.24)]'
            : 'bg-primary',
        )}
      >
        <Sparkles className="size-5" />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[0.95rem] font-bold tracking-tight',
            dashboardMode && 'text-white',
          )}
        >
          LocalBiz AI
        </span>

        <span
          className={cn(
            'text-[0.7rem]',
            dashboardMode ? 'text-slate-400' : 'text-muted-foreground',
          )}
        >
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
  const dashboardMode = isAuroraRoute(pathname)

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Main">
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
              'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
              dashboardMode
                ? active
                  ? 'border border-cyan-300/20 bg-gradient-to-r from-cyan-400/[0.13] via-blue-500/[0.12] to-violet-500/[0.13] text-white shadow-[0_8px_28px_rgba(34,211,238,0.10)] backdrop-blur-xl'
                  : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                : active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon
              className={cn(
                'size-[1.15rem] shrink-0 transition-colors',
                dashboardMode
                  ? active
                    ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.45)]'
                    : 'text-slate-500 group-hover:text-cyan-200'
                  : active
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
  const pathname = usePathname()
  const dashboardMode = isAuroraRoute(pathname)

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r lg:flex',
        dashboardMode
          ? 'overflow-hidden border-white/10 bg-[#050816]/80 text-white backdrop-blur-[28px] shadow-[12px_0_55px_rgba(0,0,0,0.28)]'
          : 'border-sidebar-border bg-sidebar',
      )}
    >
      {dashboardMode ? (
        <>
          <div className="pointer-events-none absolute -left-28 -top-12 h-80 w-80 rounded-full bg-cyan-400/15 blur-[110px]" />
          <div className="pointer-events-none absolute left-10 top-1/3 h-72 w-72 rounded-full bg-blue-500/12 blur-[115px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-violet-500/14 blur-[120px]" />
        </>
      ) : null}

      <div className="relative flex h-16 items-center border-b border-white/[0.06] px-6">
        <BrandMark dashboardMode={dashboardMode} />
      </div>

      <div className="relative flex flex-1 flex-col py-4">
        <SidebarNav />
      </div>

      <div
        className={cn(
          'relative m-3 rounded-2xl border p-4',
          dashboardMode
            ? 'border-white/10 bg-white/[0.055] shadow-[0_14px_35px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl'
            : 'border-border bg-muted/50',
        )}
      >
        <p
          className={cn(
            'font-display text-sm font-semibold',
            dashboardMode && 'text-white',
          )}
        >
          {language === 'ta' ? 'இலவச டெமோ முறை' : 'Free demo mode'}
        </p>

        <p
          className={cn(
            'mt-1 text-xs',
            dashboardMode ? 'text-slate-400' : 'text-muted-foreground',
          )}
        >
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
  const pathname = usePathname()
  const dashboardMode = isAuroraRoute(pathname)

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          'absolute inset-0 transition-opacity',
          dashboardMode ? 'bg-black/65 backdrop-blur-sm' : 'bg-foreground/40',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col shadow-xl transition-transform duration-300',
          dashboardMode
            ? 'border-r border-white/10 bg-[#050816]/92 text-white backdrop-blur-[28px]'
            : 'bg-sidebar',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/[0.06] px-6">
          <BrandMark dashboardMode={dashboardMode} />

          <button
            onClick={onClose}
            aria-label="Close menu"
            className={cn(
              'flex size-9 items-center justify-center rounded-lg',
              dashboardMode
                ? 'text-slate-400 hover:bg-white/[0.08] hover:text-white'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
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
