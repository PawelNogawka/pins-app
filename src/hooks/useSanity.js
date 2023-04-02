import { useState, useEffect } from "react";
import { client } from "../lib/client";

export const useSanity = (query) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await client.fetch(query);
        if (!data || data.length == 0) {
          throw new Error("Something went wrong");
        }
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getData();
  }, [query]);

  useEffect(() => {
    return () => {
      setData([]);
      setError(null);
      setIsLoading(false);
    };
  }, []);

  return { data, isLoading, error, setData };
};
