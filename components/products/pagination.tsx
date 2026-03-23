import Link from 'next/link';

import { buildHref, getPageNumbers } from '@/lib/pagination';

import type { SortOrder } from '@/types/api';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  sort: SortOrder;
  category: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  sort,
  category,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  const baseBtn =
    'flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium border transition-all duration-150';

  const normalBtn =
    'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50';

  const activeBtn = 'bg-amber-100 border-amber-400 text-amber-600 shadow-sm';

  const disabledBtn =
    'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50';

  return (
    <nav className="flex items-center justify-center gap-1.5 pt-4 pb-2">
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1, sort, category)}
          className={`${baseBtn} ${normalBtn}`}
        >
          ‹
        </Link>
      ) : (
        <span className={`${baseBtn} ${disabledBtn}`}>‹</span>
      )}

      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
          >
            …
          </span>
        ) : p === currentPage ? (
          <span key={p} className={`${baseBtn} ${activeBtn}`}>
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p, sort, category)}
            className={`${baseBtn} ${normalBtn}`}
          >
            {p}
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1, sort, category)}
          className={`${baseBtn} ${normalBtn}`}
        >
          ›
        </Link>
      ) : (
        <span className={`${baseBtn} ${disabledBtn}`}>›</span>
      )}
    </nav>
  );
}
