/**
 * Coordonnées juridiques — utilisées dans CGU, CGV et mentions légales.
 */

export const LEGAL_ENTITY = {
  /** Nom commercial */
  name: 'Oryzons',
  legalForm:
    'Micro-entreprise — entrepreneur individuel (régime de la micro-entreprise), sans capital social distinct de la personne physique',
  legalRepresentative: 'Mathis Bricman',
  publicationDirector: 'Mathis Bricman',
  addressLine1: '4 place Pierre Semard',
  postalCode: '38300',
  city: 'Bourgoin-Jallieu',
  country: 'France',
  siretDisplay: '102 905 676 00015',
  sirenDisplay: '102 905 676',
  rcsGreffe: 'Greffe du tribunal de commerce de Vienne',
  activity:
    'prestations de création de sites internet, d’hébergement, de maintenance et de visibilité en ligne (SEO)',
  email: 'contact@oryzons.com',
  phoneDisplay: '+33 6 43 12 14 15',
  /** Régime de franchise en base de TVA — prix annoncés et facturés en TTC sans TVA. */
  vatFranchiseMention: 'TVA non applicable, article 293 B du Code général des impôts (franchise en base).',
} as const

/** Hébergeur du site (obligatoire en mentions légales — LCEN). Données issues des informations publiques OVHcloud. */
export const HOSTING_PROVIDER = {
  name: 'OVH SAS',
  rcsLine: 'RCS Lille Métropole n° 424 761 419 00045',
  addressLine: '2 rue Kellermann',
  postalCode: '59100',
  city: 'Roubaix',
  country: 'France',
  website: 'https://www.ovhcloud.com/',
} as const

export function formatLegalAddress(): string {
  const e = LEGAL_ENTITY
  return `${e.addressLine1}, ${e.postalCode} ${e.city}, ${e.country}`
}

export function formatHostingAddress(): string {
  const h = HOSTING_PROVIDER
  return `${h.addressLine}, ${h.postalCode} ${h.city}, ${h.country}`
}

export const LEGAL_LAST_UPDATED = '10 avril 2026'
