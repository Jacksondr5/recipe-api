import { app } from "./app";
import * as dotenv from "dotenv";

const port = 3000;

dotenv.config();
const url = process.env.DB_URI;
console.log(url);

app.listen(port, () => {
  console.log(`recipe application is running on port ${port}.`);
});
