'use client'

import { usePathname } from 'next/navigation'
import { Menu, Search, Bell } from 'lucide-react'
import { navItems } from '@/lib/nav'
import { LanguageToggle } from '@/components/language-toggle'
import { useLanguage } from '@/components/language-provider'

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

  const current = navItems.find(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(item.href + '/'),
  )

  const currentText =
    language === 'ta' && current
      ? tamilText[current.label]
      : null

  const pageLabel =
    currentText?.label ?? current?.label ?? 'Dashboard'

  const pageDescription =
    currentText?.description ??
    current?.description ??
    'Your shop at a glance'

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <button
        onClick={onMenuClick}
        aria-label={
          language === 'ta'
            ? 'மெனுவை திறக்கவும்'
            : 'Open menu'
        }
        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <div className="flex min-w-0 flex-col">
        <h1 className="truncate font-display text-lg font-bold tracking-tight">
          {pageLabel}
        </h1>

        <p className="hidden truncate text-xs text-muted-foreground sm:block">
          {pageDescription}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground md:flex">
          <Search className="size-4" />

          <input
            className="w-32 bg-transparent outline-none placeholder:text-muted-foreground xl:w-48"
            placeholder={
              language === 'ta'
                ? 'பொருட்களை தேடுங்கள்...'
                : 'Search products...'
            }
            aria-label={
              language === 'ta'
                ? 'பொருட்களை தேடுங்கள்'
                : 'Search products'
            }
          />
        </div>

        {/* Language Toggle */}
        <LanguageToggle />

        {/* Notifications */}
        <button
          aria-label={
            language === 'ta'
              ? 'அறிவிப்புகள்'
              : 'Notifications'
          }
          className="relative flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground"
        >
          <Bell className="size-[1.1rem]" />

          <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-card" />
        </button>

        {/* Store Profile */}
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card py-1 pl-1 pr-3">
          <span className="flex size-8 items-center justify-center rounded-md bg-secondary font-display text-sm font-bold text-secondary-foreground">
            RS
          </span>

          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-medium">
              Ravi&apos;s Store
            </span>

            <span className="text-[0.7rem] text-muted-foreground">
              {language === 'ta' ? 'உரிமையாளர்' : 'Owner'}
            </span>
          </span>
        </div>
      </div>
    </header>
  )
}
