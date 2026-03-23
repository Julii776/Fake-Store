import { getProducts } from '@/apis/products';

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

  const productsRes = await getProducts(sort);

  const allProducts = productsRes.data ?? [];

  const totalPages = getTotalPages(allProducts.length, PRODUCTS_PER_PAGE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const pageProducts = paginate(allProducts, safePage);

  return (
    <>
      <div className="flex justify-end w-full">
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
    </>
  );
}
