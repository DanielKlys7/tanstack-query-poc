import { useCreateObject, useObjects } from '../hooks/useObjects';
import { Link } from 'react-router-dom';
import { ObjectCounter } from './ObjectCounter';
import { useQueryClient } from '@tanstack/react-query';
import { ObjectService } from '../services/Object';
import { useCallback } from 'react';

export const ObjectList = () => {
  const queryClient = useQueryClient();
  const { data: objects, isLoading, error } = useObjects();
  const { mutate } = useCreateObject();

  const prefetchRef = useCallback(
    (node: HTMLElement | null, objectId: number) => {
      if (node) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              queryClient.prefetchQuery({
                queryKey: ['object', objectId],
                queryFn: () => ObjectService.getObjectById(objectId),
                staleTime: 1000 * 60, // Cache for 1 minute
              });
            }
          },
          { rootMargin: '50px' } // Start prefetch before item is visible
        );

        observer.observe(node);
        return () => observer.disconnect();
      }
    },
    [queryClient]
  );

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-600">Error loading objects</div>;

  return (
    <div className="p-4">
      <ObjectCounter />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Objects</h2>
      </div>

      <button
        onClick={() => {
          mutate({ name: 'XD' });
        }}
      >
        Add object
      </button>

      <div className="grid gap-4">
        {objects?.map((object) => (
          <div
            key={object.id}
            className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            <Link
              ref={(node) => prefetchRef(node, object.id)}
              to={`/object/${object.id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {`${object.id} ${object.name}`}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
