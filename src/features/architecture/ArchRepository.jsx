import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { ARCH_ACCENT } from "../../shared/ui/tokens.js";

export default function ArchRepository() {
  return (
    <div>
      <H2 accent={ARCH_ACCENT}>Patterns architecturaux — Repository & inversion des dépendances</H2>
      <P>
        Le code métier historique est souvent directement couplé à
        l'infrastructure technique : une classe métier qui instancie
        elle-même sa connexion MySQL, écrit ses requêtes SQL et gère son
        pool de connexions. Résultat : le domaine est impossible à tester
        sans base de données, changer de SGBD impose de réécrire la logique
        métier, et la classe viole le principe de responsabilité unique en
        mélangeant règles de gestion et détails de persistance.
      </P>

      <H3>La solution : dépendre d'abstractions, pas d'implémentations</H3>
      <P>
        L'<strong>inversion des dépendances</strong> (le « D » de SOLID)
        énonce que les modules de haut niveau ne doivent pas dépendre des
        modules de bas niveau : les deux dépendent d'abstractions. Le{" "}
        <strong>pattern Repository</strong> applique ce principe à la
        persistance : la classe métier dépend d'une interface abstraite
        (ex. <InlineCode>IOrderRepository</InlineCode>), et c'est
        l'infrastructure qui implémente cette interface — jamais l'inverse.
        Le domaine métier, lui, ne dépend de rien.
      </P>
      <Code>{`// DomainLayer — ne dépend que de lui-même
interface IOrderRepository {
  findById(id: string): Order | null;
  save(order: Order): void;
}

class OrderService {
  constructor(private readonly orders: IOrderRepository) {}

  confirm(id: string): void {
    const order = this.orders.findById(id);
    if (!order) throw new Error("Commande introuvable");
    order.confirm();            // règle métier pure
    this.orders.save(order);
  }
}`}</Code>
      <Code>{`// InfrastructureLayer — dépend du domaine ET de la techno
class PostgresOrderRepository implements IOrderRepository {
  constructor(private readonly db: PgClient) {}

  findById(id: string): Order | null {
    const row = this.db.query("SELECT * FROM orders WHERE id = $1", [id]);
    return row ? OrderMapper.toDomain(row) : null;
  }

  save(order: Order): void {
    this.db.query("INSERT INTO orders ... ON CONFLICT ... DO UPDATE ...");
  }
}`}</Code>
      <P>
        Le sens de la flèche de dépendance est <em>inversé</em> par rapport
        à un design naïf : la couche technique pointe vers le domaine, et le
        domaine ne connaît que son interface.
      </P>
      <Code>{`classDiagram
    namespace DomainLayer {
        class OrderService
        class IOrderRepository {
            <<interface>>
            +findById(id) Order
            +save(order) void
        }
    }
    namespace InfrastructureLayer {
        class PostgresOrderRepository {
            +findById(id) Order
            +save(order) void
        }
    }
    OrderService --> IOrderRepository : dépend de
    PostgresOrderRepository ..|> IOrderRepository : implémente`}</Code>
      <Note accent={ARCH_ACCENT}>
        Test unitaire immédiat : on injecte un{" "}
        <InlineCode>InMemoryOrderRepository</InlineCode> (un simple tableau)
        dans <InlineCode>OrderService</InlineCode>, et toute la logique
        métier se teste sans base de données, en millisecondes.
      </Note>

      <SourceLink href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
        blog.cleancoder.com — The Clean Architecture
      </SourceLink>
      {" · "}
      <SourceLink href="https://martinfowler.com/articles/dipInTheWild.html">
        martinfowler.com — Dependency Injection / IoC
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.domainlanguage.com/ddd/reference/">
        domainlanguage.com — DDD Reference (Eric Evans)
      </SourceLink>
    </div>
  );
}
