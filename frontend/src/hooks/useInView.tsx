import { useEffect, useRef, useState } from 'react'
export const useInView = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -200px 0px' }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}