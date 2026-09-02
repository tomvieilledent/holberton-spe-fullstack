import "@testing-library/jest-dom/vitest";

// jsdom n'implémente pas le défilement : on le neutralise pour les tests.
window.scrollTo = () => {};
