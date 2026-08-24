"use client";

import { useState } from "react";
import CartDrawer from "../../CartDrawer";
import type { CollectionProduct } from "../../collection-data";
import SiteFooter from "../../SiteFooter";
import { useCart } from "../../cart";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const productViews = [
  { label: "Full view", position: "center", scale: 1 },
  { label: "Dial detail", position: "center 42%", scale: 1.42 },
  { label: "Case detail", position: "46% 38%", scale: 1.22 },
  { label: "Strap detail", position: "center 76%", scale: 1.34 },
];

export default function ProductDetail({ product, related }: { product: CollectionProduct; related: CollectionProduct[] }) {
  const [selectedView, setSelectedView] = useState(0);
  const [bagOpen, setBagOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, count } = useCart();
  const changeView = (direction: number) => setSelectedView((current) => (current + direction + productViews.length) % productViews.length);

  const addToBag = () => {
    addItem({ id: product.id, name: product.name, size: `${product.size} · ${product.movement}`, price: product.price, image: product.image });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  };

  return (
    <main className="product-detail-page">
      <header className="collection-header">
        <div className="offer-bar">Complimentary shipping across India · Easy 7-day returns</div>
        <nav className="collection-nav" aria-label="Product navigation">
          <a href="/collections" className="collection-back">← All watches</a>
          <a href="/" className="brand" aria-label="Aevum home">AEVUM<span>WATCH CO.</span></a>
          <button className="collection-bag" onClick={() => setBagOpen(true)} aria-label={`Shopping bag with ${count} items`}>Bag <sup>{count}</sup></button>
        </nav>
      </header>

      <div className="product-breadcrumb"><a href="/">Home</a><span>/</span><a href="/collections">Watches</a><span>/</span><b>{product.name}</b></div>

      <section className="product-detail-hero">
        <div className="product-gallery">
          <div className="product-main-image" aria-live="polite">
            <img key={selectedView} src={product.image} alt={`${product.name} — ${productViews[selectedView].label}`} style={{ objectPosition: productViews[selectedView].position, transform: `scale(${productViews[selectedView].scale})` }} />
            <span className="product-view-label">{productViews[selectedView].label}</span>
            <div className="product-slider-controls"><button onClick={() => changeView(-1)} aria-label="Previous product view">←</button><span>{String(selectedView + 1).padStart(2,"0")} / {String(productViews.length).padStart(2,"0")}</span><button onClick={() => changeView(1)} aria-label="Next product view">→</button></div>
          </div>
          <div className="product-thumbnails" aria-label={`${product.name} views`}>
            {productViews.map((view, index) => <button key={view.label} className={selectedView === index ? "active" : ""} onClick={() => setSelectedView(index)} aria-label={`Show ${view.label}`} aria-pressed={selectedView === index}><img src={product.image} alt="" style={{ objectPosition: view.position, transform: `scale(${view.scale})` }} /><span>{view.label}</span></button>)}
          </div>
        </div>

        <div className="product-detail-copy">
          <p className="kicker">{product.wearer} · {product.category}</p>
          {product.badge && <span className="detail-badge">{product.badge}</span>}
          <h1>{product.name}</h1>
          <div className="detail-price"><strong>{money.format(product.price)}</strong><span>Inclusive of all taxes</span></div>
          <p className="detail-intro">A considered everyday watch with balanced proportions, a clear dial, and materials chosen to look better as they gather time.</p>
          <div className="detail-colour"><span>Selected finish</span><div><i style={{ background: product.tone }} /><b>Signature {product.category}</b></div></div>
          <div className="detail-spec-grid">
            <div><span>Case</span><strong>{product.size}</strong></div>
            <div><span>Movement</span><strong>{product.movement}</strong></div>
            <div><span>Water resistance</span><strong>50 metres</strong></div>
            <div><span>Warranty</span><strong>Two years</strong></div>
          </div>
          <button className="detail-add" onClick={addToBag}>{added ? "Added to bag ✓" : "Add to bag"}<span>{money.format(product.price)}</span></button>
          <div className="detail-services"><p><b>Complimentary delivery</b><span>Across India</span></p><p><b>Easy returns</b><span>Within 7 days</span></p><p><b>Secure checkout</b><span>Demo experience</span></p></div>
        </div>
      </section>

      <section className="product-story">
        <p className="kicker">Designed around the day</p>
        <h2>Quietly precise.<br />Comfortably present.</h2>
        <p>From the first sketch to the final finish, every proportion is considered for clarity on the wrist and ease in daily life.</p>
      </section>

      <section className="related-products">
        <div className="section-heading"><div><p className="kicker">Keep exploring</p><h2>Related watches</h2></div><a href={`/collections?category=${product.category}`}>View the {product.category} collection ↗</a></div>
        <div className="related-grid">{related.map((item) => <a href={`/products/${item.id}`} key={item.id}><div><img src={item.image} alt={`${item.name} demo watch`} /></div><p>{item.wearer} · {item.category}</p><h3>{item.name}</h3><strong>{money.format(item.price)}</strong></a>)}</div>
      </section>

      <SiteFooter />
      <CartDrawer open={bagOpen} onClose={() => setBagOpen(false)} />
    </main>
  );
}
