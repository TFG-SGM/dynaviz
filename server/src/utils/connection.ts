import { GridFSBucket, MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { MONGO_URL } from "./constants";

dotenv.config();

const connectionSting = MONGO_URL;

console.log(connectionSting);
const client = new MongoClient(connectionSting);

export async function connectToMongoDB(collection?: string) {
  try {
    await client.connect();
    const database = client.db();
    if (collection) return database.collection(collection);
    else return database;
  } catch (error) {
    console.error("Fallo al conectar con MongoDB:", error);
    throw error;
  }
}
