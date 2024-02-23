import axios from "axios";
import { URL } from "./constants";
import { Dispatch, SetStateAction } from "react";

// Function to get authentication token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

export async function login(email: string, password: string) {
  const { data } = await axios.post(URL + "login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return data;
}

export async function getData(endpoint: string) {
  const token = getToken();

  const { data } = await axios.get(URL + endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}

export async function createData<T>(
  endpoint: string,
  newData: T | null,
  setData: Dispatch<SetStateAction<T[] | null>>
) {
  try {
    const token = getToken();
    const { data } = await axios.post(URL + endpoint, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData((prevState) => [...(prevState || []), data]);
  } catch (error) {
    console.error("Create data error:", error);
  }
}

export async function deleteData<T extends { _id: string }>(
  endpoint: string,
  setData: Dispatch<SetStateAction<T[] | null>>
) {
  try {
    const token = getToken();
    const { data } = await axios.delete(URL + endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData((prevState) =>
      prevState
        ? prevState.filter((dataDict) => dataDict._id !== data)
        : prevState
    );
  } catch (error) {
    console.error("Delete data error:", error);
  }
}

export async function updateData<T>(
  endpoint: string,
  newData: T | null,
  setData: Dispatch<SetStateAction<T[] | null>>
) {
  try {
    const token = getToken();
    const { data } = await axios.put(URL + endpoint, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData((prevState) => updateDataHelper(prevState, data));
  } catch (error) {
    console.error("Update data error:", error);
  }
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
