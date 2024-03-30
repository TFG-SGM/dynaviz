import { connectToMongoDB } from "./connection";

export async function generateNumericId(collection: string) {
  const lastUid = await getLastNumericIdFromDatabase(collection);
  const nextUid = lastUid + 1;
  return nextUid;
}

export async function getLastNumericIdFromDatabase(collection: string) {
  const db = await connectToMongoDB(collection);
  const lastUser = await db.findOne({}, { sort: { uId: -1 } });
  if (lastUser && lastUser.uId) {
    const lastNumericUid = parseInt(lastUser.uId.substring(0, 8), 10);
    return lastNumericUid;
  } else {
    return 0;
  }
}
