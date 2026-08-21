'use client'

import { usePathname } from 'next/navigation'
import { Menu, Search, Bell } from 'lucide-react'
import { navItems } from '@/lib/nav'
import { LanguageToggle } from '@/components/language-toggle'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

const tamilText: Record<
  string,
  { label: string; description: string }
> = {
  Dashboard: {
    label: 'முகப்பு',
    description: 'உங்கள் கடையின் நிலவரம்',
  },
  Analyze: {
    label: 'ஆய்வு',
    description: 'உங்கள் பொருட்களை ஆய்வு செய்யுங்கள்',
  },
  Recommendations: {
    label: 'பரிந்துரைகள்',
    description: 'AI வழங்கும் வணிக பரிந்துரைகள்',
  },
  Marketing: {
    label: 'மார்க்கெட்டிங்',
    description: 'உங்கள் வணிகத்திற்கான மார்க்கெட்டிங்',
  },
  Campaigns: {
    label: 'பிரச்சாரங்கள்',
    description: 'உங்கள் விளம்பர பிரச்சாரங்களை நிர்வகிக்கவும்',
  },
}

export function Topbar({
  onMenuClick,
}: {
  onMenuClick: () => void
}) {
  const pathname = usePathname()
  const { language } = useLanguage()
  const dashboardMode = pathname === '/dashboard'

  const current = navItems.find(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(item.href + '/'),
  )

  const currentText =
    language === 'ta' && current ? tamilText[current.label] : null

  const pageLabel = currentText?.label ?? current?.label ?? 'Dashboard'

  const pageDescription =
    currentText?.description ??
    current?.description ??
    'Your shop at a glance'

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-16 items-center gap-3 border-b px-4 backdrop-blur-[22px] md:px-6',
        dashboardMode
          ? 'border-white/10 bg-[#07111f]/72 text-white shadow-[0_10px_35px_rgba(0,0,0,0.14)]'
          : 'border-border bg-background/80',
      )}
    >
      <button
        onClick={onMenuClick}
        aria-label={language === 'ta' ? 'மெனுவை திறக்கவும்' : 'Open menu'}
        className={cn(
          'flex size-9 items-center justify-center rounded-lg lg:hidden',
          dashboardMode
            ? 'text-slate-400 hover:bg-white/[0.08] hover:text-white'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        <Menu className="size-5" />
      </button>

      <div className="flex min-w-0 flex-col">
        <h1
          className={cn(
            'truncate font-display text-lg font-bold tracking-tight',
            dashboardMode && 'text-white',
          )}
        >
          {pageLabel}
        </h1>

        <p
          className={cn(
            'hidden truncate text-xs sm:block',
            dashboardMode ? 'text-slate-400' : 'text-muted-foreground',
          )}
        >
          {pageDescription}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div
          className={cn(
            'hidden items-center gap-2 rounded-xl border px-3 py-2 text-sm md:flex',
            dashboardMode
              ? 'border-white/10 bg-white/[0.06] text-slate-300 backdrop-blur-xl'
              : 'border-border bg-card text-muted-foreground',
          )}
        >
          <Search className="size-4" />

          <input
            className={cn(
              'w-32 bg-transparent outline-none xl:w-48',
              dashboardMode
                ? 'text-white placeholder:text-slate-500'
                : 'placeholder:text-muted-foreground',
            )}
            placeholder={
              language === 'ta'
                ? 'பொருட்களை தேடுங்கள்...'
                : 'Search products...'
            }
            aria-label={
              language === 'ta' ? 'பொருட்களை தேடுங்கள்' : 'Search products'
            }
          />
        </div>

        <div
          className={cn(
            dashboardMode &&
              'rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-xl [&_button]:border-0 [&_button]:bg-transparent [&_button]:text-slate-200',
          )}
        >
          <LanguageToggle />
        </div>

        <button
          aria-label={language === 'ta' ? 'அறிவிப்புகள்' : 'Notifications'}
          className={cn(
            'relative flex size-9 items-center justify-center rounded-xl border',
            dashboardMode
              ? 'border-white/10 bg-white/[0.06] text-slate-300 backdrop-blur-xl hover:bg-white/[0.10] hover:text-white'
              : 'border-border bg-card text-muted-foreground hover:text-foreground',
          )}
        >
          <Bell className="size-[1.1rem]" />
          <span
            className={cn(
              'absolute right-2 top-2 size-2 rounded-full bg-primary ring-2',
              dashboardMode ? 'ring-[#07111f]' : 'ring-card',
            )}
          />
        </button>

        <div
          className={cn(
            'flex items-center gap-2.5 rounded-xl border py-1 pl-1 pr-3',
            dashboardMode
              ? 'border-white/10 bg-white/[0.06] backdrop-blur-xl'
              : 'border-border bg-card',
          )}
        >
          <span
            className={cn(
              'flex size-8 items-center justify-center rounded-lg font-display text-sm font-bold',
              dashboardMode
                ? 'bg-gradient-to-br from-blue-500/80 to-violet-500/80 text-white'
                : 'bg-secondary text-secondary-foreground',
            )}
          >
            RS
          </span>

          <span className="hidden flex-col leading-tight sm:flex">
            <span
              className={cn(
                'text-sm font-medium',
                dashboardMode && 'text-white',
              )}
            >
              Ravi&apos;s Store
            </span>

            <span
              className={cn(
                'text-[0.7rem]',
                dashboardMode ? 'text-slate-400' : 'text-muted-foreground',
              )}
            >
              {language === 'ta' ? 'உரிமையாளர்' : 'Owner'}
            </span>
          </span>
        </div>
      </div>
    </header>
  )
}
