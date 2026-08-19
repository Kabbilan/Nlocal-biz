'use client'

import { useLanguage } from './language-provider'

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
      aria-label="Change language"
    >
      {language === 'en' ? 'தமிழ்' : 'English'}
    </button>
  )
}
