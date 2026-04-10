import { useEffect, useState } from 'react'

/** Correspond au breakpoint Tailwind `sm` (640px) : dessous, formulaires en étapes. */
const MQ = '(max-width: 639px)'

export function useIsMobileFormSteps(): boolean {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MQ).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(MQ)
    const apply = () => setNarrow(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return narrow
}
