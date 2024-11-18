import axios from 'axios';
import { UserResponse } from '../types/User';

export const User = {
  getUsers: async (): Promise<UserResponse[]> => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    return data;
  }
};