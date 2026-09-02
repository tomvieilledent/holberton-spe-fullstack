import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

export default function MeriseEntities() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Le problème, et la méthode Merise</H2>
      <P>
        Concevoir une base de données directement en écrivant du SQL revient
        à construire une maison sans plan d'architecte : on se retrouve
        souvent avec des tables « fourre-tout », qui rendent les requêtes
        nécessaires pour croiser les informations d'une complexité
        cauchemardesque.
      </P>
      <P>
        La méthode <strong>Merise</strong>, bien qu'ancienne, reste le
        formalisme le plus solide pour la modélisation conceptuelle. Elle
        sépare radicalement la réflexion métier — le{" "}
        <strong>Modèle Conceptuel de Données</strong> (MCD) — de
        l'implémentation technique — le Modèle Physique de Données (MPD).
      </P>

      <H3>Entités et propriétés</H3>
      <P>
        Une <strong>entité</strong> est un objet de gestion du système
        d'information ayant une existence propre (ex. un{" "}
        <InlineCode>Client</InlineCode>, un <InlineCode>Produit</InlineCode>).
        Une <strong>propriété</strong> (ou attribut) est une donnée
        élémentaire qui qualifie cette entité.
      </P>
      <Note accent={MERISE_ACCENT}>
        Règle d'or : toute entité DOIT posséder un identifiant unique
        discriminant — c'est lui qui deviendra la future clé primaire.
      </Note>

      <H3>Outillage</H3>
      <P>
        <strong>Mocodo</strong> est un outil qui transforme une description
        textuelle simple d'un MCD en diagramme entité-association (SVG) et en
        schéma relationnel (SQL, LaTeX, Markdown...).
      </P>
      <Code>{`# Définir une entité
client: id_client, nom, email

# Définir une association
passe, 0N client, 1N commande`}</Code>
      <P>
        Le premier attribut listé après les deux-points est, par convention,
        l'identifiant de l'entité. Une association se définit par son nom,
        suivi de ses « pattes » — chacune un couple de cardinalités
        (<InlineCode>01</InlineCode>, <InlineCode>11</InlineCode>,{" "}
        <InlineCode>0N</InlineCode>, <InlineCode>1N</InlineCode>) suivi du nom
        d'une entité.
      </P>

      <SourceLink href="https://www.mocodo.net/">mocodo.net</SourceLink>
      {" · "}
      <SourceLink href="https://merise.developpez.com/cours/">
        merise.developpez.com — Cours Merise
      </SourceLink>
    </div>
  );
}
