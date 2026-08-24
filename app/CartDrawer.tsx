"use client";

import { useEffect, useState } from "react";
import { useCart } from "./cart";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, count, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (items.length) setConfirmed(false);
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, items.length, onClose]);

  if (!open) return null;

  const checkout = () => {
    clearCart();
    setConfirmed(true);
  };

  return <div className="drawer-shell" role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={onClose}>
    <aside className="bag-drawer" onClick={(event) => event.stopPropagation()}>
      <div className="drawer-heading"><h2>Your bag <sup>{count}</sup></h2><button onClick={onClose}>Close ×</button></div>
      {confirmed ? <div className="empty-bag"><p>Your demo order is confirmed.</p><button onClick={onClose}>Continue shopping</button></div> : items.length === 0 ? <div className="empty-bag"><p>Your bag is taking its time.</p><button onClick={onClose}>Continue shopping</button></div> : <>
        <div className="bag-items">{items.map((item) => <div className="bag-item" key={item.id}>
          <a href={`/products/${item.id}`}><img src={item.image} alt={`${item.name} demo watch`} /></a>
          <div><h3><a href={`/products/${item.id}`}>{item.name}</a></h3><p>{item.size}</p><strong>{money.format(item.price)}</strong><div className="bag-quantity"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>+</button></div></div>
          <button onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>×</button>
        </div>)}</div>
        <div className="bag-total"><span>Subtotal</span><strong>{money.format(subtotal)}</strong><button onClick={checkout}>Checkout · Demo</button></div>
      </>}
    </aside>
  </div>;
}
