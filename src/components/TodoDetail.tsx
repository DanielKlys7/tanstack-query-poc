import { useParams } from 'react-router-dom';
import { useTodoById, useUpdateTodo } from '../hooks/useTodos';

export const TodoDetail = () => {
  const { id } = useParams();
  const { data: todo, isLoading } = useTodoById(Number(id));
  const updateTodo = useUpdateTodo();

  if (isLoading) return <div>Loading...</div>;
  if (!todo) return <div>Todo not found</div>;

  const handleToggle = () => {
    updateTodo.mutate({
      ...todo,
      completed: !todo.completed
    });
  };

  return (
    <div>
      <h2>{todo.title}</h2>
      <button onClick={handleToggle}>
        {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </div>
  );
};