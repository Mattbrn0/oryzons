/**
 * Coordonnées affichées dans les documents légaux.
 * Complétez `addressLine` et `registrationLine` lorsque votre situation juridique est figée (RCS, SIREN, etc.).
 */
export const LEGAL_ENTITY = {
  name: 'Oryzons',
  activity: 'prestations de création de sites internet, d’hébergement, de maintenance et de visibilité en ligne (SEO)',
  city: 'Lyon',
  country: 'France',
  /** Siège ou adresse de correspondance — à compléter pour les mentions légales complètes. */
  addressLine: 'France',
  email: 'contact@oryzons.com',
  phoneDisplay: '+33 6 43 12 14 15',
} as const

export const LEGAL_LAST_UPDATED = '10 avril 2026'
