import { AppShell } from '@/components/shell/app-shell'
import { LanguageProvider } from '@/components/language-provider'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <AppShell>{children}</AppShell>
    </LanguageProvider>
  )
}
