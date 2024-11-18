import axios from 'axios';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const TodoService = {
  getTodos: async (): Promise<Todo[]> => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return data;
  },

  getTodoById: async (id: number): Promise<Todo> => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return data;
  },

  createTodo: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', todo);
    return data;
  },

  updateTodo: async (todo: Todo): Promise<Todo> => {
    const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
    return data;
  }
};