import { useEffect, useRef } from 'react'
export const useInView = () => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          console.log(entry.target.id, 'Is visible?:', entry.isIntersecting)
        })
      },
      { 
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px'
      }
    )
    observer.observe(element)
    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])
  return ref
}