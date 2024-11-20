import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

export const ProductList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const {
    data: products,
    isLoading,
    isPlaceholderData,
  } = useProducts(page, limit);

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-600 mt-2">${product.price}</p>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={isPlaceholderData || (products?.length ?? 0) < limit}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
