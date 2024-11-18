import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TodoService, type Todo } from '../services/todo'

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: TodoService.getTodos
  });
};

export const useTodoById = (id: number) => {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => TodoService.getTodoById(id)
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: TodoService.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: TodoService.updateTodo,
    onSuccess: (todo) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo', todo.id] });
    }
  });
};