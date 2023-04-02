import { useState, useEffect } from "react";
import { client } from "../lib/client";

export const useDelete = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteDocument = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const transaction = client.transaction().delete(id);
      await transaction.commit();
      setData(transaction.results);
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

  return { data, isLoading, error, deleteDocument };
};
