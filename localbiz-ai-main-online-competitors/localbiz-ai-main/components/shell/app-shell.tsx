'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { DesktopSidebar, MobileSidebar } from './sidebar'
import { Topbar } from './topbar'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const auroraMode = [
    '/dashboard',
    '/analyze',
    '/local-deals',
    '/competitors',
    '/analytics',
    '/recommendations',
    '/marketing',
    '/campaign',
    '/campaigns',
  ].some((route) => pathname === route || pathname.startsWith(route + '/'))

  return (
    <div
      className={
        auroraMode
          ? 'dark relative isolate min-h-screen overflow-x-hidden bg-[#050816] text-slate-100'
          : 'min-h-screen bg-background'
      }
    >
      {auroraMode ? (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(34,211,238,0.15),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_68%_78%,rgba(139,92,246,0.18),transparent_34%),radial-gradient(circle_at_24%_88%,rgba(99,102,241,0.13),transparent_30%),linear-gradient(135deg,#050816_0%,#07111f_48%,#0d0b25_100%)]" />
          <div className="absolute -left-28 top-24 h-[28rem] w-[28rem] rounded-full bg-cyan-400/[0.08] blur-[130px]" />
          <div className="absolute right-[-8rem] top-[28%] h-[32rem] w-[32rem] rounded-full bg-blue-500/[0.10] blur-[145px]" />
          <div className="absolute bottom-[-8rem] left-[38%] h-[34rem] w-[34rem] rounded-full bg-violet-500/[0.12] blur-[155px]" />
        </div>
      ) : null}

      <DesktopSidebar />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="relative z-10 lg:pl-64">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main
          className={
            auroraMode
              ? 'aurora-main mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8'
              : 'mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8'
          }
        >
          {children}
        </main>
      </div>
    </div>
  )
}
