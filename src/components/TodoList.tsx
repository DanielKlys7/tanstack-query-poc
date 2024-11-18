import { useTodos, useCreateTodo } from '../hooks/useTodos';
import { Link } from 'react-router-dom';

export const TodoList = () => {
  const { data: todos, isLoading, error } = useTodos();
  const createTodo = useCreateTodo();

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading todos</div>;

  const handleAddTodo = () => {
    createTodo.mutate({
      title: 'New Todo',
      completed: false
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Todos</h2>
        <button 
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Todo
        </button>
      </div>
      
      <div className="grid gap-4">
        {todos?.map(todo => (
          <div 
            key={todo.id} 
            className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            <Link 
              to={`/todo/${todo.id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {todo.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};