import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "./App.jsx";

function navButtons() {
  const nav = document.querySelector("nav");
  return Array.from(nav.querySelectorAll("button"));
}

describe("App — structure générale", () => {
  it("s'affiche sans erreur avec la marque dans la barre latérale", () => {
    render(<App />);
    expect(screen.getByText("Holberton")).toBeInTheDocument();
    expect(screen.getByText("spé Full Stack")).toBeInTheDocument();
  });

  it("affiche la vue d'ensemble par défaut", () => {
    render(<App />);
    expect(screen.getByText("Récap de la semaine")).toBeInTheDocument();
  });

  it("propose au moins 40 entrées de navigation (25 initiales + 15 ajoutées)", () => {
    render(<App />);
    expect(navButtons().length).toBeGreaterThanOrEqual(40);
  });
});

describe("App — navigation", () => {
  it("change le contenu principal au clic sur une entrée", async () => {
    const user = userEvent.setup();
    render(<App />);
    const main = document.querySelector("main");

    await user.click(screen.getAllByText("Les bases")[0]);
    expect(
      within(main).getByRole("heading", { name: /React — les bases/ })
    ).toBeInTheDocument();
  });

  it("rend chacune des 15 nouvelles sections avec un titre et sans planter", async () => {
    const user = userEvent.setup();
    render(<App />);
    const main = document.querySelector("main");

    const nouvelles = [
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

    for (const label of nouvelles) {
      await user.click(screen.getByText(label));
      expect(within(main).getByRole("heading", { level: 2 })).toBeInTheDocument();
    }
  });

  it("affiche un bloc de code (diagramme Mermaid) dans la section Diagramme de classes", async () => {
    const user = userEvent.setup();
    render(<App />);
    const main = document.querySelector("main");

    await user.click(screen.getByText("Diagramme de classes & UML avancé"));
    const blocs = main.querySelectorAll("pre code");
    expect(blocs.length).toBeGreaterThan(0);
    expect(
      Array.from(blocs).some((b) => b.textContent.includes("classDiagram"))
    ).toBe(true);
  });
});

describe("App — robustesse", () => {
  it("chaque entrée de navigation rend un contenu principal non vide", async () => {
    const user = userEvent.setup();
    render(<App />);
    const main = document.querySelector("main");

    for (const btn of navButtons()) {
      await user.click(btn);
      expect(
        main.textContent.trim().length,
        `contenu vide après clic sur « ${btn.textContent} »`
      ).toBeGreaterThan(80);
      expect(main.querySelector("h2, h3, p")).toBeTruthy();
    }
  });
});
