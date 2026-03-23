'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { SortOrder } from '@/types/api';

interface SortByProps {
  currentSort: SortOrder;
}

export default function SortBy({ currentSort }: SortByProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="border border-gray-400 rounded p-2 flex items-center">
      <label className="mr-2 text-sm font-medium text-gray-900">Sort by:</label>
      <select
        value={currentSort}
        onChange={handleChange}
        className="rounded border-gray-400 text-sm focus:outline-none"
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
}
