import {
  LayoutDashboard,
  Sparkles,
  Store,
  Lightbulb,
  Megaphone,
  CalendarClock,
  ChartColumn,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  description: string
}

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Your shop at a glance',
  },
  {
    label: 'Analyze Product',
    href: '/analyze',
    icon: Sparkles,
    description: 'Let AI study a product',
  },
  {
    label: 'Competitor Intel',
    href: '/competitors',
    icon: Store,
    description: 'See what online sellers charge',
  },
  {
    label: 'AI Recommendation',
    href: '/recommendations',
    icon: Lightbulb,
    description: 'Your next best move',
  },
  {
    label: 'Marketing Studio',
    href: '/marketing',
    icon: Megaphone,
    description: 'Ready-to-post content',
  },
  {
    label: 'Campaign Planner',
    href: '/campaigns',
    icon: CalendarClock,
    description: 'Plan a 7-day launch',
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: ChartColumn,
    description: 'Track your results',
  },
]
