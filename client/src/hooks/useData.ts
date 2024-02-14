import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../utils/constants";
import { HookData } from "../utils/types";

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
