import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductService } from '../services/Product';

export const useInfiniteProducts = (limit: number) => {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['infiniteProducts'],
    queryFn: ({ pageParam = 0 }) =>
      ProductService.getProducts(pageParam, limit),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === limit ? allPages.length * limit : undefined,
  });
};
