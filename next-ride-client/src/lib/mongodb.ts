import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

console.log("check weather the page is working or not")

// ✅ Extend globalThis to define `_mongoClientPromise`
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;

}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
