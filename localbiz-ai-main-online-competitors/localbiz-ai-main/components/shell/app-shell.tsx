'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { DesktopSidebar, MobileSidebar } from './sidebar'
import { Topbar } from './topbar'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const dashboardMode = pathname === '/dashboard'

  return (
    <div
      className={
        dashboardMode
          ? 'min-h-screen bg-[#050b16]'
          : 'min-h-screen bg-background'
      }
    >
      <DesktopSidebar />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-64">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main
          className={
            dashboardMode
              ? 'mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8'
              : 'mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8'
          }
        >
          {children}
        </main>
      </div>
    </div>
  )
}
