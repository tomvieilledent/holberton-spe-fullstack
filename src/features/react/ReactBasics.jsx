import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

export default function ReactBasics() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>React — les bases</H2>
      <P>
        Une application React est construite à partir de <strong>composants</strong> :
        des fonctions JavaScript qui retournent du balisage (JSX). Un composant peut être
        aussi petit qu'un bouton, ou aussi grand qu'une page entière.
      </P>
      <Code>{`function MyButton() {
  return <button>Je suis un bouton</button>;
}

export default function MyApp() {
  return (
    <div>
      <h1>Bienvenue</h1>
      <MyButton />
    </div>
  );
}`}</Code>
      <Note accent={REACT_ACCENT}>
        Un composant React commence toujours par une majuscule — c'est ce qui le
        distingue d'une balise HTML classique.
      </Note>

      <H3>JSX</H3>
      <P>
        JSX est plus strict que le HTML : les balises doivent toutes être fermées
        (<InlineCode>{"<br />"}</InlineCode>), et un composant ne peut retourner
        qu'un seul élément racine (on utilise un <InlineCode>{"<div>"}</InlineCode> ou
        un fragment <InlineCode>{"<>...</>"}</InlineCode> pour regrouper plusieurs éléments).
      </P>

      <H3>Afficher des données</H3>
      <P>
        Les accolades <InlineCode>{"{ }"}</InlineCode> permettent d'« échapper » vers
        du JavaScript à l'intérieur du JSX.
      </P>
      <Code>{`const user = { name: "Ada", imageUrl: "ada.jpg" };

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img src={user.imageUrl} alt={"Photo de " + user.name} />
    </>
  );
}`}</Code>

      <H3>Rendu conditionnel</H3>
      <P>Pas de syntaxe spéciale : on réutilise les outils JavaScript classiques.</P>
      <Code>{`<div>
  {isLoggedIn ? <AdminPanel /> : <LoginForm />}
</div>

// Version courte sans "else"
<div>
  {isLoggedIn && <AdminPanel />}
</div>`}</Code>

      <H3>Listes</H3>
      <P>
        On utilise <InlineCode>map()</InlineCode> pour transformer un tableau de
        données en tableau d'éléments JSX. Chaque élément a besoin d'une prop{" "}
        <InlineCode>key</InlineCode> unique.
      </P>
      <Code>{`const products = [
  { id: 1, title: "Chou" },
  { id: 2, title: "Ail" },
];

const items = products.map((p) => <li key={p.id}>{p.title}</li>);

return <ul>{items}</ul>;`}</Code>

      <H3>Événements et état (useState)</H3>
      <P>
        Un composant « se souvient » d'une information grâce à l'état, avec le
        Hook <InlineCode>useState</InlineCode>.
      </P>
      <Code>{`import { useState } from "react";

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Cliqué {count} fois</button>;
}`}</Code>
      <Note accent={REACT_ACCENT}>
        Les Hooks (fonctions commençant par <InlineCode>use</InlineCode>) ne
        s'appellent qu'au niveau supérieur d'un composant — jamais dans une
        condition ou une boucle.
      </Note>

      <H3>Partager des données entre composants (lifting state up)</H3>
      <P>
        Pour que plusieurs composants partagent et mettent à jour la même
        donnée, on remonte l'état vers leur parent commun, puis on le
        redescend via des <strong>props</strong>.
      </P>
      <Code>{`function MyApp() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);

  return (
    <div>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Cliqué {count} fois</button>;
}`}</Code>

      <SourceLink href="https://react.dev/learn">react.dev/learn</SourceLink>
      {" · "}
      <SourceLink href="https://nextjs.org/learn/react-foundations">
        nextjs.org — React Foundations
      </SourceLink>
    </div>
  );
}
