import { useQuery } from '@tanstack/react-query';
import { User } from '../services/user';
import { TransformedUser, UserResponse } from '../types/User';

const transformUser = (user: UserResponse): TransformedUser => ({
  index: user.id,
  nickname: user.name.toUpperCase()
});

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: User.getUsers,
    select: (users) => users.map(transformUser),
    // Original data is still accessible via `useQuery().data`
  });
};