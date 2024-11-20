import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ObjectList } from './components/ObjectList';
import { ObjectDetail } from './components/ObjectDetail';
import { UserList } from './components/UserList';
import { UserProvider } from './contexts/UserContext';
import { ProductList } from './components/ProductList';
import { InfiniteProductList } from './components/InfiniteProductList';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <nav className="bg-gray-800 text-white p-4">
            <Link to="/" className="mr-4">
              Todos
            </Link>
            <Link to="/users" className="mr-4">
              Users
            </Link>
            <Link to="/products" className="mr-4">
              Products
            </Link>
            <Link to="/infinite-products" className="mr-4">
              Infinite Products
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<ObjectList />} />
            <Route path="/object/:id" element={<ObjectDetail />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/infinite-products"
              element={<InfiniteProductList />}
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
