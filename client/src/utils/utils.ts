import axios from "axios";
import { URL } from "./constants";
import { Dispatch, SetStateAction } from "react";

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

export function updateData<T extends { _id: string }>(
  prevState: T[] | null,
  updatedData: T
) {
  if (!prevState) return [updatedData];

  const index = prevState.findIndex((user: T) => user._id === updatedData._id);
  const updatedState = [...prevState];
  updatedState[index] = updatedData;
  return updatedState;
}
