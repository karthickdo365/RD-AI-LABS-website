import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Returns a function that smooth-scrolls to a section on the home page.
 * If the visitor is on another route (e.g. /privacy) it first goes home.
 */
export function useGoTo() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return useCallback(
    (id) => {
      if (pathname !== '/') {
        navigate('/', { state: { scrollTo: id } })
        return
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    },
    [pathname, navigate]
  )
}
