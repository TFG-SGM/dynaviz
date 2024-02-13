import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { URL } from "../utils/constants";

type HookData<T> = [T | null, Dispatch<SetStateAction<T | null>>];

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
