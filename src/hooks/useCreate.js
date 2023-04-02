import { useState, useEffect } from "react";
import { client } from "../lib/client";

export const useCreate = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addDocument = async (query) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await client.create(query);
      if(!data || data.length == 0){
        throw new Error('something went wrong')
      }
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    return () => {
      setData([]);
      setError(null);
      setIsLoading(false);
    };
  }, []);

  return { data, isLoading, error, addDocument };
};