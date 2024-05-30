import { PropsWithChildren, createContext, useId, useState } from 'react';
import { CartItem, Product } from '../types';
import { randomUUID } from 'expo-crypto';

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (carItemId: CartItem['id'], value: 1 | -1) => void;
  total: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const updateQuantity = (carItemId: CartItem['id'], value: 1 | -1) => {
    if (value !== 1 && value !== -1) return;

    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === carItemId ? { ...item, quantity: item.quantity + value } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const addItem = (product: Product, size: CartItem['size']) => {
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    const itemExist = items.find((item) => item.product_id === product.id && item.size === size);

    if (itemExist) {
      updateQuantity(itemExist.id, 1);
      return;
    }

    setItems([newCartItem, ...items]);
  };

  const total = items.reduce((total, item) => {
    total += item.quantity * item.product.price;
    return total;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};
