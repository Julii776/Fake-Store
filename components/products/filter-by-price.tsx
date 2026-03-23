'use client';

import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  ABSOLUTE_MAX,
  ABSOLUTE_MIN,
  PRICE_PRESETS,
} from '@/constants/price-filter';

interface FilterByPriceProps {
  currentMin: number;
  currentMax: number;
}

export default function FilterByPrice({
  currentMin,
  currentMax,
}: FilterByPriceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [localMin, setLocalMin] = useState(currentMin);
  const [localMax, setLocalMax] = useState(currentMax);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<'min' | 'max' | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalMin(currentMin);
    setLocalMax(currentMax);
  }, [currentMin, currentMax]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const pushParams = useCallback(
    (min: number, max: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('minPrice', String(min));
      params.set('maxPrice', String(max));
      params.delete('page');
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const applyPreset = (min: number, max: number) => {
    setLocalMin(min);
    setLocalMax(max);
    pushParams(min, max);
    setOpen(false);
  };

  const applySlider = () => {
    pushParams(localMin, localMax);
    setOpen(false);
  };

  const clearFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalMin(ABSOLUTE_MIN);
    setLocalMax(ABSOLUTE_MAX);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const isFiltered = currentMin > ABSOLUTE_MIN || currentMax < ABSOLUTE_MAX;
  const activePreset = PRICE_PRESETS.find(
    (p) => p.min === currentMin && p.max === currentMax,
  );

  const label = activePreset
    ? activePreset.label
    : isFiltered
      ? `$${currentMin} – ${currentMax >= ABSOLUTE_MAX ? 'Max' : '$' + currentMax}`
      : 'All Prices';

  const minPct =
    ((localMin - ABSOLUTE_MIN) / (ABSOLUTE_MAX - ABSOLUTE_MIN)) * 100;
  const maxPct =
    ((localMax - ABSOLUTE_MIN) / (ABSOLUTE_MAX - ABSOLUTE_MIN)) * 100;

  const pctToValue = (pct: number) => {
    const raw = ABSOLUTE_MIN + (pct / 100) * (ABSOLUTE_MAX - ABSOLUTE_MIN);
    return Math.round(raw / 5) * 5;
  };

  const getPointerPct = (e: React.PointerEvent) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100),
    );
  };

  const handlePointerDown =
    (thumb: 'min' | 'max') => (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragging.current = thumb;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const val = pctToValue(getPointerPct(e));
    if (dragging.current === 'min') {
      setLocalMin(Math.min(val, localMax - 5));
    } else {
      setLocalMax(Math.max(val, localMin + 5));
    }
  };

  const handlePointerUp = () => {
    dragging.current = null;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="border border-gray-400 rounded p-2 flex items-center gap-1.5 text-sm focus:outline-none hover:border-gray-600 transition-colors"
      >
        <SlidersHorizontal size={14} className="text-gray-500" />
        <span className="font-medium text-gray-900">Price:</span>
        <span className="text-gray-700">{label}</span>
        {isFiltered && (
          <span
            role="button"
            onClick={clearFilter}
            className="ml-0.5 text-gray-400 hover:text-gray-700 transition-colors flex items-center"
            title="Clear price filter"
          >
            <X size={13} />
          </span>
        )}
        <ChevronDown size={13} strokeWidth={3} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded shadow-lg w-64 p-4">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {PRICE_PRESETS.map((p) => {
              const active = localMin === p.min && localMax === p.max;
              return (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p.min, p.max)}
                  className={`px-2.5 py-1 rounded text-xs border font-medium transition-all duration-150 ${
                    active
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-white'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-gray-100 mb-4" />

          <div className="mb-3">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Range
            </p>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded">
              ${localMin}
            </span>
            <span className="text-xs text-gray-400">-</span>
            <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded">
              {localMax >= ABSOLUTE_MAX ? 'Max' : `$${localMax}`}
            </span>
          </div>

          <div
            ref={sliderRef}
            className="relative h-5 mb-5 select-none"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded" />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-gray-800 rounded pointer-events-none"
              style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow cursor-grab active:cursor-grabbing touch-none"
              style={{ left: `${minPct}%`, zIndex: 3 }}
              onPointerDown={handlePointerDown('min')}
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow cursor-grab active:cursor-grabbing touch-none"
              style={{ left: `${maxPct}%`, zIndex: 3 }}
              onPointerDown={handlePointerDown('max')}
            />
          </div>

          <button
            onClick={applySlider}
            className="w-full py-1.5 bg-gray-900 text-white text-xs font-medium rounded hover:bg-gray-700 active:scale-95 transition-all"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
