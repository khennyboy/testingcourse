import type { PropsWithChildren } from "react";
import { createContext, useCallback, useMemo, useState } from "react";
import type { Product } from "../entities";


export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  getItem: (product: Product) => CartItem | null;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  items: CartItem[];
  itemCount: number;
};
export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  const getItem = useCallback(
    (product: Product) => {
      return items.find((item) => item.product.id === product.id) || null;
    },
    [items]
  );

  const addToCart = useCallback((product: Product) => {
    const item = items.find((i) => i.product.id === product.id);
    if (item) {
      // If the product is already in the cart, update its quantity
      setItems(
        items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setItems([...items, { product, quantity: 1 }]);
    }
  }, [items]);

  const removeFromCart = useCallback((product: Product) => {
    const item = items.find((i) => i.product.id === product.id);
    if (!item) return;

    if (item.quantity > 1) {
      setItems(
        items.map((i) =>
          item.product.id === product.id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      );
    } else setItems(items.filter((i) => i.product.id !== product.id));
  }, [items]);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, itemCount, getItem, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
