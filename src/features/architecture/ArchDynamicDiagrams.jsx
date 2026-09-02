import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { ARCH_ACCENT } from "../../shared/ui/tokens.js";

export default function ArchDynamicDiagrams() {
  return (
    <div>
      <H2 accent={ARCH_ACCENT}>Diagrammes de séquence & d'états-transitions</H2>
      <P>
        Le code asynchrone et les systèmes distribués rendent les flux
        invisibles à la simple lecture du code : un service publie un
        événement dans un broker de messages, et rien dans son code
        n'indique qui va réagir, ni quand, ni dans quel ordre. Le
        comportement dynamique n'existe nulle part sous forme lisible.
      </P>

      <H3>Le diagramme de séquence — les échanges dans le temps</H3>
      <P>
        Un <strong>diagramme de séquence UML</strong> ordonne verticalement
        les messages échangés entre participants. Il distingue les appels{" "}
        <strong>synchrones</strong> (<InlineCode>{"->>"}</InlineCode>,
        l'appelant attend), les envois <strong>asynchrones</strong>{" "}
        (<InlineCode>-x</InlineCode>, « fire and forget ») et les{" "}
        <strong>retours</strong> (<InlineCode>{"-->>"}</InlineCode>). Les
        fragments combinés <InlineCode>alt</InlineCode> (alternative),{" "}
        <InlineCode>opt</InlineCode> (optionnel) et{" "}
        <InlineCode>loop</InlineCode> (répétition) portent la logique de
        contrôle.
      </P>
      <Code>{`sequenceDiagram
    participant C as Client
    participant API as API REST
    participant MQ as RabbitMQ
    participant W as Worker paiement
    participant B as Banque

    C->>API: POST /orders/42/pay
    API->>API: validation du payload
    API-x MQ: publish "payment.requested" (async)
    API-->>C: 202 Accepted

    MQ-x W: consume "payment.requested"
    loop 3 tentatives maximum
        W->>B: authorize(amount)
        alt autorisation acceptée
            B-->>W: 200 { authId }
            W-x MQ: publish "payment.succeeded"
        else fonds insuffisants
            B-->>W: 402 Payment Required
            W-x MQ: publish "payment.failed"
        end
    end
    opt notification activée
        MQ-x C: webhook "payment.succeeded"
    end`}</Code>

      <H3>Le diagramme d'états-transitions — le cycle de vie d'une entité</H3>
      <P>
        Une <strong>machine à états finis</strong> énumère les statuts
        légaux d'une entité et les seules transitions autorisées. Chaque
        transition peut porter une <strong>garde</strong> (condition entre
        crochets) qui doit être vraie pour que le passage soit permis. Un{" "}
        <strong>sous-état</strong> (état composite) détaille un traitement
        interne sans alourdir le diagramme principal.
      </P>
      <Code>{`stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> PENDING_PAYMENT : submit [panier non vide]
    PENDING_PAYMENT --> PAID : payment.succeeded
    PENDING_PAYMENT --> CANCELLED : timeout [délai > 30 min]
    PAID --> SHIPPED : dispatch [stock réservé]
    SHIPPED --> [*]
    CANCELLED --> [*]

    state PENDING_PAYMENT {
        [*] --> payment_transaction_process
        state payment_transaction_process {
            [*] --> authorizing
            authorizing --> captured : authId reçu
            authorizing --> declined : refus banque
            captured --> [*]
            declined --> [*]
        }
    }`}</Code>
      <Note accent={ARCH_ACCENT}>
        Règle : toute transition absente du diagramme est <em>interdite</em>.
        Une commande <InlineCode>SHIPPED</InlineCode> ne peut jamais
        repasser à <InlineCode>PENDING_PAYMENT</InlineCode> — la machine à
        états devient une spécification exécutable des règles métier.
      </Note>

      <SourceLink href="https://mermaid.js.org/syntax/sequenceDiagram.html">
        mermaid.js — Sequence Diagrams
      </SourceLink>
      {" · "}
      <SourceLink href="https://mermaid.js.org/syntax/stateDiagram.html">
        mermaid.js — State Diagrams
      </SourceLink>
      {" · "}
      <SourceLink href="https://martinfowler.com/dslCatalog/stateMachine.html">
        martinfowler.com — Pattern State Machine
      </SourceLink>
    </div>
  );
}
