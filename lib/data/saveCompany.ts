import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
if (!uri) {
  throw new Error("Please add your MongoDB URI to the environment variables");
}

const client = new MongoClient(uri);
let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise() {
  if (!clientPromise) {
    clientPromise = client.connect().then(() => client);
  }
  return clientPromise;
}

export async function saveCompany(symbol: string): Promise<void> {
  if (!symbol) {
    throw new Error("Symbol is required");
  }
  const connectedClient = await getClientPromise();
  const db = connectedClient.db("myfinance");
  const collection = db.collection("companies");
  await collection.insertOne({
    symbol,
    createdAt: new Date(),
  });
}
