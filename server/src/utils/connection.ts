import { GridFSBucket, MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_URL = "mongodb://localhost:27017/dynaviz";
const connectionSting = process.env.DATABASE_URL ?? DEFAULT_URL;

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

export async function getBucket() {
  try {
    await client.connect();
    const database = client.db();
    const bucket = new GridFSBucket(database);
    return bucket;
  } catch (error) {
    console.error("Fallo al conectar con MongoDB:", error);
    throw error;
  }
}
