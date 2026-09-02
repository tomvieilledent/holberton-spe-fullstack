import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { NAV, findEntry } from "./nav.js";

/* Tous les identifiants de section valides (groupes + sous-sections). */
const VALID_IDS = new Set(
  NAV.flatMap((entry) =>
    entry.items ? entry.items.map((i) => i.id) : [entry.id]
  )
);

function readHash() {
  const id = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
  return VALID_IDS.has(id) ? id : "overview";
}

function NavButton({ item, active, accent, onClick, topLevel }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      className="nav__btn"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      style={{ "--accent": accent }}
      onClick={onClick}
    >
      {topLevel && Icon ? (
        <Icon className="nav__btn-icon" size={15} aria-hidden="true" />
      ) : null}
      <span className="nav__btn-label">{item.label}</span>
      {active ? (
        <ChevronRight className="nav__btn-caret" size={14} aria-hidden="true" />
      ) : null}
    </button>
  );
}

function SectionFallback() {
  return (
    <div className="section-fallback" role="status" aria-live="polite">
      Chargement de la section…
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(readHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef(null);

  const entry = useMemo(() => findEntry(active), [active]);
  const ActiveComponent = entry.Component;

  const go = useCallback((id) => {
    setActive(id);
    setMenuOpen(false);
    if (window.location.hash.slice(1) !== id) {
      window.location.hash = id;
    }
  }, []);

  /* Navigation arrière/avant du navigateur. */
  useEffect(() => {
    const onHashChange = () => setActive(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /* Au changement de section : focus + remontée en haut (accessibilité). */
  useEffect(() => {
    mainRef.current?.focus();
    try {
      window.scrollTo({ top: 0 });
    } catch {
      /* environnement sans scroll (jsdom) */
    }
  }, [active]);

  /* Échap ferme le tiroir mobile. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="app" data-menu-open={menuOpen || undefined}>
      <a className="app__skip" href="#section">
        Aller au contenu
      </a>

      <header className="app__topbar">
        <button
          type="button"
          className="app__burger"
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          aria-label="Ouvrir la navigation"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} aria-hidden="true" />
        </button>
        <span className="app__brand-mobile">Holberton · spé Full Stack</span>
      </header>

      <div
        className="app__overlay"
        hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      <aside id="sidebar" className="app__sidebar">
        <div className="app__brand">
          <div>
            <div className="app__brand-name">Holberton</div>
            <div className="app__brand-sub">spé Full Stack</div>
          </div>
          <button
            type="button"
            className="app__close"
            aria-label="Fermer la navigation"
            onClick={() => setMenuOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="nav" aria-label="Sections du cours">
          {NAV.map((item, idx) =>
            item.items ? (
              <div
                className="nav__group"
                key={item.group}
                style={{ marginTop: idx === 0 ? 0 : 18 }}
              >
                <div className="nav__group-label" style={{ "--accent": item.accent }}>
                  {item.icon ? (
                    <item.icon size={14} aria-hidden="true" />
                  ) : null}
                  {item.group}
                </div>
                {item.items.map((sub) => (
                  <NavButton
                    key={sub.id}
                    item={sub}
                    accent={item.accent}
                    active={active === sub.id}
                    onClick={() => go(sub.id)}
                  />
                ))}
              </div>
            ) : (
              <NavButton
                key={item.id}
                item={item}
                accent={item.accent}
                active={active === item.id}
                onClick={() => go(item.id)}
                topLevel
              />
            )
          )}
        </nav>
      </aside>

      <main id="section" className="app__main" tabIndex={-1} ref={mainRef}>
        <div className="app__content">
          <Suspense fallback={<SectionFallback />}>
            {ActiveComponent ? <ActiveComponent /> : null}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
