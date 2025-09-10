import { Fireworks } from '@fireworks-js/react'
import { useRef } from 'react';

export default function Celebration({ winner }: { winner: string | null }) {
  const ref = useRef(null)

  if (!winner) return null

  return (
    <Fireworks
      ref={ref}
      options={{ opacity: 0.5 }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        pointerEvents: "none",
      }}
    />
  )
}
