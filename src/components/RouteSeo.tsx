import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyRouteMeta, ROUTE_SEO } from '../lib/seo'

/** Met à jour title, meta description, Open Graph, Twitter et lien canonique à chaque navigation. */
export default function RouteSeo() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const cfg = ROUTE_SEO[pathname] ?? ROUTE_SEO['/']
    applyRouteMeta(pathname, cfg)
  }, [pathname])

  return null
}
