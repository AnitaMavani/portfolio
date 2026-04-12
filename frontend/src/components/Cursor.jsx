import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cursor')
    if (!cur) return

    const move = (e) => {
      cur.style.left = e.clientX + 'px'
      cur.style.top = e.clientY + 'px'
    }

    const grow = () => cur.classList.add('grow')
    const shrink = () => cur.classList.remove('grow')

    document.addEventListener('mousemove', move)

    const targets = document.querySelectorAll('a, button, .project-row, .skill-item, .exp-row')
    targets.forEach((el) => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return <div id="cursor" aria-hidden="true" />
}
