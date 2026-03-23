import { getCategories } from '@/apis/categories';
import { getProducts, Product } from '@/apis/products';

import FilterByCategory from '@/components/products/filter-by-category';
import Pagination from '@/components/products/pagination';
import ProductGrid from '@/components/products/product-grid';
import SortBy from '@/components/products/sort-by';

import { getTotalPages, paginate, PRODUCTS_PER_PAGE } from '@/lib/pagination';

import { SortOrder } from '@/types/api';

export const metadata = {
  title: 'Products — FakeStore',
  description: 'Browse all products with server-side sorting and pagination.',
};

interface PageProps {
  searchParams: Promise<{ sort?: string; page?: string; category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sort = (params.sort === 'desc' ? 'desc' : 'asc') as SortOrder;
  const category = params.category ?? 'all';
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);

  const [productsRes, categoriesRes] = await Promise.all([
    getProducts(sort),
    getCategories(),
  ]);

  const allProducts = productsRes.data ?? [];
  const categories = categoriesRes.data ?? [];

  const filteredProducts: Product[] =
    category === 'all'
      ? allProducts
      : allProducts.filter((p) => p.category === category);

  const totalPages = getTotalPages(filteredProducts.length, PRODUCTS_PER_PAGE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const pageProducts = paginate(filteredProducts, safePage);

  return (
    <div className="pb-6">
      <div className="flex justify-end w-full gap-4">
        <FilterByCategory categories={categories} currentCategory={category} />
        <SortBy currentSort={sort} />
      </div>
      <ProductGrid products={pageProducts} />

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
