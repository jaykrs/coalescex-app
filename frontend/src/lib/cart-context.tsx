"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { api } from "./api-client";
import type { CartItem } from "@/types";

interface CartContextValue {
  items: CartItem[];
  total: number;
  refresh: () => Promise<void>;
  addToCart: (courseId: string) => Promise<void>;
  removeFromCart: (courseId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const { data } = await api.get("/cart");
      setItems(data.items);
      setTotal(data.total);
    } catch {
      setItems([]);
      setTotal(0);
    }
  }, []);

  const addToCart = useCallback(
    async (courseId: string) => {
      await api.post("/cart", { courseId });
      await refresh();
    },
    [refresh]
  );

  const removeFromCart = useCallback(
    async (courseId: string) => {
      await api.delete(`/cart/${courseId}`);
      await refresh();
    },
    [refresh]
  );

  return (
    <CartContext.Provider value={{ items, total, refresh, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
