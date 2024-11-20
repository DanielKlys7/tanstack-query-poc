import axios from 'axios';

export interface Object {
  id: number;
  name: string;
}

export type ObjectExtended = Object & {
  data: {
    price: string;
  };
};

export const ObjectService = {
  getObject: async (): Promise<Object[]> => {
    const { data } = await axios.get('https://api.restful-api.dev/objects');
    return data;
  },

  getObjectById: async (id: number): Promise<ObjectExtended> => {
    const { data } = await axios.get(
      `https://api.restful-api.dev/objects/${id}`
    );
    return data;
  },

  createObject: async (object: Omit<Object, 'id'>): Promise<Object> => {
    const { data } = await axios.post(
      'https://api.restful-api.dev/objects',
      object
    );
    return data;
  },
};
