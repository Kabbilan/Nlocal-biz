'use client'

import { useEffect, useState } from 'react'

export function LiveGreeting() {
  const [dateTime, setDateTime] = useState('')

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      const hour = now.getHours()

      let greeting = 'Good evening'

      if (hour < 12) {
        greeting = 'Good morning'
      } else if (hour < 17) {
        greeting = 'Good afternoon'
      }

      const formatted = now.toLocaleString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })

      setDateTime(`${greeting}|${formatted}`)
    }

    updateDateTime()

    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const [greeting, currentDateTime] = dateTime.split('|')

  return (
    <>
      <h2 className="font-display text-2xl font-bold tracking-tight">
        {greeting || 'Good morning'}, Ravi
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        {currentDateTime}
      </p>

      <p className="mt-1 text-muted-foreground">
        Here&apos;s what&apos;s happening with your shop today.
      </p>
    </>
  )
}
