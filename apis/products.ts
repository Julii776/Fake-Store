import { apiClient } from '@/apis/client';

import { ApiResponse, SortOrder } from '@/types/api';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getProducts = async (
  sort?: SortOrder,
): Promise<ApiResponse<Product[]>> => {
  const query = sort ? `?sort=${sort}` : '';
  return apiClient(`/products${query}`);
};

export async function getProductById(
  id: number,
): Promise<ApiResponse<Product>> {
  return apiClient<Product>(`/products/${id}`);
}
