import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="py-28">
      <Loader2 className="h-6 w-6 animate-spin text-gray-500 mx-auto" />
    </div>
  );
}
