'use client';

import { Trash2 } from 'lucide-react';

import EmptyCart from '@/components/cart/empty-cart';
import LineItems from '@/components/cart/line-items';
import OrderSummary from '@/components/cart/order-summary';

import { useCartStore } from '@/hooks/use-cart-store';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCartStore();

  const total = totalPrice();
  const subtotal = total;
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const grandTotal = subtotal + shipping;

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={13} />
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <LineItems
          items={items}
          removeItem={removeItem}
          updateQuantity={updateQuantity}
        />
        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  );
}
