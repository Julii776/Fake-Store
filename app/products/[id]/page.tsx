import {
  ArrowLeft,
  RefreshCw,
  Shield,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProductById } from '@/apis/products';

import StarRating from '@/components/products/star-rating';
import { APP_ROUTES } from '@/constants/routes';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const { data } = await getProductById(Number(id));
  return {
    title: data ? `${data.title} — FakeStore` : 'Product — FakeStore',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) return notFound();

  const { data: product } = await getProductById(productId);

  if (!product) return notFound();

  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link
            href={APP_ROUTES.PRODUCTS}
            className="flex items-center gap-1 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft size={12} />
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-500 truncate max-w-xs">
            {product.title.length > 52
              ? product.title.slice(0, 52) + '…'
              : product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="rounded border border-gray-400 bg-gray-50 flex items-center justify-center p-12 min-h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 max-w-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span className="mb-3 text-xs font-semibold uppercase text-gray-400 tracking-wide">
              {product.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug tracking-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-1.5 mb-5">
              <StarRating rating={product.rating.rate} />
              <span className="text-xs text-gray-500">
                {product.rating.rate.toFixed(1)} ({product.rating.count}{' '}
                reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-amber-600 mb-5">
              ${product.price.toFixed(2)}
            </p>

            <div className="border-t border-gray-200 mb-5" />

            <p className="text-sm text-gray-500 leading-relaxed mb-7">
              {product.description}
            </p>

            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-semibold text-sm rounded transition-colors cursor-pointer mb-6">
              <ShoppingCart size={16} />
              Add to Cart
            </button>

            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: Truck,
                  label: 'Free shipping',
                  sub: 'On orders over $50',
                },
                {
                  icon: RefreshCw,
                  label: 'Easy returns',
                  sub: '30-day policy',
                },
                {
                  icon: Shield,
                  label: 'Secure checkout',
                  sub: 'SSL encrypted',
                },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1.5 rounded border border-gray-200 bg-gray-50 p-3"
                >
                  <Icon size={15} className="text-gray-400" />
                  <span className="text-xs font-semibold text-gray-600">
                    {label}
                  </span>
                  <span className="text-[10px] text-gray-400 leading-tight">
                    {sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
