import { app } from "./app";

const port = 3001;

app.listen(port, () => {
  console.log(`recipe application is running on port ${port}.`);
});
