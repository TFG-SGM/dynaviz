import { MongoClient } from "mongodb";

const DEFAULT_URL = "mongodb://localhost:27017/dipamia";
const connectionSting = process.env.DATABASE_URL ?? DEFAULT_URL;

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
