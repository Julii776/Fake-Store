'use client';

export default function ErrorPage({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div text-center className="py-20 text-center">
      <h2>Something went wrong!</h2>
      <button
        className="mt-3 py-3 px-6 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white text-sm font-semibold rounded transition-colors cursor-pointer"
        onClick={() => unstable_retry()}
      >
        Try again
      </button>
    </div>
  );
}
