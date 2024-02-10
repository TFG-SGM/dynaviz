import axios from "axios";
import { URL } from "./constants";
export async function deleteHelper(endpoint: string) {
  await axios.delete(URL + endpoint);
}
