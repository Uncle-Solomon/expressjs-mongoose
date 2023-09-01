import mongoose from "mongoose";

// import dotenv from "dotenv";

// dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error("Please add the MONGODB_URL environment variable");
}

mongoose.connect(process.env.MONGODB_URL);

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error")
);
database.once("open", () => console.log("✅ mongodb connected successfully"));

mongoose.Promise = Promise;
