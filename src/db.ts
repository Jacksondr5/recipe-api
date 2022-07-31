import mongoose, { Schema } from "mongoose";

export function connectToDb() {
  const url = process.env.DB_URI;

  if (!url || url === "undefined") {
    throw new Error("URL is undefined");
  }

  mongoose.connect(url);
  const db = mongoose.connection;
  db.on("error", (error) => {
    console.log(error);
  });
  db.once("connected", () => {
    console.log("Database Connected");
  });
}
