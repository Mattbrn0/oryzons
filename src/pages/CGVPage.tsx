import LegalDocumentLayout, { LegalSection } from '../components/LegalDocumentLayout'
import { LEGAL_ENTITY } from '../lib/legalEntity'

export default function CGVPage() {
  const { name, city, country, email, phoneDisplay, addressLine } = LEGAL_ENTITY

  return (
    <LegalDocumentLayout eyebrow="Oryzons" title="Conditions générales de vente">
      <LegalSection title="1. Objet et champ d’application">
        <p>
          Les présentes conditions générales de vente («&nbsp;CGV&nbsp;») régissent les relations contractuelles entre <strong>{name}</strong>
          , agence web basée à <strong>{city}</strong> ({country}), et ses clients, pour les prestations suivantes ou assimilées&nbsp;: création ou
          refonte de sites internet (vitrine, landing page, e-commerce lorsque proposé), hébergement et mise en ligne, maintenance et évolutions,
          accompagnement et support, optimisations SEO et visibilité en ligne, dans les conditions définies au devis ou au bon de commande accepté.
        </p>
        <p>
          Elles s’appliquent à toute commande passée auprès de {name}, sous réserve de clauses particulières figurant au devis ou au contrat signé
          entre les parties, qui prévalent en cas de contradiction avec les présentes CGV.
        </p>
        <p>
          Les tarifs ou forfaits présentés sur le Site (notamment forfaits de création, abonnements mensuels ou annuels d’hébergement et de support)
          sont donnés à titre <strong>indicatif</strong> et peuvent varier selon la complexité du projet ; le prix définitif figure au devis.
        </p>
      </LegalSection>

      <LegalSection title="2. Identification">
        <p>
          <strong>{name}</strong>
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
      </LegalSection>

      <LegalSection title="3. Commande et formation du contrat">
        <p>
          Toute commande fait suite à un échange sur le besoin du client et, le cas échéant, à l’émission d’un devis détaillé par {name}. Le contrat
          est formé lorsque le client accepte le devis par écrit (y compris par e-mail) ou signe le document prévu à cet effet, et après versement
          de l’acompte prévu, le cas échéant.
        </p>
        <p>
          {name} se réserve le droit de refuser toute commande en cas de motif légitime (insolvabilité suspectée, contenu illicite demandé,
          incompatibilité avec l’activité de {name}, etc.).
        </p>
      </LegalSection>

      <LegalSection title="4. Description des prestations">
        <p>Les prestations livrées par {name} peuvent notamment inclure&nbsp;:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Création ou refonte de site</strong> (structure, design, intégration, mise en forme responsive, formulaires, contenus fournis par
            le client ou rédigés sous sa responsabilité, sauf rédactionnel expressément commandé) ;
          </li>
          <li>
            <strong>Hébergement et exploitation</strong> (mise en place ou pilotage d’un hébergeur, nom de domaine, certificats SSL, sauvegardes
            selon l’offre retenue) ;
          </li>
          <li>
            <strong>Maintenance et évolutions</strong> (corrections, petites évolutions, mises à jour dans les limites du forfait ou des crédits
            convenus) ;
          </li>
          <li>
            <strong>SEO et visibilité</strong> (optimisations techniques de base, recommandations, structuration ; sans garantie de position ou de
            trafic sur les moteurs de recherche) ;
          </li>
          <li>
            <strong>Support et accompagnement</strong> (échanges par e-mail et, selon offre, d’autres canaux ou niveaux de priorité).
          </li>
        </ul>
        <p>
          Le périmètre exact, les livrables, le planning et les niveaux de service sont précisés au devis ou en annexe contractuelle.
        </p>
      </LegalSection>

      <LegalSection title="5. Prix et modalités de paiement">
        <p>
          Les prix sont indiqués en euros, hors taxes (HT) ou toutes taxes comprises (TTC) selon la mention figurant au devis, compte tenu du régime
          fiscal applicable à {name}.
        </p>
        <p>
          Sauf disposition contraire, un acompte peut être exigé à la commande (en pourcentage du montant total ou montant fixe) ; le solde est dû
          selon l’échéancier prévu (notamment à la livraison ou à la mise en production, et en cas d’abonnement à la périodicité convenue).
        </p>
        <p>
          En cas de retard de paiement, des pénalités de retard au taux légal en vigueur, ainsi que une indemnité forfaitaire pour frais de recouvrement
          (montant fixé par la réglementation en vigueur), pourront être appliqués après mise en demeure restée infructueuse. {name} pourra suspendre
          les prestations en cours en cas de non-paiement grave ou répété.
        </p>
      </LegalSection>

      <LegalSection title="6. Obligations du client">
        <p>Le client s’engage à&nbsp;:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>fournir en temps utile les éléments nécessaires (textes, images, accès techniques, logos, chartes) et leur conformité légale ;</li>
          <li>valider les étapes (maquettes, prototypes, mises en préproduction) dans les délais indiqués ;</li>
          <li>informer {name} de toute contrainte (légales, techniques, délais de lancement) ;</li>
          <li>assurer de son côté la licéité des contenus publiés et le respect des droits des tiers (droits d’auteur, image, marques).</li>
        </ul>
        <p>
          Tout retard ou manquement du client impactant le calendrier pourra entraîner un report des délais sans responsabilité de {name}, et, le cas
          échéant, une facturation des surcoûts liés.
        </p>
      </LegalSection>

      <LegalSection title="7. Exécution, livraison et réception">
        <p>
          Les délais sont indicatifs sauf mention «&nbsp;délai ferme&nbsp;» expressément acceptée. La livraison consiste, selon la nature du projet,
          dans la mise à disposition des livrables numériques, la mise en ligne effective sur l’environnement convenu, ou la transmission d’accès et
          de documentations.
        </p>
        <p>
          Sauf réserve formulée dans un délai de <strong>cinq jours ouvrés</strong> après notification de livraison, la réception sera réputée acquise.
          Les réserves doivent être motivées et adressées à {name} à l’adresse {email}.
        </p>
      </LegalSection>

      <LegalSection title="8. Abonnements (hébergement, maintenance, support)">
        <p>
          Lorsque le contrat inclut une formule récurrente (facturation mensuelle ou annuelle), la durée initiale et les modalités de tacite
          reconduction ou de résiliation sont précisées au devis.
        </p>
        <p>
          Sauf clause contraire, tout abonnement est conclu pour une durée minimale indiquée au contrat ; la résiliation par le client prend effet à
          la fin de la période de facturation en cours sous réserve du respect d’un préavis éventuellement prévu. La résiliation par {name} en cas de
          non-paiement ou manquement grave reste réservée aux cas prévus aux présentes CGV ou au contrat.
        </p>
        <p>
          Les prestations d’hébergement peuvent faire intervenir des sous-traitants techniques (hébergeur cloud ou mutualisé). {name} reste
          l’interlocuteur principal du client dans le cadre du contrat, sauf passation d’un contrat direct avec un tiers expressément convenu.
        </p>
      </LegalSection>

      <LegalSection title="9. Propriété intellectuelle et réserve de propriété">
        <p>
          Tant que l’intégralité des sommes dues n’a pas été réglée, {name} peut conserver une réserve de propriété sur les livrables au sens des
          usages du secteur (fichiers sources, maquettes, code), sans préjudice de la propriété des contenus fournis par le client.
        </p>
        <p>
          Après paiement intégral des prestations prévues au périmètre du projet, {name} concède au client les droits nécessaires à l’exploitation du
          site dans son contexte d’usage prévu (site public, exploitation commerciale du client), sous réserve des composants tiers soumis à leurs
          propres licences (polices, CMS, bibliothèques open source, etc.).
        </p>
        <p>
          {name} conserve le droit de mentionner sa réalisation à titre de référence commerciale, sauf clause de confidentialité ou de non-divulgation
          acceptée par écrit.
        </p>
      </LegalSection>

      <LegalSection title="10. Garanties et responsabilité">
        <p>
          {name} est tenue d’une obligation de moyens. Elle garantit contre les défauts de conformité des prestations au regard du devis accepté, sous
          réserve des limites techniques et des environnements tiers (hébergeur, navigateurs, services externes intégrés).
        </p>
        <p>
          Le SEO est soumis aux algorithmes des moteurs et à la concurrence : <strong>aucun résultat de positionnement, d’audience ou de conversion
          n’est garanti</strong>.
        </p>
        <p>
          Sauf faute lourde ou dol, la responsabilité de {name} est limitée au montant HT payé par le client pour la prestation directement concernée au
          cours des douze (12) derniers mois. {name} ne pourra être tenue des dommages indirects ou pertes d’exploitation.
        </p>
      </LegalSection>

      <LegalSection title="11. Données personnelles et confidentialité">
        <p>
          Chaque partie traite les données nécessaires à l’exécution du contrat conformément au RGPD et à la loi «&nbsp;Informatique et Libertés&nbsp;».
          Pour les traitements réalisés pour le compte du client (hébergement de données visiteurs, formulaires), les rôles et responsabilités
          (responsable de traitement / sous-traitant) peuvent être précisés en annexe ou dans une convention de sous-traitance lorsque la loi
          l’exige.
        </p>
      </LegalSection>

      <LegalSection title="12. Force majeure">
        <p>
          Aucune des parties ne sera responsable d’un retard ou d’une inexécution due à un événement de force majeure au sens du Code civil, dès lors
          que l’événement échappe à son contrôle raisonnable et qu’elle en a notifié l’autre partie dans les meilleurs délais.
        </p>
      </LegalSection>

      <LegalSection title="13. Résiliation pour manquement">
        <p>
          En cas de manquement grave ou répété de l’une des parties à ses obligations, non réparé dans un délai de quinze (15) jours après envoi d’une
          lettre recommandée avec accusé de réception ou équivalent (y compris e-mail avec accusé de lecture lorsque les parties en conviennent),
          l’autre partie pourra résilier le contrat de plein droit, sans préjudice des dommages et intérêts éventuels.
        </p>
      </LegalSection>

      <LegalSection title="14. Réclamations — médiation — litiges">
        <p>
          Toute réclamation doit être adressée à {name} à l’adresse {email}, avec le détail du grief et les pièces utiles. Les parties chercheront une
          solution amiable avant toute action judiciaire.
        </p>
        <p>
          <strong>Clients consommateurs</strong> (au sens du Code de la consommation) disposent de droits supplémentaires ; le cas échéant,
          informations sur la médiation de la consommation et les plateformes européennes de RLL seront indiquées sur le Site ou communiquées sur
          demande, conformément à la réglementation.
        </p>
        <p>
          À défaut de résolution amiable, tout litige relève de la compétence des tribunaux français. Pour les professionnels, compétence attribuée aux
          tribunaux du ressort du siège de {name}, sauf disposition impérative contraire.
        </p>
      </LegalSection>

      <LegalSection title="15. Droit applicable">
        <p>Les présentes CGV sont régies par le droit français.</p>
      </LegalSection>
    </LegalDocumentLayout>
  )
}
