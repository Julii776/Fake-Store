import { getProducts } from '@/apis/products';

import ProductGrid from '@/components/products/product-grid';

export const metadata = {
  title: 'Products — FakeStore',
  description: 'Browse all products with server-side sorting and pagination.',
};

export default async function ProductsPage() {
  const productsRes = await getProducts();

  const allProducts = productsRes.data ?? [];

  return <ProductGrid products={allProducts} />;
}
