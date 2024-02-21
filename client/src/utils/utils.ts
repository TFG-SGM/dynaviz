import axios from "axios";
import { URL } from "./constants";
import { Dispatch, SetStateAction } from "react";

export async function createData<T>(
  endpoint: string,
  newData: T | null,
  setData: Dispatch<SetStateAction<T[] | null>>
) {
  console.log(endpoint);
  const { data } = await axios.post(URL + endpoint, newData);
  setData((prevState) => [...(prevState || []), data]);
}

export async function deleteData<T extends { _id: string }>(
  endpoint: string,
  setData: Dispatch<SetStateAction<T[] | null>>
) {
  const { data } = await axios.delete(URL + endpoint);
  setData((prevState) =>
    prevState
      ? prevState.filter((dataDict) => dataDict._id !== data)
      : prevState
  );
}

export async function updateData<T>(
  endpoint: string,
  newData: T | null,
  setData: Dispatch<SetStateAction<T[] | null>>
) {
  const { data } = await axios.put(URL + endpoint, newData);
  setData((prevState) => updateDataHelper(prevState, data));
}

export function updateDataHelper<T extends { _id: string }>(
  prevState: T[] | null,
  updatedData: T
) {
  if (!prevState) return [updatedData];

  const index = prevState.findIndex((user: T) => user._id === updatedData._id);
  const updatedState = [...prevState];
  updatedState[index] = updatedData;
  return updatedState;
}
