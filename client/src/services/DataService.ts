import axios from "axios";
import { URL } from "../utils/constants";

export class DataService {
  public static async getToken(): Promise<string | null> {
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

  public static async createData<T>(endpoint: string, newData: T | null) {
    const token = await DataService.getToken();

    const { data } = await axios.post(URL + endpoint, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public static async createFormData<T>(endpoint: string, newData: T) {
    const token = await DataService.getToken();
    console.log(newData);

    const formData = this.getFormDataFromObject(newData);

    const { data } = await axios.post(URL + endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }

  public static async deleteData(endpoint: string) {
    const token = await DataService.getToken();
    try {
      const { data } = await axios.delete(URL + endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (e) {
      return;
    }
  }

  public static async updateData<T>(endpoint: string, newData: T | null) {
    const token = await DataService.getToken();

    const { data } = await axios.put(URL + endpoint, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.value;
  }

  public static async updateFormData<T>(endpoint: string, newData: T) {
    const token = await DataService.getToken();

    const formData = this.getFormDataFromObject(newData);

    const { data } = await axios.put(URL + endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return data.value;
  }

  public static async getUserData() {
    const token = await DataService.getToken();

    const { data } = await axios.get(URL + "auth/user-data", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }

  private static getFormDataFromObject<T>(data: T) {
    const formData = new FormData();
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        console.log(key, data[key]);

        formData.append(key, data[key as keyof T] as string);
      }
    }

    return formData;
  }
}
