"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
};

export type AddCartItem = Omit<CartItem, "quantity">;

const CART_KEY = "aevum-demo-cart";
const CART_EVENT = "aevum-cart-change";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.filter((item) => item && typeof item.id === "string" && typeof item.price === "number" && typeof item.quantity === "number");
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent<CartItem[]>(CART_EVENT, { detail: items }));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
    const syncLocal = (event: Event) => setItems((event as CustomEvent<CartItem[]>).detail || readCart());
    const syncStorage = () => setItems(readCart());
    window.addEventListener(CART_EVENT, syncLocal);
    window.addEventListener("storage", syncStorage);
    return () => {
      window.removeEventListener(CART_EVENT, syncLocal);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  const update = useCallback((change: (current: CartItem[]) => CartItem[]) => {
    const next = change(readCart());
    writeCart(next);
    setItems(next);
  }, []);

  const addItem = useCallback((product: AddCartItem) => update((current) => {
    const existing = current.find((item) => item.id === product.id);
    return existing
      ? current.map((item) => item.id === product.id ? { ...item, ...product, quantity: item.quantity + 1 } : item)
      : [...current, { ...product, quantity: 1 }];
  }), [update]);

  const updateQuantity = useCallback((id: string, quantity: number) => update((current) =>
    quantity <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item)
  ), [update]);

  const removeItem = useCallback((id: string) => update((current) => current.filter((item) => item.id !== id)), [update]);
  const clearCart = useCallback(() => update(() => []), [update]);
  const count = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);

  return { items, count, subtotal, addItem, updateQuantity, removeItem, clearCart };
}
