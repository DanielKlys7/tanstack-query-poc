import { useEffect, useRef } from 'react';
import { useInfiniteProducts } from '../hooks/useInifiniteProducts';

export const InfiniteProductList = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteProducts(10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Infinite Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages.map((group, i) =>
          group.map((product) => (
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
          ))
        )}
      </div>

      <div
        ref={loadMoreRef}
        className="h-10 flex items-center justify-center mt-6"
      >
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  );
};
