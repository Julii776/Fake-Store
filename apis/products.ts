import { apiClient } from '@/apis/client';

import { ApiResponse } from '@/types/api';

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

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  return apiClient(`/products`);
};
