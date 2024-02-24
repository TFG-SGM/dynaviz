import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { DataService } from "../services/DataService";

export type HookData<T> = [T | null, Dispatch<SetStateAction<T | null>>];

export function useData<T>(endpoint: string): HookData<T> {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await DataService.getData(endpoint);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [endpoint]);

  return [data, setData];
}
