import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../utils/constants";
import { Dispatch, SetStateAction } from "react";

export type HookData<T> = [T | null, Dispatch<SetStateAction<T | null>>];

export function useData<T>(endpoint: string): HookData<T> {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    axios
      .get(URL + endpoint)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [endpoint]);

  return [data, setData];
}
