import { MongoClient } from "mongodb";
import { MONGO_URL } from "./constants";

const connectionSting = MONGO_URL;

console.log(connectionSting);
const client = new MongoClient(connectionSting);

export async function connectToMongoDB(collection: string) {
  try {
    await client.connect();
    const database = client.db();
    return database.collection(collection);
  } catch (error) {
    console.error("Fallo al conectar con MongoDB:", error);
    throw error;
  }
}

export async function getMongoDB() {
  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error("Fallo al conectar con MongoDB:", error);
    throw error;
  }
}
