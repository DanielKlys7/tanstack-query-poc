import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ProductService } from '../services/Product';

export const useProducts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => ProductService.getProducts((page - 1) * limit, limit),
    placeholderData: keepPreviousData,
  });
};
