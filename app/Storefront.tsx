"use client";

import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import CartDrawer from "./CartDrawer";
import SiteFooter from "./SiteFooter";
import { useCart } from "./cart";

type Product = {
  id: string;
  name: string;
  size: string;
  price: string;
  image: string;
  badge?: string;
  tone: string;
};

const products: Product[] = [
  { id: "aev-001", name: "Meridian No. 01", size: "39 MM · Automatic", price: "₹18,900", image: "/images/macro-dark.jpg", badge: "New", tone: "#1d1d1d" },
  { id: "aev-002", name: "Morrow Field", size: "41 MM · Quartz", price: "₹9,400", image: "/images/tech-flatlay.jpg", badge: "New", tone: "#66513f" },
  { id: "aev-003", name: "Linea Petite", size: "28 MM · Quartz", price: "₹11,200", image: "/images/silver-watch.jpg", badge: "New", tone: "#c7a66a" },
  { id: "aev-004", name: "Atelier 36", size: "36 MM · Mechanical", price: "₹16,500", image: "/images/vintage-leather.jpg", tone: "#805139" },
  { id: "aev-005", name: "Nocturne Chronograph", size: "42 MM · Quartz", price: "₹14,800", image: "/images/chrono-watch.jpg", tone: "#222d25" },
  { id: "aev-006", name: "Stillwater", size: "34 MM · Quartz", price: "₹10,600", image: "/images/black-watch.jpg", tone: "#e7e0d2" },
];

const bestSellers: Product[] = [
  { id: "aev-008", name: "Archive Multi-Dial", size: "38 MM · Mechanical", price: "₹21,400", image: "/images/watch-collection.jpg", tone: "#9d7445" },
  { id: "aev-009", name: "Touring No. 03", size: "40 MM · Automatic", price: "₹17,800", image: "/images/car-watch-1.jpg", tone: "#32413c" },
  { id: "aev-012", name: "Grand Touring", size: "41 MM · Automatic", price: "₹19,600", image: "/images/car-watch-2.jpg", tone: "#20252a" },
  { id: "aev-010", name: "Heritage Driver", size: "39 MM · Quartz", price: "₹12,900", image: "/images/car-watch-3.jpg", tone: "#6b4936" },
  { id: "aev-007", name: "Roadster Classic", size: "42 MM · Chronograph", price: "₹15,700", image: "/images/car-watch-4.jpg", tone: "#b59b68" },
  { id: "aev-010", name: "Aster Everyday", size: "35 MM · Quartz", price: "₹9,900", image: "/images/wrist-lifestyle.jpg", tone: "#d2c1a4" },
];

const heroSlides = [
  {
    eyebrow: "The Meridian Collection",
    title: <>Precision, with<br />a quieter pulse.</>,
    description: "A study in proportion, restraint, and everyday permanence.",
    cta: "Discover Meridian",
    href: "/collections?category=Automatic",
    image: "/images/hero-watch.jpg",
    position: "center 52%",
  },
  {
    eyebrow: "The Linea Collection",
    title: <>Small scale.<br />Full expression.</>,
    description: "Jewellery-minded silhouettes designed to make every minute feel considered.",
    cta: "Discover Linea",
    href: "/collections?wearer=Women&category=Minimal",
    image: "/images/wrist-lifestyle.jpg",
    position: "center 48%",
  },
  {
    eyebrow: "The Morrow Field",
    title: <>Ready for hours<br />without a plan.</>,
    description: "Weather-ready clarity and everyday comfort, from first light onward.",
    cta: "Discover Morrow",
    href: "/collections?category=Field",
    image: "/images/car-watch-1.jpg",
    position: "center 54%",
  },
];

function ProductCard({ product, addToBag }: { product: Product; addToBag: (product: Product) => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`heart ${saved ? "saved" : ""}`} onClick={() => setSaved((current) => !current)} aria-pressed={saved} aria-label={`${saved ? "Remove" : "Save"} ${product.name}`}>{saved ? "♥" : "♡"}</button>
        <a className="product-image-link" href={`/products/${product.id}`} aria-label={`View ${product.name} details`}><img src={product.image} alt={`${product.name} demo watch`} className="product-image" /></a>
      </div>
      <div className="product-info">
        <h3><a href={`/products/${product.id}`}>{product.name}</a></h3>
        <p>{product.size}</p>
        <div className="product-meta"><strong>{product.price}</strong><i style={{ background: product.tone }} /></div>
        <button className="add-button" onClick={() => addToBag(product)}>Add to bag <span>+</span></button>
      </div>
    </article>
  );
}

