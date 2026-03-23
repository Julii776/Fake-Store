import { getCategories } from '@/apis/categories';
import { getProducts, Product } from '@/apis/products';

import FilterByCategory from '@/components/products/filter-by-category';
import FilterByPrice from '@/components/products/filter-by-price';
import Pagination from '@/components/products/pagination';
import ProductGrid from '@/components/products/product-grid';
import SortBy from '@/components/products/sort-by';

import { PRICE_ABSOLUTE_MAX } from '@/constants/price-filter';

import { getTotalPages, paginate, PRODUCTS_PER_PAGE } from '@/lib/pagination';

import { SortOrder } from '@/types/api';

export const metadata = {
  title: 'Products — FakeStore',
  description: 'Browse all products with server-side sorting and pagination.',
};

interface PageProps {
  searchParams: Promise<{
    sort?: string;
    page?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sort = (params.sort === 'desc' ? 'desc' : 'asc') as SortOrder;
  const category = params.category ?? 'all';
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);
  const minPrice = Math.max(0, parseInt(params.minPrice ?? '0', 10) || 0);
  const maxPrice = Math.min(
    PRICE_ABSOLUTE_MAX,
    parseInt(params.maxPrice ?? String(PRICE_ABSOLUTE_MAX), 10) ||
      PRICE_ABSOLUTE_MAX,
  );

  const [productsRes, categoriesRes] = await Promise.all([
    getProducts(sort),
    getCategories(),
  ]);

  const allProducts = productsRes.data ?? [];
  const categories = categoriesRes.data ?? [];

  const filteredProducts: Product[] = allProducts.filter((p) => {
    const matchesCategory = category === 'all' || p.category === category;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  const totalPages = getTotalPages(filteredProducts.length, PRODUCTS_PER_PAGE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const pageProducts = paginate(filteredProducts, safePage);

  return (
    <div className="pb-6">
      <div className="flex justify-end w-full gap-4 flex-wrap mb-4">
        <FilterByPrice currentMin={minPrice} currentMax={maxPrice} />
        <FilterByCategory categories={categories} currentCategory={category} />
        <SortBy currentSort={sort} />
      </div>

      {pageProducts.length === 0 ? (
        <p className="text-center mt-20">
          No products found.Please try a different search.
        </p>
      ) : (
        <ProductGrid products={pageProducts} />
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          sort={sort}
          category={category}
        />
      )}
    </div>
  );
}
