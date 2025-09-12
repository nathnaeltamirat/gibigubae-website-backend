import app from "./app.js";
import { PORT } from "./config/env.js";
import { AppDataSource } from "./data-source.js";

app.listen(PORT, async () => {
  try {
    await AppDataSource.initialize();
  } catch (err) {
    console.log(`Error connecting to the Database: ${err}`);
  }
  console.log(`Server is running on ${PORT} at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
