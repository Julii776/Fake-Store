import { ApiResponse } from '@/types/api';

const BASE_URL = 'https://fakestoreapi.com';

const getErrorMessage = (status: number): string => {
  if (status === 404) return 'The requested resource was not found.';
  if (status === 500) return 'Server error. Please try again later.';
  if (status === 429) return 'Too many requests. Please slow down.';
  if (status >= 400 && status < 500)
    return 'Bad request. Please check your input.';

  return 'An unexpected error occurred.';
};

export const apiClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: getErrorMessage(response.status),
          status: response.status,
        },
      };
    }

    const data: T = await response.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: {
        message:
          err instanceof Error
            ? err.message
            : 'Network error. Please check your connection.',
      },
    };
  }
};