export default function Storefront() {
  const [bagOpen, setBagOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signup, setSignup] = useState("");
  const [signupDone, setSignupDone] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [campaignIndex, setCampaignIndex] = useState(0);
  const [campaignCanPrev, setCampaignCanPrev] = useState(false);
  const [campaignCanNext, setCampaignCanNext] = useState(true);
  const campaignRail = useRef<HTMLDivElement>(null);
  const newRail = useRef<HTMLDivElement>(null);
  const bestRail = useRef<HTMLDivElement>(null);
  const { addItem, count } = useCart();

  const addToBag = (product: Product) => {
    addItem({ id: product.id, name: product.name, size: product.size, price: Number(product.price.replace(/[^0-9]/g, "")), image: product.image });
    setBagOpen(true);
  };
  const slide = (ref: RefObject<HTMLDivElement | null>, direction: number) => {
    ref.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  };
  const subscribe = (event: FormEvent) => {
    event.preventDefault();
    if (signup.includes("@")) setSignupDone(true);
  };
  const runSearch = (event: FormEvent) => {
    event.preventDefault();
    const query = searchTerm.trim();
    window.location.href = query ? `/collections?search=${encodeURIComponent(query)}` : "/collections";
  };

  useEffect(() => {
    if (heroPaused) return;
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  const changeHero = (direction: number) => {
    setHeroIndex((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  const syncCampaignSlider = () => {
    const rail = campaignRail.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>(".campaign-product-card");
    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
    const step = (firstCard?.offsetWidth || rail.clientWidth) + gap;
    const lastScrollPosition = rail.scrollWidth - rail.clientWidth;

    setCampaignIndex(Math.min(bestSellers.length - 1, Math.max(0, Math.round(rail.scrollLeft / step))));
    setCampaignCanPrev(rail.scrollLeft > 3);
    setCampaignCanNext(rail.scrollLeft < lastScrollPosition - 3);
  };

  const moveCampaign = (direction: number) => {
    const rail = campaignRail.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>(".campaign-product-card");
    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({ left: direction * ((firstCard?.offsetWidth || rail.clientWidth) + gap), behavior: "smooth" });
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(syncCampaignSlider);
    window.addEventListener("resize", syncCampaignSlider);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncCampaignSlider);
    };
  }, []);

  return (
    <main>
      <header className="site-header">
        <div className="offer-bar">Complimentary shipping across India · Easy 7-day returns</div>
        <nav className="navbar" aria-label="Primary navigation">
          <div className="nav-group nav-left">
            <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
            <a href="#new">New</a><a href="/collections">Watches</a><a href="/collections">Collections</a>
          </div>
          <a href="#top" className="brand" aria-label="Aevum home">AEVUM<span>WATCH CO.</span></a>
          <div className="nav-group nav-right">
            <a href="#journal">Journal</a>
            <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search">⌕</button>
            <button className="bag-button" onClick={() => setBagOpen(true)} aria-label={`Shopping bag, ${count} items`}>Bag <sup>{count}</sup></button>
          </div>
        </nav>
        {menuOpen && <div className="mobile-panel"><a href="#new" onClick={() => setMenuOpen(false)}>New arrivals</a><a href="/collections" onClick={() => setMenuOpen(false)}>Watches</a><a href="/collections" onClick={() => setMenuOpen(false)}>Collections</a><a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a></div>}
      </header>

      <section
        className="hero"
        id="top"
        aria-label="Featured collections"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        onFocusCapture={() => setHeroPaused(true)}
        onBlurCapture={() => setHeroPaused(false)}
      >
        {heroSlides.map((slide, index) => (
          <div
            className={`hero-slide ${index === heroIndex ? "active" : ""}`}
            style={{ backgroundImage: `url('${slide.image}')`, backgroundPosition: slide.position }}
            aria-hidden={index !== heroIndex}
            key={slide.eyebrow}
          />
        ))}
        <div className="hero-shade" />
        <div className="hero-copy" aria-live="polite">
          <p className="eyebrow">{heroSlides[heroIndex].eyebrow}</p>
          <h1 key={`title-${heroIndex}`}>{heroSlides[heroIndex].title}</h1>
          <p className="hero-text">{heroSlides[heroIndex].description}</p>
          <a href={heroSlides[heroIndex].href} className="light-cta">{heroSlides[heroIndex].cta} <span>↗</span></a>
        </div>
        <div className="hero-controls">
          <button onClick={() => changeHero(-1)} aria-label="Previous hero slide">←</button>
          <div className="hero-dots" role="tablist" aria-label="Hero slides">
            {heroSlides.map((slide, index) => (
              <button
                key={`dot-${slide.eyebrow}`}
                className={index === heroIndex ? "active" : ""}
                onClick={() => setHeroIndex(index)}
                role="tab"
                aria-selected={index === heroIndex}
                aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
              />
            ))}
          </div>
          <button onClick={() => changeHero(1)} aria-label="Next hero slide">→</button>
        </div>
        <div className="hero-index" aria-hidden="true"><b>{String(heroIndex + 1).padStart(2,"0")}</b><span /><em>{String(heroSlides.length).padStart(2,"0")}</em></div>
      </section>

      <section className="wearer-grid" id="watches" aria-label="Shop watches">
        <a className="wearer-card mens" href="/collections?wearer=Men"><div><p>For every day</p><h2>Men's Watches</h2><span>Shop now ↗</span></div></a>
        <a className="wearer-card womens" href="/collections?wearer=Women"><div><p>Enduring details</p><h2>Women's Watches</h2><span>Shop now ↗</span></div></a>
      </section>

      <section className="campaign deep-slider-section sectionlink slider-wrapper" aria-label="Solstice campaign and most-loved watches">
        <article className="campaign-editorial">
          <div className="campaign-editorial-media">
            <img src="/images/leather-watch.jpg" alt="Aevum Solstice watch in warm evening light" />
          </div>
          <div className="campaign-editorial-shade" />
          <span className="campaign-edition" aria-hidden="true">AEVUM · SOLSTICE · 2026</span>
          <div className="campaign-editorial-copy">
            <p className="eyebrow">Aevum Solstice</p>
            <h2>Golden hour,<br />kept a little longer.</h2>
            <p>Warm metals and a softly brushed dial, composed for late light and long evenings.</p>
            <a className="light-cta" href="/collections?wearer=Women&category=Minimal">Explore the collection <span>↗</span></a>
          </div>
          <div className="campaign-editorial-index" aria-hidden="true"><b>02</b><span /><em>06</em></div>
        </article>

        <div className="campaign-carousel">
          <header className="campaign-carousel-head">
            <div><p className="kicker">Worn on repeat</p><h2>Our Most-Loved Styles</h2></div>
            <div className="campaign-slider-controls" aria-label="Most-loved styles navigation">
              <button type="button" onClick={() => moveCampaign(-1)} disabled={!campaignCanPrev} aria-label="Previous most-loved style">←</button>
              <button type="button" onClick={() => moveCampaign(1)} disabled={!campaignCanNext} aria-label="Next most-loved style">→</button>
            </div>
          </header>

          <div className="campaign-product-rail" ref={campaignRail} onScroll={syncCampaignSlider} aria-label="Most-loved watches carousel">
            {bestSellers.map((product) => (
              <article className="campaign-product-card" key={`campaign-${product.name}`}>
                <a className="campaign-product-image" href={`/products/${product.id}`} aria-label={`View ${product.name} details`}>
                  <span>Bestseller</span>
                  <img src={product.image} alt={`${product.name} demo watch`} draggable="false" />
                </a>
                <div className="campaign-product-info">
                  <p>{product.size}</p>
                  <h3><a href={`/products/${product.id}`}>{product.name}</a></h3>
                  <div><strong>{product.price}</strong><i style={{ background: product.tone }} /></div>
                  <button type="button" onClick={() => addToBag(product)}>Add to bag <span>+</span></button>
                </div>
              </article>
            ))}
          </div>

          <div className="campaign-carousel-foot" aria-hidden="true">
            <span>{String(campaignIndex + 1).padStart(2, "0")} / {String(bestSellers.length).padStart(2, "0")}</span>
            <div><i style={{ width: `${((campaignIndex + 1) / bestSellers.length) * 100}%` }} /></div>
          </div>
        </div>
      </section>

      <section className="product-section" id="new">
        <div className="section-heading"><div><p className="kicker">Just in</p><h2>Latest release</h2></div><div className="rail-controls"><button onClick={() => slide(newRail,-1)} aria-label="Previous products">←</button><button onClick={() => slide(newRail,1)} aria-label="Next products">→</button></div></div>
        <div className="product-rail" ref={newRail}>{products.map((product) => <ProductCard key={product.name} product={product} addToBag={addToBag} />)}</div>
        <a className="shop-all" href="/collections">Shop all new watches <span>↗</span></a>
      </section>

      <section className="product-section muted" id="best">
        <div className="section-heading"><div><p className="kicker">Worn on repeat</p><h2>Best sellers</h2></div><div className="rail-controls"><button onClick={() => slide(bestRail,-1)} aria-label="Previous products">←</button><button onClick={() => slide(bestRail,1)} aria-label="Next products">→</button></div></div>
        <div className="product-rail" ref={bestRail}>{bestSellers.map((product) => <ProductCard key={`best-${product.name}`} product={{...product,badge:"Bestseller"}} addToBag={addToBag} />)}</div>
      </section>

      <section className="categories" id="collections">
        <div className="category-copy"><p className="kicker">Find your rhythm</p><h2>Popular categories</h2><div className="category-links"><a href="/collections?category=Automatic">Automatic <span>01</span></a><a href="/collections?category=Leather">Leather <span>02</span></a><a href="/collections?category=Field">Field <span>03</span></a><a href="/collections?category=Chronograph">Chronograph <span>04</span></a><a href="/collections?category=Minimal">Minimal <span>05</span></a></div></div>
        <div className="category-image"><span>Built for the hours<br />you don't count.</span></div>
      </section>

      <section className="spotlight">
        <div className="spotlight-image"><img src="/images/macro-dark.jpg" alt="Close detail of a dark automatic watch" /></div>
        <div className="spotlight-copy"><p className="kicker">Watchmaker's spotlight</p><h2>Measured by hand.<br />Made to be lived in.</h2><p>Each Aevum case begins as a simple study in balance. The edges are softened by hand, the dial is inspected under natural light, and every strap is chosen to wear better with time.</p><blockquote>“The detail should be felt before it is noticed.”</blockquote><a className="dark-cta" href="/collections?category=Automatic">Meet the Meridian <span>↗</span></a></div>
      </section>

      <section className="manifesto"><p>Every watch has a</p><h2>soul and a story<br />to be told.</h2></section>

      <section className="parallax-slider pan-watch" aria-label="Watchmaker's Spotlight">
        {[
          { number:"01", name:"Roadster Classic", detail:"42 MM · Chronograph", price:"₹15,700", image:"/images/car-watch-4.jpg", position:"center 52%", href:"/products/aev-007" },
          { number:"02", name:"Linea Petite", detail:"28 MM · Quartz", price:"₹11,200", image:"/images/silver-watch.jpg", position:"center 54%", href:"/products/aev-003" },
        ].map((watch) => (
          <article className="parallax-watch-panel" key={watch.name} style={{ backgroundImage: `url('${watch.image}')`, backgroundPosition: watch.position }}>
            <div className="parallax-watch-shade" />
            <div className="parallax-watch-detail">
              <p className="kicker">Watchmaker's Spotlight · {watch.number}</p>
              <h2>{watch.name}</h2>
              <p>{watch.detail}</p>
              <strong>From {watch.price}</strong>
            </div>
            <a className="parallax-watch-cta" href={watch.href}>Discover the watch <span>↗</span></a>
            <span className="parallax-watch-count" aria-hidden="true">{watch.number} / 02</span>
          </article>
        ))}
      </section>

      <section className="explore-section">
        <div className="section-heading"><div><p className="kicker">Curated edits</p><h2>More to explore</h2></div><p>You don't want to miss these</p></div>
        <div className="explore-grid">
          {[
            ["Chronographs","/images/chrono-watch.jpg","/collections?category=Chronograph"],
            ["Leather essentials","/images/vintage-leather.jpg","/collections?category=Leather"],
            ["Field notes","/images/tech-flatlay.jpg","/collections?category=Field"],
            ["Quiet luxury","/images/silver-watch.jpg","/collections?category=Minimal"]
          ].map(([title,image,href],i)=><a className="explore-card" href={href} key={title}><img src={image} alt="" /><div><span>0{i+1}</span><h3>{title}</h3><b>Explore ↗</b></div></a>)}
        </div>
      </section>

      <section className="journal-strip" id="journal"><div><p className="kicker">From the journal</p><h2>Never miss a second</h2></div><p>Stories about craft, people, and the rituals that give time its meaning.</p><a href="#newsletter">Read the journal ↗</a></section>

      <section className="newsletter" id="newsletter">
        <p className="kicker">The Aevum letter</p><h2>Good things,<br />in good time.</h2><p>New releases, private previews, and notes from our studio—sent occasionally.</p>
        {signupDone ? <div className="signup-success">You're on the list. Welcome to Aevum.</div> : <form onSubmit={subscribe}><label htmlFor="email">Email address</label><div><input id="email" type="email" value={signup} onChange={(e)=>setSignup(e.target.value)} placeholder="you@example.com" required /><button type="submit">Join us ↗</button></div></form>}
      </section>

      <SiteFooter />

      {searchOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Search watches"><button className="overlay-close" onClick={()=>setSearchOpen(false)}>Close ×</button><form className="search-box" onSubmit={runSearch}><p className="kicker">Search Aevum</p><input autoFocus value={searchTerm} onChange={(event)=>setSearchTerm(event.target.value)} placeholder="What are you looking for?" aria-label="Search query" /><button type="submit">Search watches ↗</button></form></div>}
      <CartDrawer open={bagOpen} onClose={() => setBagOpen(false)} />
    </main>
  );
}
