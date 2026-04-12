import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => obs.observe(el))

    return () => obs.disconnect()
  }, [])
}
