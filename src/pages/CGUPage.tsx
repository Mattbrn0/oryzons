import { Link } from 'react-router-dom'
import LegalDocumentLayout, { LegalSection } from '../components/LegalDocumentLayout'
import { HOSTING_PROVIDER, LEGAL_ENTITY, formatHostingAddress, formatLegalAddress } from '../lib/legalEntity'

export default function CGUPage() {
  const e = LEGAL_ENTITY
  const h = HOSTING_PROVIDER

  return (
    <LegalDocumentLayout eyebrow="Oryzons" title="Conditions générales d’utilisation">
      <LegalSection title="1. Objet">
        <p>
          Les présentes conditions générales d’utilisation («&nbsp;CGU&nbsp;») encadrent l’accès et l’utilisation du site internet{' '}
          <strong>oryzons.com</strong> (ci-après le «&nbsp;Site&nbsp;»), édité par <strong>{e.name}</strong>, micro-entreprise exerçant notamment des{' '}
          {e.activity}. Le siège social est situé à {formatLegalAddress()}.
        </p>
        <p>
          La navigation sur le Site implique l’acceptation sans réserve des présentes CGU. Si vous n’acceptez pas ces conditions, veuillez ne pas
          utiliser le Site.
        </p>
      </LegalSection>

      <LegalSection title="2. Éditeur du Site — contact — hébergement">
        <p>
          <strong>{e.name}</strong>
          <br />
          {e.legalForm}
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
        <p>
          <strong>Hébergement.</strong> Le Site est hébergé par <strong>{h.name}</strong>, {h.rcsLine}, siège social&nbsp;: {formatHostingAddress()}.
        </p>
        <p>
          Les <Link className="text-ink underline underline-offset-2" to="/mentions-legales">mentions légales</Link> reprennent ces éléments de façon
          synthétique.
        </p>
      </LegalSection>

      <LegalSection title="3. Accès au Site">
        <p>
          Le Site est accessible en principe 24h/24 et 7j/7, sauf interruption pour maintenance, cas de force majeure ou dysfonctionnement hors du
          contrôle de {e.name}. {e.name} ne garantit pas une disponibilité absolue ni l’absence d’erreurs techniques.
        </p>
        <p>
          L’utilisateur du Site dispose des moyens techniques et de connexion nécessaires à son usage. Les frais afférents à cet accès (fournisseur
          d’accès, matériel…) restent à sa charge.
        </p>
      </LegalSection>

      <LegalSection title="4. Contenus et propriété intellectuelle">
        <p>
          L’ensemble des éléments composant le Site (structure, textes, images, graphismes, logos, icônes, vidéos, logiciels, bases de données, etc.)
          sont la propriété exclusive de {e.name} ou de ses partenaires et sont protégés par les législations relatives à la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, adaptation, diffusion ou exploitation, totale ou partielle, du Site ou de l’un de ses
          éléments, par quelque procédé que ce soit, sans autorisation écrite préalable de {e.name}, est interdite et constituerait une contrefaçon
          sanctionnée par le Code de la propriété intellectuelle.
        </p>
        <p>
          Les marques et logos reproduits sur le Site sont déposés et protégés. Toute reproduction non autorisée est interdite.
        </p>
      </LegalSection>

      <LegalSection title="5. Comportement de l’utilisateur">
        <p>L’utilisateur s’engage à&nbsp;:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>utiliser le Site de manière loyale, conformément aux lois et règlements applicables&nbsp;;</li>
          <li>ne pas tenter d’accéder de manière non autorisée aux systèmes, données ou comptes&nbsp;;</li>
          <li>ne pas diffuser de virus, logiciels malveillants ou tout code nuisible&nbsp;;</li>
          <li>ne pas porter atteinte à la sécurité ou au bon fonctionnement du Site.</li>
        </ul>
        <p>
          {e.name} se réserve le droit de restreindre ou mettre fin à tout accès en cas de manquement manifeste aux présentes CGU.
        </p>
      </LegalSection>

      <LegalSection title="6. Formulaires et communications">
        <p>
          Le Site propose un formulaire de contact et de demande de devis. Les informations transmises doivent être exactes et ne pas porter atteinte
          aux droits de tiers. Vous vous engagez à ne pas utiliser ce formulaire à des fins illicites, frauduleuses ou de prospection massives non
          sollicitée.
        </p>
        <p>
          Le traitement des données personnelles liées à ce formulaire est décrit à la section «&nbsp;Données personnelles&nbsp;» ci-dessous.
        </p>
      </LegalSection>

      <LegalSection title="7. Liens hypertextes">
        <p>
          Le Site peut contenir des liens vers des sites tiers. {e.name} n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant
          à leur contenu, leurs publicités, produits ou services disponibles sur ou à partir de ces sites.
        </p>
      </LegalSection>

      <LegalSection title="8. Données personnelles">
        <p>
          Les données collectées via le formulaire (identité, coordonnées, société le cas échéant, nature du projet, message) sont traitées par{' '}
          {e.name} <strong>uniquement pour répondre à votre demande, vous recontacter et assurer le suivi commercial ou contractuel</strong> lié à cette
          demande. Elles ne sont pas utilisées à d’autres fins (prospection générale, revente, profilage publicitaire, etc.).
        </p>
        <p>
          La transmission du formulaire repose notamment sur l’exécution de mesures précontractuelles ou contractuelles et, le cas échéant, sur votre
          consentement pour les éléments optionnels clairement identifiés comme tels.
        </p>
        <p>
          Les données sont conservées pendant la durée nécessaire au traitement de la demande et, au-delà, pour une durée maximale compatible avec les
          obligations légales et la prescription en vigueur (gestion commerciale), puis effacées ou archivées selon les règles applicables.
        </p>
        <p>
          Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi «&nbsp;Informatique et Libertés&nbsp;», vous disposez d’un droit d’accès, de
          rectification, d’effacement, de limitation, d’opposition et de portabilité dans les conditions prévues par la loi. Vous pouvez exercer ces
          droits en écrivant à{' '}
          <a className="text-ink underline underline-offset-2" href={`mailto:${e.email}`}>
            {e.email}
          </a>
          . Vous disposez également du droit d’introduire une réclamation auprès de la CNIL (https://www.cnil.fr).
        </p>
      </LegalSection>

      <LegalSection title="9. Cookies et traceurs">
        <p>
          Le Site peut utiliser uniquement des traceurs <strong>strictement nécessaires</strong> au fonctionnement du Site (par exemple maintien de
          session technique ou sécurité). Il n’est pas fait usage, à ce jour, de cookies de mesure d’audience ou publicitaires ; en cas d’évolution, une
          information et, si la loi l’exige, un dispositif de consentement seront mis à jour sur le Site.
        </p>
      </LegalSection>

      <LegalSection title="10. Responsabilité">
        <p>
          Les informations publiées sur le Site le sont à titre indicatif et peuvent être modifiées à tout moment. {e.name} s’efforce d’en assurer
          l’exactitude, sans garantie expresse ou tacite d’exhaustivité ou d’actualité permanente.
        </p>
        <p>
          Dans les limites permises par la loi, {e.name} ne saurait être tenue responsable des dommages directs ou indirects résultant de
          l’utilisation ou de l’impossibilité d’utiliser le Site, d’une interruption du service ou d’un contenu tiers.
        </p>
      </LegalSection>

      <LegalSection title="11. Modification des CGU">
        <p>
          {e.name} peut à tout moment modifier les présentes CGU. La version applicable est celle publiée sur le Site à la date de la visite. En cas de
          modification substantielle, une information pourra être affichée sur le Site lorsque cela est pertinent.
        </p>
      </LegalSection>

      <LegalSection title="12. Droit applicable et litiges">
        <p>
          Les présentes CGU sont régies par le droit français. En l’absence de résolution amiable, les litiges relatifs à l’utilisation du Site
          relèvent de la compétence des tribunaux français, sous réserve des règles de matière de consommation ou de compétence spécifique lorsqu’elles
          s’imposent.
        </p>
      </LegalSection>
    </LegalDocumentLayout>
  )
}
