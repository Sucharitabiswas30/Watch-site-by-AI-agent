"use client";

import { useEffect, useMemo, useState } from "react";
import CartDrawer from "../CartDrawer";
import { collectionProducts, type CollectionProduct } from "../collection-data";
import SiteFooter from "../SiteFooter";
import { useCart } from "../cart";

const categories = ["All", "Automatic", "Chronograph", "Leather", "Minimal", "Field"] as const;
const wearers = ["All", "Men", "Women"] as const;

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function CollectionPage({ initialWearer = "All", initialCategory = "All", initialQuery = "" }: { initialWearer?: (typeof wearers)[number]; initialCategory?: (typeof categories)[number]; initialQuery?: string }) {
  const [category, setCategory] = useState<(typeof categories)[number]>(initialCategory);
  const [wearer, setWearer] = useState<(typeof wearers)[number]>(initialWearer);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(20);
  const [bagOpen, setBagOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [quickView, setQuickView] = useState<CollectionProduct | null>(null);
  const { addItem, count } = useCart();

  useEffect(() => {
    if (!quickView) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQuickView(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [quickView]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = collectionProducts.filter((product) =>
      (wearer === "All" || product.wearer === wearer) &&
      (category === "All" || product.category === category) &&
      (!normalized || `${product.name} ${product.wearer} ${product.category} ${product.movement}`.toLowerCase().includes(normalized))
    );
    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.id.localeCompare(b.id);
    });
  }, [category, wearer, query, sort]);

  const chooseCategory = (next: (typeof categories)[number]) => {
    setCategory(next);
    setVisible(20);
    const url = new URL(window.location.href);
    if (next === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  };

  const chooseWearer = (next: (typeof wearers)[number]) => {
    setWearer(next);
    setVisible(20);
    const url = new URL(window.location.href);
    if (next === "All") url.searchParams.delete("wearer");
    else url.searchParams.set("wearer", next);
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  };

  const addToBag = (product: CollectionProduct) => {
    addItem({ id: product.id, name: product.name, size: `${product.size} · ${product.movement}`, price: product.price, image: product.image });
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(""), 2400);
  };

  return (
    <main className="collection-page">
      <header className="collection-header">
        <div className="offer-bar">Complimentary shipping across India · Easy 7-day returns</div>
        <nav className="collection-nav" aria-label="Collection navigation">
          <a href="/" className="collection-back">← Home</a>
          <a href="/" className="brand" aria-label="Aevum home">AEVUM<span>WATCH CO.</span></a>
          <button className="collection-bag" onClick={() => setBagOpen(true)} aria-label={`Shopping bag with ${count} items`}>Bag <sup>{count}</sup></button>
        </nav>
      </header>

      <section className="collection-hero">
        <div className="collection-hero-copy">
          <p className="kicker">The complete catalogue</p>
          <h1>All watches</h1>
          <p>Sixty considered timepieces. Built around honest materials, balanced proportions, and the lives they accompany.</p>
        </div>
        <div className="collection-hero-image">
          <img src="/images/watch-collection.jpg" alt="A curated selection of Aevum demo watches" />
          <span><b>60</b> watches · five collections</span>
        </div>
      </section>

      <section className="collection-tools" aria-label="Product filters">
        <div className="filter-groups">
          <div className="filter-group"><span>Shop for</span><div className="filter-row" role="group" aria-label="Filter by wearer">
            {wearers.map((item) => <button key={item} className={wearer === item ? "active" : ""} onClick={() => chooseWearer(item)}>{item === "All" ? "All watches" : item}</button>)}
          </div></div>
          <div className="filter-group"><span>Collection</span><div className="filter-row" role="group" aria-label="Filter by category">
            {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => chooseCategory(item)}>{item}</button>)}
          </div></div>
        </div>
        <div className="search-sort">
          <label><span>Search</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisible(20); }} placeholder="Search watches" /></label>
          <label><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></label>
        </div>
      </section>

      <div className="collection-count"><span>{filtered.length} watches</span><span>Showing {Math.min(visible, filtered.length)} of {filtered.length}</span></div>

      {filtered.length ? (
        <section className="collection-grid" aria-label="Watch collection">
          {filtered.slice(0, visible).map((product) => (
            <article className="collection-product" key={product.id}>
              <div className="collection-product-image">
                {product.badge && <span>{product.badge}</span>}
                <button className="save-product" aria-label={`Save ${product.name}`}>♡</button>
                <a href={`/products/${product.id}`} aria-label={`View ${product.name} details`}><img src={product.image} alt={`${product.name} demo watch`} /></a>
                <button className="quick-view-button" onClick={() => setQuickView(product)}>Quick view</button>
              </div>
              <div className="collection-product-copy">
                <p>{product.wearer} · {product.category}</p><h2><a href={`/products/${product.id}`}>{product.name}</a></h2>
                <div className="collection-spec"><span>{product.size} · {product.movement}</span><i style={{ background: product.tone }} /></div>
                <div className="collection-price"><strong>{money.format(product.price)}</strong><button onClick={() => addToBag(product)}>Add to bag +</button></div>
              </div>
            </article>
          ))}
        </section>
      ) : <div className="no-results"><h2>No watches found</h2><button onClick={() => { setQuery(""); chooseWearer("All"); chooseCategory("All"); }}>Clear filters</button></div>}

      {visible < filtered.length && <button className="load-more" onClick={() => setVisible((count) => count + 20)}>Load 20 more <span>{visible} / {filtered.length}</span></button>}

      <section className="collection-note"><p className="kicker">The Aevum standard</p><h2>Made to be worn.<br />Designed to remain.</h2><div><span>Two-year warranty</span><span>Free delivery</span><span>7-day returns</span></div></section>

      <SiteFooter />
      <CartDrawer open={bagOpen} onClose={() => setBagOpen(false)} />
      {notice && <div className="bag-notice" role="status">{notice}</div>}
      {quickView && <div className="quick-view-shell" onClick={() => setQuickView(null)}>
        <section className="quick-view-dialog" role="dialog" aria-modal="true" aria-labelledby="quick-view-title" onClick={(event) => event.stopPropagation()}>
          <button className="quick-view-close" onClick={() => setQuickView(null)} aria-label="Close quick view">Close ×</button>
          <div className="quick-view-image"><img src={quickView.image} alt={`${quickView.name} demo watch`} /></div>
          <div className="quick-view-copy">
            <p className="kicker">{quickView.wearer} · {quickView.category}</p>
            <h2 id="quick-view-title">{quickView.name}</h2>
            <strong>{money.format(quickView.price)}</strong>
            <p>Balanced proportions, considered materials, and an easy-wearing profile designed for everyday timekeeping.</p>
            <div className="quick-view-specs"><span>Case <b>{quickView.size}</b></span><span>Movement <b>{quickView.movement}</b></span></div>
            <button className="quick-view-add" onClick={() => addToBag(quickView)}>Add to bag +</button>
            <a href={`/products/${quickView.id}`}>View full product details <span>↗</span></a>
          </div>
        </section>
      </div>}
    </main>
  );
}
