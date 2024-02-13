import axios from "axios";
import { URL } from "./constants";

export async function deleteHelper(endpoint, setUsers) {
  const { data } = await axios.delete(URL + endpoint);
  console.log(data);
}
