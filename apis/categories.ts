import { ApiResponse } from '@/types/api';

import { apiClient } from './client';

export async function getCategories(): Promise<ApiResponse<string[]>> {
  return apiClient<string[]>('/products/categories');
}
