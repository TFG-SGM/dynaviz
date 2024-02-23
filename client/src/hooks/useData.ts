import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { getData } from "../utils/utils";

export type HookData<T> = [T | null, Dispatch<SetStateAction<T | null>>];

export function useData<T>(endpoint: string): HookData<T> {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(endpoint);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [endpoint]);

  return [data, setData];
}
