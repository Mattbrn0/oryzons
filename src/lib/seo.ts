/**
 * SEO : URL publique du site (sans slash final).
 * Définir `VITE_SITE_URL` en prod (ex. https://www.oryzons.com) pour canonical, Open Graph et sitemap.
 */
export function getSiteUrl(): string {
  const raw = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
  const base = raw && raw.length > 0 ? raw : 'https://oryzons.com'
  return base.replace(/\/$/, '')
}

/** Image partagée par défaut (chemins relatifs à la racine du site). */
export const DEFAULT_OG_IMAGE_PATH = '/oryzons-logo-black-on-white.png'

export type RouteSeoConfig = {
  title: string
  description: string
  noindex?: boolean
}

export const ROUTE_SEO: Record<string, RouteSeoConfig> = {
  '/': {
    title: 'Oryzons | Agence web Lyon — sites sur mesure',
    description:
      'Création de sites vitrines et landing pages pour indépendants et PME : design, développement, hébergement, SEO et accompagnement à Lyon.',
  },
  '/a-propos': {
    title: 'À propos | Oryzons',
    description:
      "Découvrez l'histoire et la philosophie d'Oryzons : exigence, transparence et sites web professionnels durables.",
  },
  '/services': {
    title: 'Nos services web | Oryzons',
    description:
      'Création de site internet, hébergement, évolutions, SEO naturel et support : prestations web pour votre activité.',
  },
  '/FAQ': {
    title: 'FAQ | Oryzons',
    description:
      'Questions fréquentes sur les délais, la technique, les tarifs et le suivi de projet avec Oryzons.',
  },
  '/plan-du-site': {
    title: 'Plan du site | Oryzons',
    description:
      'Plan du site Oryzons : accueil, services, tarifs, contact, FAQ et informations légales.',
  },
  '/mentions-legales': {
    title: 'Mentions légales | Oryzons',
    description:
      'Mentions légales Oryzons : éditeur du site, SIRET, hébergement OVH, données personnelles et propriété intellectuelle.',
  },
  '/support': {
    title: 'Support | Oryzons',
    description: 'Support client Oryzons.',
    noindex: true,
  },
  '/cgu': {
    title: 'CGU | Oryzons',
    description:
      "Conditions générales d'utilisation du site oryzons.com : accès, propriété intellectuelle, données personnelles et responsabilité.",
  },
  '/cgv': {
    title: 'CGV | Oryzons',
    description:
      'Conditions générales de vente : création et refonte de sites, hébergement, maintenance, SEO et abonnements Oryzons.',
  },
}

function upsertMetaAttribute(attr: 'name' | 'property', key: string, content: string): void {
  const sel = `meta[${attr}="${CSS.escape(key)}"]`
  let el = document.querySelector(sel) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string): void {
  const sel = `link[rel="${CSS.escape(rel)}"]`
  let el = document.querySelector(sel) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Applique titre, description, Open Graph, Twitter et URL canonique pour la route courante.
 */
export function applyRouteMeta(pathname: string, cfg: RouteSeoConfig): void {
  const site = getSiteUrl()
  const canonicalFinal = pathname === '/' ? `${site}/` : `${site}${pathname}`

  const pageTitle = cfg.title.includes('Oryzons') ? cfg.title : `${cfg.title} | Oryzons`
  document.title = pageTitle

  upsertMetaAttribute('name', 'description', cfg.description)

  const robots = cfg.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  upsertMetaAttribute('name', 'robots', robots)

  upsertMetaAttribute('property', 'og:type', 'website')
  upsertMetaAttribute('property', 'og:site_name', 'Oryzons')
  upsertMetaAttribute('property', 'og:locale', 'fr_FR')
  upsertMetaAttribute('property', 'og:title', pageTitle)
  upsertMetaAttribute('property', 'og:description', cfg.description)
  upsertMetaAttribute('property', 'og:url', canonicalFinal)
  upsertMetaAttribute('property', 'og:image', `${site}${DEFAULT_OG_IMAGE_PATH}`)
  upsertMetaAttribute('property', 'og:image:alt', 'Oryzons — agence web')

  upsertMetaAttribute('name', 'twitter:card', 'summary_large_image')
  upsertMetaAttribute('name', 'twitter:title', pageTitle)
  upsertMetaAttribute('name', 'twitter:description', cfg.description)
  upsertMetaAttribute('name', 'twitter:image', `${site}${DEFAULT_OG_IMAGE_PATH}`)

  upsertLink('canonical', canonicalFinal)

  let hreflang = document.querySelector('link[rel="alternate"][hreflang="fr-FR"]') as HTMLLinkElement | null
  if (!hreflang) {
    hreflang = document.createElement('link')
    hreflang.rel = 'alternate'
    hreflang.setAttribute('hreflang', 'fr-FR')
    document.head.appendChild(hreflang)
  }
  hreflang.href = canonicalFinal
}
