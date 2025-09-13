import app from "./app.js";
import { PORT, NODE_ENV } from "./config/env.js";
import { AppDataSource } from "./data-source.js";
import { seedDepartments } from "./seed.js";

const PROD_URL = "https://gibigubae-website-backend.onrender.com/";

app.listen(PORT, async () => {
  try {
    await AppDataSource.initialize();
    console.log(`✅ Database connected successfully.`);
    await seedDepartments();
    // Run pending migrations automatically
    if (await AppDataSource.showMigrations()) {
      console.log(`🚀 Running pending migrations...`);
      await AppDataSource.runMigrations();
      console.log(`✅ Migrations applied successfully!`);
    } else {
      console.log(`⚡ No pending migrations.`);
    }

  } catch (err) {
    console.error(`❌ Error connecting to the database:`, err);
    process.exit(1);
  }

  if (NODE_ENV === "production") {
    console.log(`🚀 Server is running in production mode at ${PROD_URL}`);
    console.log(`🔗 Swagger UI available at ${PROD_URL}api-docs`);
  } else {
    console.log(`🚀 Server is running in development mode at http://localhost:${PORT}`);
    console.log(`🔗 Swagger UI available at http://localhost:${PORT}/api-docs`);
  }
});
