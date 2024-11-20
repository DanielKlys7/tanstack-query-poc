import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ObjectService,
  type Object,
  type ObjectExtended,
} from '../services/Object';

export const useObjects = () => {
  return useQuery({
    queryKey: ['objects'],
    queryFn: ObjectService.getObject,
  });
};

export const useObjectById = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['object', id],
    queryFn: () => ObjectService.getObjectById(id),
    initialData: () => {
      const objects = queryClient.getQueryData<ObjectExtended[]>(['objects']);
      const object = objects?.find((object) => Number(object.id) === id);
      return object;
    },
    initialDataUpdatedAt: () => {
      return queryClient.getQueryState(['objects'])?.dataUpdatedAt;
    },
    staleTime: 1000 * 60,
    enabled: id !== undefined,
  });
};

export const useCreateObject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ObjectService.createObject,
    onMutate: async (newObject) => {
      await queryClient.cancelQueries({ queryKey: ['objects'] });
      const previousTodos = queryClient.getQueryData(['objects']);
      queryClient.setQueryData(['objects'], (old: Object[]) => [
        ...old,
        newObject,
      ]);
      return { previousTodos };
    },
    onError: (err, object, context) => {
      queryClient.setQueryData(['objects'], context?.previousTodos);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['objects'] })
    // },
  });
};
