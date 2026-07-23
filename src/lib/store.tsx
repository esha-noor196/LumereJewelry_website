import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

type CartItem = { id: string; qty: number; size?: string; color?: string };
type StoreCtx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, opts?: { size?: string; color?: string; qty?: number }) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  cartCount: number;
  cartTotal: number;
  cartProducts: Array<CartItem & { product: Product }>;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("lumiere:cart");
      const w = localStorage.getItem("lumiere:wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("lumiere:cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("lumiere:wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart: StoreCtx["addToCart"] = (id, opts) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + (opts?.qty ?? 1) } : i));
      }
      return [...prev, { id, qty: opts?.qty ?? 1, size: opts?.size, color: opts?.color }];
    });
  };
  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const setQty = (id: string, qty: number) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const toggleWishlist = (id: string) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const cartProducts = cart
    .map((c) => {
      const product = products.find((p) => p.id === c.id);
      return product ? { ...c, product } : null;
    })
    .filter(Boolean) as Array<CartItem & { product: Product }>;

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartProducts.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <Ctx.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        setQty,
        toggleWishlist,
        cartCount,
        cartTotal,
        cartProducts,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
