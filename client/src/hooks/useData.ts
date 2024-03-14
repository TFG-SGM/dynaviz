import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { DataService } from "../services/DataService";
import { AxiosError } from "axios";

export type HookData<T> = [
  T | null,
  Dispatch<SetStateAction<T | null>>,
  string | null
];

export function useData<T>(endpoint: string): HookData<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await DataService.getData(endpoint);
        setData(result);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError && error.response)
          setError(error.response.data.error);
      }
    };

    fetchData();
  }, [endpoint]);

  return [data, setData, error];
}
