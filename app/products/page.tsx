import { getProducts } from '@/apis/products';

import ProductGrid from '@/components/products/product-grid';
import SortBy from '@/components/products/sort-by';
import { SortOrder } from '@/types/api';

export const metadata = {
  title: 'Products — FakeStore',
  description: 'Browse all products with server-side sorting and pagination.',
};

interface PageProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sort = (params.sort === 'desc' ? 'desc' : 'asc') as SortOrder;

  const productsRes = await getProducts(sort);

  const allProducts = productsRes.data ?? [];

  return (
    <>
      <div className="flex justify-end w-full">
        <SortBy currentSort={sort} />
      </div>
      <ProductGrid products={allProducts} />
    </>
  );
}
