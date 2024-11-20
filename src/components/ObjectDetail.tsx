import { useParams } from 'react-router-dom';
import { useObjectById } from '../hooks/useObjects';

export const ObjectDetail = () => {
  const { id } = useParams();
  const { data: object, isLoading } = useObjectById(Number(id));

  console.log(isLoading, object);

  if (isLoading) return <div>Loading...</div>;
  if (!object) return <div>Object not found</div>;

  return (
    <div>
      <h2>{object.name}</h2>
      <p>{object?.data?.price || 'No price'}</p>
    </div>
  );
};
