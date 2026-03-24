import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { APP_ROUTES } from '@/constants/routes';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  grandTotal: number;
}

const OrderSummary = ({
  subtotal,
  shipping,
  grandTotal,
}: OrderSummaryProps) => {
  return (
    <div className="lg:sticky lg:top-6">
      <div className="rounded border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Order Summary
        </h2>

        <div className="flex flex-col gap-2.5 text-sm mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          {shipping > 0 && (
            <p className="text-[11px] text-gray-400">
              Add ${(50 - subtotal).toFixed(2)} more for free shipping
            </p>
          )}
        </div>

        <div className="border-t border-gray-200 pt-3 mb-5">
          <div className="flex justify-between text-sm font-bold text-gray-900">
            <span>Total</span>
            <span className="text-amber-600">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white text-sm font-semibold rounded transition-colors cursor-pointer">
          Proceed to Checkout
        </button>

        <Link
          href={APP_ROUTES.PRODUCTS}
          className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft size={11} />
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
