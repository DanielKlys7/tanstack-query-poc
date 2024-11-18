import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { TodoList } from './components/TodoList';
import { TodoDetail } from './components/TodoDetail';
import { UserList } from './components/UserList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <nav className="bg-gray-800 text-white p-4">
          <Link to="/" className="mr-4">Todos</Link>
          <Link to="/users" className="mr-4">Users</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;