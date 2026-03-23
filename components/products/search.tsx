'use client';

import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface SearchProductsProps {
  currentQuery: string;
}

export default function SearchProducts({ currentQuery }: SearchProductsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(currentQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  const pushQuery = (q: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (q.trim()) {
      params.set('q', q.trim());
    } else {
      params.delete('q');
    }
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setValue(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => pushQuery(q), 400);
  };

  const handleClear = () => {
    setValue('');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    pushQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') handleClear();
  };

  return (
    <div className="relative flex items-center border border-gray-400 rounded p-2 gap-2 focus-within:border-gray-700 transition-colors">
      <Search size={14} className="text-gray-400 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search"
        className="text-sm text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none w-40"
      />
      {value && (
        <button
          onClick={handleClear}
          className="text-gray-400 hover:text-gray-700 transition-colors flex items-center shrink-0"
          title="Clear search"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
