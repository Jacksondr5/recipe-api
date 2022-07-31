import { app } from "./app";
import { connectToDb } from "./db";

const port = 3001;

app.listen(port, () => {
  connectToDb();
  console.log(`recipe application is running on port ${port}.`);
});
