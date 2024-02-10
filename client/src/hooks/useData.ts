import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../utils/constants";

export function useData<T>(endpoint: string): T | null {
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

  return data;
}
