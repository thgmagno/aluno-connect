'use client'

import { Check, X } from 'lucide-react'
import { useState } from 'react'

export default function SwitchFrequency() {
  const [frequency, setFrequency] = useState(false)

  const Present = () => (
    <div className="rounded-full bg-emerald-500 px-2">
      <Check strokeWidth={2.5} className="text-neutral-100" />
    </div>
  )

  const Absent = () => (
    <div className="rounded-full bg-red-500 px-2">
      <X strokeWidth={2.5} className="text-neutral-100" />
    </div>
  )

  return (
    <button onClick={() => setFrequency(!frequency)}>
      {frequency ? <Present /> : <Absent />}
    </button>
  )
}
