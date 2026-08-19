import * as React from 'react'
import { cn } from '@/lib/utils'

function Progress({
  value = 0,
  className,
  indicatorClassName,
  ...props
}: React.ComponentProps<'div'> & { value?: number; indicatorClassName?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-muted', className)}
      {...props}
    >
      <div
        className={cn(
          'h-full rounded-full bg-primary transition-all duration-700 ease-out',
          indicatorClassName,
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export { Progress }
