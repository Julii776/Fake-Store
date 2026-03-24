import { APP_ROUTES } from '@/constants/routes';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug mb-2">
        Everything you need,
        <br className="hidden sm:block" /> nothing you don&apos;t.
      </h1>
      <p className="text-sm text-center text-gray-400 mb-6">
        Browse our full catalog with server-side sorting, filtering,
        <br className="hidden sm:block" /> pagination, and detailed product
        pages.
      </p>
      <Link
        href={APP_ROUTES.PRODUCTS}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded transition-colors"
      >
        Browse All Products
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
