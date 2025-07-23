'use client'

import React, { useRef, useState, useEffect } from 'react'

// розміри компонента динамічно
export function useComponentSize() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!ref.current) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { ref, size }
}
