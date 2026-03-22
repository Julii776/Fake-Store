import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 14 }: StarRatingProps) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.round(rating);

        return (
          <Star
            key={i}
            size={size}
            className={
              filled ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
            }
          />
        );
      })}
    </div>
  );
}
