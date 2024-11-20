import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}

export const ProductService = {
  getProducts: async (offset: number, limit: number): Promise<Product[]> => {
    const { data } = await axios.get(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
    );
    return data;
  },
};
