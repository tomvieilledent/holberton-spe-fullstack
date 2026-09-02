/* Coloration syntaxique des blocs de code (highlight.js, cœur + grammaires ciblées).
   Détection heuristique du langage, avec repli sur l'auto-détection.
   Les diagrammes Mermaid sont laissés bruts (juste échappés). */
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";
import sql from "highlight.js/lib/languages/sql";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import nginx from "highlight.js/lib/languages/nginx";
import gherkin from "highlight.js/lib/languages/gherkin";
import plaintext from "highlight.js/lib/languages/plaintext";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("dockerfile", dockerfile);
hljs.registerLanguage("nginx", nginx);
hljs.registerLanguage("gherkin", gherkin);
hljs.registerLanguage("plaintext", plaintext);

const AUTO_SUBSET = ["bash", "javascript", "json", "yaml", "sql", "dockerfile", "nginx"];

const MERMAID = /^\s*(sequenceDiagram|classDiagram|erDiagram|stateDiagram(-v2)?|flowchart|graph\s|gantt|mindmap|journey|pie\s)\b/;

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function detect(s) {
  if (MERMAID.test(s)) return "mermaid";
  if (/^\s*(FROM|RUN|COPY|ADD|CMD|ENTRYPOINT|ENV|WORKDIR|EXPOSE|ARG|LABEL)\s/m.test(s)) return "dockerfile";
  if (/^\s*(server|http|location|upstream|events)\s*\{|^\s*listen\s+\d/m.test(s)) return "nginx";
  if (/^\s*(Feature:|Fonctionnalité:|Scenario|Scénario|Background:|Contexte:|Plan du scénario:|Given |When |Then |And |Quand |Alors |Étant donné)/m.test(s)) return "gherkin";
  if (/\b(SELECT|CREATE\s+(TABLE|VIEW|INDEX)|INSERT\s+INTO|ALTER\s+TABLE|FOREIGN\s+KEY|PRIMARY\s+KEY|CONSTRAINT|REFERENCES)\b/i.test(s)) return "sql";
  if (/^\s*(npm |npx |pnpm |yarn |git |docker |sudo |curl |wget |cd |export |bash |sh |ssh|scp |chmod |chown |mkdir |rsync |systemctl |certbot |ufw |apt(-get)? )/m.test(s) || /^\s*\$ /m.test(s) || /^#!\/.*sh\b/.test(s)) return "bash";
  if (/\b(function|const|let|=>|import\s|export\s|interface\s|class\s+[A-Z])\b/.test(s) && /[{}();]/.test(s)) return "javascript";
  if (/^\s*[[{]/.test(s.trimStart()) && /[":]/.test(s)) return "json";
  if (/^[\w-]+:\s*$/m.test(s) || (/^\s*[\w.-]+:\s/m.test(s) && !/[{};]/.test(s))) return "yaml";
  return null;
}

export function highlight(code) {
  const src = typeof code === "string" ? code : String(code ?? "");
  const lang = detect(src);

  if (lang === "mermaid" || lang === null) {
    if (lang === null) {
      try {
        const r = hljs.highlightAuto(src, AUTO_SUBSET);
        return { html: r.value, lang: r.language || "auto" };
      } catch {
        /* repli plus bas */
      }
    }
    return { html: escapeHtml(src), lang: lang || "plain" };
  }

  try {
    return { html: hljs.highlight(src, { language: lang }).value, lang };
  } catch {
    return { html: escapeHtml(src), lang: "plain" };
  }
}
