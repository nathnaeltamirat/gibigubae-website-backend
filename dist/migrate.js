import { AppDataSource } from "./data-source.js";
(async () => {
    try {
        await AppDataSource.initialize();
        const pendingMigrations = await AppDataSource.showMigrations();
        if (pendingMigrations) {
            console.log("🚀 Running pending migrations...");
            await AppDataSource.runMigrations();
            console.log("✅ Migrations applied successfully!");
        }
        else {
            console.log("⚡ No pending migrations.");
        }
        process.exit(0);
    }
    catch (err) {
        console.error("❌ Migration failed:", err);
        process.exit(1);
    }
})();
//# sourceMappingURL=migrate.js.map