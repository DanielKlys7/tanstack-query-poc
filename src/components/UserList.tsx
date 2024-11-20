import { useUsers } from '../hooks/useUsers';

export const UserList = () => {
  const { data: transformedUsers, isLoading } = useUsers();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users (Transformed)</h2>
      <div className="grid gap-4">
        {transformedUsers?.map((user) => (
          <div key={user.index} className="p-4 bg-gray-100 rounded">
            <p>Index: {user.index}</p>
            <p>Nickname: {user.nickname}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
