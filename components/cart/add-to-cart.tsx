'use client';

import { Check, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { Product } from '@/apis/products';

import { useCartStore } from '@/hooks/use-cart-store';

import QuantitySelector from './quantity-selector';

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => Math.min(99, q + 1));

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuantity(1);
    }, 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <QuantitySelector
        quantity={quantity}
        onIncrease={increment}
        onDecrease={decrement}
        min={1}
        max={99}
      />

      <button
        onClick={handleAdd}
        className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-7 py-2.5 rounded text-sm font-semibold transition-all duration-200 cursor-pointer
          ${
            added
              ? 'bg-green-600 hover:bg-green-600 text-white'
              : 'bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white'
          }`}
      >
        {added ? (
          <>
            <Check size={15} />
            Added!
          </>
        ) : (
          <>
            <ShoppingCart size={15} />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
