import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { UML_ACCENT } from "../../shared/ui/tokens.js";

export default function UmlClassDiagram() {
  return (
    <div>
      <H2 accent={UML_ACCENT}>Diagramme de classes & UML avancé</H2>
      <P>
        Sans formalisme partagé, plusieurs développeurs qui travaillent sur
        le même domaine métier produisent du code spaghetti fortement
        couplé : chacun ajoute ses champs et ses méthodes là où c'est
        pratique sur le moment. Le <strong>diagramme de classes UML</strong>{" "}
        fixe une vue commune des structures et de leurs relations.
      </P>

      <H3>Visibilité</H3>
      <Table
        head={["Symbole", "Portée"]}
        rows={[
          ["+", "public — accessible depuis n'importe où"],
          ["-", "private — accessible uniquement dans la classe"],
          ["#", "protected — accessible dans la classe et ses sous-classes"],
          ["~", "package — accessible dans le même paquet"],
        ]}
      />

      <H3>Héritage vs composition vs agrégation</H3>
      <Table
        head={["Relation", "Sémantique", "Notation"]}
        rows={[
          ["Héritage", "« Est un » — spécialisation", "--|>"],
          ["Composition", "« A un » à mort partagée (le tout détruit ses parties)", "*--"],
          ["Agrégation", "« A un » à cycles de vie indépendants", "o--"],
        ]}
      />
      <Code>{`classDiagram
    class User {
        +UUID id
        -string passwordHash
        #string email
        +placeOrder(cart) Order
    }
    class Order {
        +UUID id
        -OrderLine[] lines
        +total() Money
    }
    class OrderLine {
        +UUID productId
        +int quantity
        +Money unitPrice
    }

    User o-- Order : passe
    Order *-- OrderLine : contient`}</Code>
      <P>
        Une <InlineCode>OrderLine</InlineCode> n'a aucun sens hors de sa{" "}
        <InlineCode>Order</InlineCode> : si la commande disparaît, ses
        lignes aussi — c'est une <strong>composition</strong>{" "}
        (<InlineCode>*--</InlineCode>). À l'inverse, une{" "}
        <InlineCode>Order</InlineCode> continue d'exister même si le compte{" "}
        <InlineCode>User</InlineCode> est supprimé (historique) : c'est une{" "}
        <strong>agrégation</strong> (<InlineCode>o--</InlineCode>).
      </P>
      <Note accent={UML_ACCENT}>
        Principe directeur : <em>« composition over inheritance »</em>.
        L'héritage fige une hiérarchie dès la compilation et fait fuiter les
        détails de la classe parente ; composer de petits objets
        collaborants reste plus souple à faire évoluer.
      </Note>

      <SourceLink href="https://mermaid.js.org/syntax/classDiagram.html">
        mermaid.js — Class Diagrams
      </SourceLink>
      {" · "}
      <SourceLink href="https://martinfowler.com/books/uml.html">
        martinfowler.com — UML Distilled (chapitre 3)
      </SourceLink>
      {" · "}
      <SourceLink href="https://en.wikipedia.org/wiki/Composition_over_inheritance">
        wikipedia.org — Composition over Inheritance
      </SourceLink>
    </div>
  );
}
