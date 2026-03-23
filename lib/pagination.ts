import { SortOrder } from '@/types/api';

export const PRODUCTS_PER_PAGE = 8;

export function paginate<T>(
  items: T[],
  page: number,
  perPage = PRODUCTS_PER_PAGE,
): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function getTotalPages(
  totalItems: number,
  perPage = PRODUCTS_PER_PAGE,
): number {
  return Math.ceil(totalItems / perPage);
}

export function buildHref(
  page: number,
  sort: SortOrder,
  category: string,
): string {
  const params = new URLSearchParams();
  if (sort !== 'asc') params.set('sort', sort);
  if (category !== 'all') params.set('category', category);
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return `/products${qs ? `?${qs}` : ''}`;
}

export function getPageNumbers(
  current: number,
  total: number,
): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');

  for (
    let p = Math.max(2, current - 1);
    p <= Math.min(total - 1, current + 1);
    p++
  ) {
    pages.push(p);
  }

  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}
