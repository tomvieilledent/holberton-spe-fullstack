import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App.jsx";
import { NAV } from "./nav.js";

beforeEach(() => {
  window.location.hash = "";
});

function navButtons() {
  return Array.from(document.querySelector(".nav").querySelectorAll("button"));
}

const NEW_SECTIONS = [
  "Repository & inversion des dépendances",
  "Séquence & états-transitions",
  "Règles de gestion & cardinalités",
  "Normalisation stricte (1NF-3NF)",
  "MLD & MPD — contraintes SQL",
  "Diagramme de classes & UML avancé",
  "Architecture RESTful",
  "Spécification OpenAPI 3.0",
  "Validation via JSON Schema",
  "PRD, User Story & INVEST",
  "BDD & Gherkin",
  "Scenario Outline & Examples",
  "Urbanisation de l'information",
  "Cohérence inter-modèles",
  "Documentation as Code & SSOT",
];

describe("App — structure", () => {
  it("s'affiche avec la marque et la vue d'ensemble par défaut", async () => {
    render(<App />);
    expect(screen.getByText("Holberton")).toBeInTheDocument();
    expect(await screen.findByText("Récap de la semaine")).toBeInTheDocument();
  });

  it("expose une navigation avec au moins 40 entrées", () => {
    render(<App />);
    expect(navButtons().length).toBeGreaterThanOrEqual(40);
  });

  it("nav.js et l'UI listent le même nombre de sections", () => {
    const fromData = NAV.flatMap((e) => (e.items ? e.items.length : 1));
    render(<App />);
    expect(navButtons().length).toBe(fromData.reduce((a, b) => a + b, 0));
  });
});

describe("App — navigation SPA", () => {
  it("change la section active et l'URL (hash) au clic", async () => {
    const user = userEvent.setup();
    render(<App />);
    const main = document.querySelector("main");

    await user.click(screen.getAllByText("Les bases")[0]);
    expect(
      await within(main).findByRole("heading", { name: /React — les bases/ })
    ).toBeInTheDocument();
    expect(window.location.hash).toBe("#react-basics");
  });

  it("ouvre directement une section depuis le hash de l'URL", async () => {
    window.location.hash = "#uml-class-diagram";
    render(<App />);
    const main = document.querySelector("main");
    expect(
      await within(main).findByRole("heading", { name: /Diagramme de classes & UML avancé/ })
    ).toBeInTheDocument();
  });

  it("rend les 15 nouvelles sections sans planter", async () => {
    const user = userEvent.setup();
    render(<App />);
    const main = document.querySelector("main");

    for (const label of NEW_SECTIONS) {
      await user.click(screen.getByText(label));
      await waitFor(() =>
        expect(within(main).getByRole("heading", { level: 2 })).toBeInTheDocument()
      );
    }
  });

  it("affiche le diagramme Mermaid comme bloc de code", async () => {
    const user = userEvent.setup();
    render(<App />);
    const main = document.querySelector("main");

    await user.click(screen.getByText("Diagramme de classes & UML avancé"));
    await waitFor(() => {
      const blocs = main.querySelectorAll("pre code");
      expect(blocs.length).toBeGreaterThan(0);
      expect(
        Array.from(blocs).some((b) => b.textContent.includes("classDiagram"))
      ).toBe(true);
    });
  });
});

describe("App — robustesse", () => {
  it("chaque entrée de navigation rend un contenu non vide", async () => {
    const user = userEvent.setup();
    render(<App />);
    const main = document.querySelector("main");

    for (const btn of navButtons()) {
      const label = btn.textContent;
      await user.click(btn);
      await waitFor(() =>
        expect(
          main.textContent.trim().length,
          `contenu vide après clic sur « ${label} »`
        ).toBeGreaterThan(80)
      );
    }
  });
});
