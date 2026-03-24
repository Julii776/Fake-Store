import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center rounded border border-gray-300 overflow-hidden">
      <button
        onClick={onDecrease}
        className="px-2.5 py-2.5 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-30"
        disabled={quantity <= min}
      >
        <Minus size={12} />
      </button>
      <span className="px-3 py-1.5 text-sm font-semibold text-gray-900 border-x border-gray-300 min-w-[2.5rem] text-center select-none">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="px-2.5 py-2.5 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-30"
        disabled={quantity >= max}
      >
        <Plus size={12} />
      </button>
    </div>
  );
}
