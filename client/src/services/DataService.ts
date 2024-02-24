import axios from "axios";
import { URL } from "../utils/constants";
import { Dispatch, SetStateAction } from "react";

export class DataService {
  private static async getToken(): Promise<string | null> {
    return localStorage.getItem("token");
  }

  public static async login(email: string, password: string) {
    const { data } = await axios.post(URL + "auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    return data;
  }

  public static async logout() {
    localStorage.clear();
  }

  public static async getData(endpoint: string) {
    const token = await DataService.getToken();

    const { data } = await axios.get(URL + endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }

  public static async createData<T>(
    endpoint: string,
    newData: T | null,
    setData: Dispatch<SetStateAction<T[] | null>>
  ) {
    try {
      const token = await DataService.getToken();
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

  public static async deleteData<T extends { _id: string }>(
    endpoint: string,
    setData: Dispatch<SetStateAction<T[] | null>>
  ) {
    try {
      const token = await DataService.getToken();
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

  public static async updateData<T>(
    endpoint: string,
    newData: T | null,
    setData: Dispatch<SetStateAction<T[] | null>>
  ) {
    try {
      const token = await DataService.getToken();
      const { data } = await axios.put(URL + endpoint, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevState) => DataService.updateDataHelper(prevState, data));
    } catch (error) {
      console.error("Update data error:", error);
    }
  }

  private static updateDataHelper<T extends { _id: string }>(
    prevState: T[] | null,
    updatedData: T
  ) {
    if (!prevState) return [updatedData];

    const index = prevState.findIndex(
      (user: T) => user._id === updatedData._id
    );
    const updatedState = [...prevState];
    updatedState[index] = updatedData;
    return updatedState;
  }
}
