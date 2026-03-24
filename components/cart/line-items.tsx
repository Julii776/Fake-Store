import { Trash2 } from 'lucide-react';
import Link from 'next/link';

import { APP_ROUTES } from '@/constants/routes';

import QuantitySelector from './quantity-selector';

interface LineItemsProps {
  items: {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
  }[];
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

const LineItems = ({ items, updateQuantity, removeItem }: LineItemsProps) => {
  return (
    <div className="lg:col-span-2 flex flex-col divide-y divide-gray-100">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 py-5 first:pt-0 last:pb-0">
          <Link href={APP_ROUTES.PRODUCT.getPath(item.id)} className="shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded border border-gray-200 bg-gray-50 flex items-center justify-center p-2 hover:border-gray-400 transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </Link>

          <div className="flex flex-1 flex-col min-w-0">
            <span className="text-[10px] font-semibold uppercase text-gray-400 tracking-wide mb-1">
              {item.category}
            </span>
            <Link
              href={APP_ROUTES.PRODUCT.getPath(item.id)}
              className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 hover:text-amber-600 transition-colors mb-auto"
            >
              {item.title}
            </Link>

            <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
              <QuantitySelector
                quantity={item.quantity}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
              />

              <div className="flex items-center gap-3 ml-auto">
                <span className="text-sm font-bold text-amber-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LineItems;
