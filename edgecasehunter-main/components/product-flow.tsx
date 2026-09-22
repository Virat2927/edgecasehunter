import { productFlow } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

export function ProductFlow({
  activeIndex = -1,
  className,
}: {
  activeIndex?: number
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {productFlow.map((step, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span
            className={cn(
              'font-mono text-[10.5px] tracking-[0.12em] uppercase transition-colors duration-200',
              i === activeIndex ? 'text-accent' : 'text-fg-muted',
            )}
          >
            {step}
          </span>
          {i < productFlow.length - 1 && (
            <span className="text-fg-muted/50">{'\u2192'}</span>
          )}
        </div>
      ))}
    </div>
  )
}
