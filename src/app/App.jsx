import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";
import { NAV, ALL_IDS, DEFAULT_ID, findEntry } from "./nav.js";

const VALID_IDS = new Set(ALL_IDS);

function readHash() {
  const id = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
  return VALID_IDS.has(id) ? id : DEFAULT_ID;
}

function NavButton({ item, active, accent, onClick }) {
  return (
    <button
      type="button"
      className="nav__btn"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      style={{ "--accent": accent }}
      onClick={onClick}
    >
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
  const [openCats, setOpenCats] = useState(
    () => new Set([findEntry(readHash()).category])
  );
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(null); // { entries, run } — chargé à la demande
  const mainRef = useRef(null);

  const entry = useMemo(() => findEntry(active), [active]);
  const ActiveComponent = entry.Component;

  const go = useCallback((id) => {
    setActive(id);
    setMenuOpen(false);
    setQuery("");
    if (window.location.hash.slice(1) !== id) {
      window.location.hash = id;
    }
  }, []);

  const toggleCat = useCallback((name) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const ensureSearch = useCallback(() => {
    if (search) return;
    import("./search.js").then((m) => {
      setSearch({ entries: m.buildIndex(), run: m.runSearch });
    });
  }, [search]);

  const results = useMemo(() => {
    if (!search || query.trim().length < 2) return [];
    return search.run(query, search.entries);
  }, [search, query]);

  const searching = query.trim().length >= 2;

  /* Navigation arrière/avant du navigateur. */
  useEffect(() => {
    const onHashChange = () => setActive(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /* La catégorie de la section active reste dépliée. */
  useEffect(() => {
    const cat = findEntry(active).category;
    setOpenCats((prev) => (prev.has(cat) ? prev : new Set(prev).add(cat)));
  }, [active]);

  /* Changement de section : focus + retour en haut. */
  useEffect(() => {
    mainRef.current?.focus();
    try {
      window.scrollTo({ top: 0 });
    } catch {
      /* jsdom */
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

        <div className="nav__search">
          <Search size={14} aria-hidden="true" />
          <input
            type="search"
            className="nav__search-input"
            placeholder="Rechercher (ex. uml, docker, rest…)"
            value={query}
            onFocus={ensureSearch}
            onChange={(e) => {
              ensureSearch();
              setQuery(e.target.value);
            }}
            aria-label="Rechercher une section"
          />
          {query ? (
            <button
              type="button"
              className="nav__search-clear"
              aria-label="Effacer la recherche"
              onClick={() => setQuery("")}
            >
              <X size={14} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {searching ? (
          <div className="nav__results" aria-label="Résultats de recherche">
            {!search ? (
              <p className="nav__results-msg">Indexation…</p>
            ) : results.length === 0 ? (
              <p className="nav__results-msg">Aucun résultat pour « {query.trim()} »</p>
            ) : (
              results.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="nav__result"
                  style={{ "--accent": r.accent }}
                  onClick={() => go(r.id)}
                >
                  <span className="nav__result-label">{r.label}</span>
                  <span className="nav__result-path">
                    {r.category} · {r.group}
                  </span>
                  {r.snippet ? (
                    <span className="nav__result-snippet">{r.snippet}</span>
                  ) : null}
                </button>
              ))
            )}
          </div>
        ) : (
          <nav className="nav" aria-label="Sections du cours">
            {NAV.map((cat) => {
              const open = openCats.has(cat.category);
              return (
                <section className="nav__cat" key={cat.category}>
                  <button
                    type="button"
                    className="nav__cat-toggle"
                    aria-expanded={open}
                    style={{ "--accent": cat.accent }}
                    onClick={() => toggleCat(cat.category)}
                  >
                    <cat.icon size={16} aria-hidden="true" />
                    <span className="nav__cat-name">{cat.category}</span>
                    <ChevronDown
                      className="nav__cat-caret"
                      data-open={open || undefined}
                      size={15}
                      aria-hidden="true"
                    />
                  </button>
                  {open ? (
                    <div className="nav__cat-body">
                      {cat.groups.map((g) => (
                        <div className="nav__group" key={g.group}>
                          <div
                            className="nav__group-label"
                            style={{ "--accent": g.accent }}
                          >
                            {g.icon ? (
                              <g.icon size={13} aria-hidden="true" />
                            ) : null}
                            {g.group}
                          </div>
                          {g.items.map((it) => (
                            <NavButton
                              key={it.id}
                              item={it}
                              accent={g.accent}
                              active={active === it.id}
                              onClick={() => go(it.id)}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </nav>
        )}
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
