'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { APP_ROUTES } from '@/constants/routes';

import { useCartStore } from '@/hooks/use-cart-store';

export default function CartIcon() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <Link href={APP_ROUTES.CART} className="relative inline-flex">
      <ShoppingCart size={20} className="text-gray-500" />

      {totalItems > 0 && (
        <span className="absolute -top-3 -right-3 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-bold px-1 leading-none">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
}
