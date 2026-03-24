const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-28">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Your cart is empty
      </h2>
      <p className="max-w-xs text-sm text-gray-400">
        Looks like you haven&apos;t added anything yet. Browse products and find
        something you like.
      </p>
    </div>
  );
};

export default EmptyCart;
