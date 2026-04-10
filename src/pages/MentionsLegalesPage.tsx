import LegalDocumentLayout, { LegalSection } from '../components/LegalDocumentLayout'
import { HOSTING_PROVIDER, LEGAL_ENTITY, formatHostingAddress, formatLegalAddress } from '../lib/legalEntity'

export default function MentionsLegalesPage() {
  const e = LEGAL_ENTITY
  const h = HOSTING_PROVIDER

  return (
    <LegalDocumentLayout eyebrow="Oryzons" title="Mentions légales">
      <LegalSection title="Éditeur du site">
        <p>
          Le site <strong>oryzons.com</strong> est édité par&nbsp;:
        </p>
        <p>
          <strong>{e.name}</strong>
          <br />
          Forme juridique&nbsp;: {e.legalForm}
          <br />
          Siège social&nbsp;: {formatLegalAddress()}
          <br />
          Représentant légal&nbsp;: {e.legalRepresentative}
          <br />
          Directeur de la publication&nbsp;: {e.publicationDirector}
          <br />
          SIREN&nbsp;: {e.sirenDisplay} — SIRET&nbsp;: {e.siretDisplay}
          <br />
          {e.rcsGreffe}
          <br />
          <span className="block pt-1">{e.vatFranchiseMention}</span>
          <br />
          Activité&nbsp;: {e.activity}
          <br />
          E-mail&nbsp;:{' '}
          <a className="text-ink underline underline-offset-2" href={`mailto:${e.email}`}>
            {e.email}
          </a>
          <br />
          Téléphone&nbsp;:{' '}
          <a className="text-ink underline underline-offset-2" href="tel:+33643121415">
            {e.phoneDisplay}
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le site est hébergé par <strong>{h.name}</strong>, {h.rcsLine}, dont le siège social est situé {formatHostingAddress()}.
          <br />
          Site web&nbsp;:{' '}
          <a className="text-ink underline underline-offset-2" href={h.website} rel="noopener noreferrer" target="_blank">
            {h.website}
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L’ensemble du contenu de ce site (textes, visuels, structure, code) est la propriété de {e.name} ou de ses partenaires, sauf mentions
          contraires. Toute reproduction non autorisée est interdite (voir également les{' '}
          <a className="text-ink underline underline-offset-2" href="/cgu">
            CGU
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Les traitements mis en œuvre via le site (notamment le formulaire de contact) sont décrits aux sections «&nbsp;Formulaires&nbsp;» et
          «&nbsp;Données personnelles&nbsp;» des{' '}
          <a className="text-ink underline underline-offset-2" href="/cgu">
            conditions générales d’utilisation
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocumentLayout>
  )
}
