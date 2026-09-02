import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { SVELTE_ACCENT } from "../../shared/ui/tokens.js";
import { Component } from "lucide-react";

export default function SvelteBasics() {
  return (
    <div>
      <H2 accent={SVELTE_ACCENT}>Svelte — les bases</H2>
      <P>
        Svelte est un <strong>compilateur</strong>, pas une librairie
        exécutée dans le navigateur. Les composants, écrits en HTML, CSS et
        JavaScript, sont transformés à la compilation en JavaScript optimisé
        — il n'y a pas de « virtual DOM » à faire tourner en production.
      </P>
      <Code>{`<script>
  function greet() {
    alert("Bienvenue sur Svelte !");
  }
</script>

<button onclick={greet}>clique-moi</button>

<style>
  button {
    font-size: 2em;
  }
</style>`}</Code>
      <Note accent={SVELTE_ACCENT}>
        Un fichier <InlineCode>.svelte</InlineCode> regroupe balisage, style
        et logique au même endroit — un peu comme un composant Vue en Single
        File Component.
      </Note>

      <H3>Les runes</H3>
      <P>
        Depuis Svelte 5, la réactivité passe par des <strong>runes</strong> :
        des symboles préfixés par <InlineCode>$</InlineCode> qui font partie
        du langage (pas besoin de les importer). Elles ne sont valables qu'à
        certains endroits précis du code, comme des mots-clés.
      </P>

      <H3>$state — déclarer de l'état réactif</H3>
      <Code>{`<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>
  clics : {count}
</button>`}</Code>
      <P>
        Contrairement à d'autres frameworks, il n'y a pas d'API spéciale
        pour manipuler l'état : <InlineCode>count</InlineCode> reste un
        simple nombre, qu'on met à jour comme n'importe quelle variable.
      </P>
      <Note accent={SVELTE_ACCENT}>
        Utilisé sur un tableau ou un objet, <InlineCode>$state</InlineCode>{" "}
        crée un proxy profondément réactif : modifier une propriété interne
        (ex. <InlineCode>todos[0].done = true</InlineCode>) suffit à
        déclencher la mise à jour de l'interface.
      </Note>

      <H3>$props — recevoir les props d'un composant</H3>
      <Code>{`<!-- MyComponent.svelte -->
<script>
  let { adjective } = $props();
</script>

<p>ce composant est {adjective}</p>`}</Code>
      <P>
        On déstructure généralement <InlineCode>$props()</InlineCode>{" "}
        directement, avec des valeurs par défaut si besoin :
      </P>
      <Code>{`let { adjective = "sympa" } = $props();`}</Code>
      <Note accent={SVELTE_ACCENT}>
        Ne pas muter un objet reçu en prop directement (sauf s'il est
        déclaré <InlineCode>$bindable</InlineCode>) : ce n'est pas le rôle du
        composant enfant de modifier une donnée qui ne lui appartient pas.
      </Note>

      <SourceLink href="https://svelte.dev/docs/svelte/overview">
        svelte.dev — Overview
      </SourceLink>
      {" · "}
      <SourceLink href="https://svelte.dev/docs/svelte/what-are-runes">
        svelte.dev — What are runes?
      </SourceLink>
      {" · "}
      <SourceLink href="https://svelte.dev/tutorial/svelte/welcome-to-svelte">
        svelte.dev — Tutoriel interactif
      </SourceLink>
    </div>
  );
}
