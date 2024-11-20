import { useUserContext } from '../contexts/UserContext';

export const ObjectCounter = () => {
  const { objects, isLoading } = useUserContext();

  if (isLoading) return <div>Loading...</div>;

  return <div className="text-red-400 text-4xl">{objects.length}</div>;
};
