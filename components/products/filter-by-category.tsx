'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface FilterByCategoryProps {
  currentCategory: string;
  categories: string[];
}

export default function FilterByCategory({
  currentCategory,
  categories,
}: FilterByCategoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', newCategory);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="border border-gray-400 rounded p-2 flex items-center">
      <label className="mr-2 text-sm font-medium text-gray-900">
        Category:
      </label>
      <select
        value={currentCategory}
        onChange={handleChange}
        className="rounded border-gray-400 text-sm focus:outline-none"
      >
        <option value="all">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
