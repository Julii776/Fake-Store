import Link from 'next/link';

import type { Product } from '@/apis/products';

import { APP_ROUTES } from '@/constants/routes';

import StarRating from './star-rating';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={APP_ROUTES.PRODUCT.getPath(product.id)}
      className="group block h-full rounded-xl focus-visible:ring-2 focus-visible:ring-amber-400"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-400 bg-white transition hover:-translate-y-1 hover:shadow-md">
        <div className="flex h-52 items-center justify-center bg-gray-50 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="max-h-40 object-contain transition group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <span className="mb-2 text-xs font-semibold uppercase text-gray-400">
            {product.category}
          </span>

          <h2 className="mb-3 line-clamp-2 text-sm font-medium text-gray-900">
            {product.title}
          </h2>

          <div className="mb-3 mt-auto flex items-center gap-1.5">
            <StarRating rating={product.rating.rate} />
            <span className="text-xs text-gray-500">
              {product.rating.rate.toFixed(1)} ({product.rating.count})
            </span>
          </div>

          <p className="text-lg font-bold text-amber-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </article>
    </Link>
  );
}
