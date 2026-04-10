import LegalDocumentLayout, { LegalSection } from '../components/LegalDocumentLayout'
import { LEGAL_ENTITY } from '../lib/legalEntity'

export default function CGUPage() {
  const { name, activity, city, country, email, phoneDisplay, addressLine } = LEGAL_ENTITY

  return (
    <LegalDocumentLayout eyebrow="Oryzons" title="Conditions générales d’utilisation">
      <LegalSection title="1. Objet">
        <p>
          Les présentes conditions générales d’utilisation («&nbsp;CGU&nbsp;») encadrent l’accès et l’utilisation du site internet{' '}
          <strong>{name}</strong> (ci-après le «&nbsp;Site&nbsp;»), édité par <strong>{name}</strong>, agence web proposant notamment des{' '}
          {activity}, avec une présence à <strong>{city}</strong> ({country}).
        </p>
        <p>
          La navigation sur le Site implique l’acceptation sans réserve des présentes CGU. Si vous n’acceptez pas ces conditions, veuillez ne pas
          utiliser le Site.
        </p>
      </LegalSection>

      <LegalSection title="2. Éditeur du Site — contact">
        <p>
          <strong>{name}</strong>
          <br />
          Activité&nbsp;: {activity}
          <br />
          Adresse de correspondance&nbsp;: {addressLine}
          <br />
          E-mail&nbsp;:{' '}
          <a className="text-ink underline underline-offset-2" href={`mailto:${email}`}>
            {email}
          </a>
          <br />
          Téléphone&nbsp;:{' '}
          <a className="text-ink underline underline-offset-2" href="tel:+33643121415">
            {phoneDisplay}
          </a>
        </p>
        <p>
          Les informations d’immatriculation (RCS, SIREN, TVA intracommunautaire, directeur de la publication) seront complétées sur cette page ou
          sur une page «&nbsp;Mentions légales&nbsp;» dédiée lorsqu’elles seront publiées de manière pérenne sur le Site.
        </p>
      </LegalSection>

      <LegalSection title="3. Accès au Site">
        <p>
          Le Site est accessible en principe 24h/24 et 7j/7, sauf interruption pour maintenance, cas de force majeure ou dysfonctionnement hors du
          contrôle de {name}. {name} ne garantit pas une disponibilité absolue ni l’absence d’erreurs techniques.
        </p>
        <p>
          L’utilisateur du Site dispose des moyens techniques et de connexion nécessaires à son usage. Les frais afférents à cet accès (fournisseur
          d’accès, matériel…) restent à sa charge.
        </p>
      </LegalSection>

      <LegalSection title="4. Contenus et propriété intellectuelle">
        <p>
          L’ensemble des éléments composant le Site (structure, textes, images, graphismes, logos, icônes, vidéos, logiciels, bases de données, etc.)
          sont la propriété exclusive de {name} ou de ses partenaires et sont protégés par les législations relatives à la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, adaptation, diffusion ou exploitation, totale ou partielle, du Site ou de l’un de ses
          éléments, par quelque procédé que ce soit, sans autorisation écrite préalable de {name}, est interdite et constituerait une contrefaçon
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
          {name} se réserve le droit de restreindre ou mettre fin à tout accès en cas de manquement manifeste aux présentes CGU.
        </p>
      </LegalSection>

      <LegalSection title="6. Formulaires et communications">
        <p>
          Le Site peut proposer des formulaires de contact ou de demande de devis. Les informations transmises doivent être exactes et ne pas porter
          atteinte aux droits de tiers. Vous vous engagez à ne pas utiliser ces formulaires à des fins illicites, frauduleuses ou de prospection
          massives non sollicitée.
        </p>
        <p>
          Le traitement des données personnelles est décrit dans la section «&nbsp;Données personnelles&nbsp;» ci-dessous ainsi que, le cas échéant,
          dans une politique de confidentialité dédiée.
        </p>
      </LegalSection>

      <LegalSection title="7. Liens hypertextes">
        <p>
          Le Site peut contenir des liens vers des sites tiers. {name} n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant
          à leur contenu, leurs publicités, produits ou services disponibles sur ou à partir de ces sites.
        </p>
      </LegalSection>

      <LegalSection title="8. Données personnelles">
        <p>
          Dans le cadre de la navigation et des demandes effectuées via le Site, {name} est susceptible de collecter et traiter des données à
          caractère personnel (identité, coordonnées, contenu du message, données de connexion et d’audience techniques), pour les finalités
          suivantes&nbsp;: répondre aux demandes, établir des devis, assurer le suivi commercial et contractuel, améliorer le Site, et respecter ses
          obligations légales.
        </p>
        <p>
          Le traitement est fondé notamment sur l’exécution de mesures précontractuelles et contractuelles, l’intérêt légitime de {name} à gérer son
          activité, et votre consentement lorsque la réglementation l’exige.
        </p>
        <p>
          Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi «&nbsp;Informatique et Libertés&nbsp;», vous disposez d’un droit d’accès, de
          rectification, d’effacement, de limitation, d’opposition et de portabilité dans les conditions prévues par la loi. Vous pouvez exercer ces
          droits en écrivant à{' '}
          <a className="text-ink underline underline-offset-2" href={`mailto:${email}`}>
            {email}
          </a>
          . Vous disposez également du droit d’introduire une réclamation auprès de la CNIL (www.cnil.fr).
        </p>
      </LegalSection>

      <LegalSection title="9. Cookies et traceurs">
        <p>
          Le Site peut utiliser des cookies ou traceurs nécessaires au fonctionnement et à la mesure d’audience, dans le respect de la réglementation
          applicable. Le cas échéant, les modalités de consentement ou de refus seront précisées dans une politique cookies ou une bannière dédiée.
        </p>
      </LegalSection>

      <LegalSection title="10. Responsabilité">
        <p>
          Les informations publiées sur le Site le sont à titre indicatif et peuvent être modifiées à tout moment. {name} s’efforce d’en assurer
          l’exactitude, sans garantie expresse ou tacite d’exhaustivité ou d’actualité permanente.
        </p>
        <p>
          Dans les limites permises par la loi, {name} ne saurait être tenue responsable des dommages directs ou indirects résultant de
          l’utilisation ou de l’impossibilité d’utiliser le Site, d’une interruption du service ou d’un contenu tiers.
        </p>
      </LegalSection>

      <LegalSection title="11. Modification des CGU">
        <p>
          {name} peut à tout moment modifier les présentes CGU. La version applicable est celle publiée sur le Site à la date de la visite. En cas de
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
