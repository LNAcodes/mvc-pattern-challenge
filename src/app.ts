import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postRoutes from "./routes/postRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { logger } from "./middleware/logger.js";
import { ensureLogFile } from "./middleware/logger.js";
import { connectDB, closeDB } from "./db/database.js";

const LOG_FILE = path.join(process.cwd(), "logs", "logs.txt");

const app = express();
// 1. configure app
app.set("view engine", "njk");
// 2. body-parser middleware - must come before routes!
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
const cssDir = path.join(projectRoot, "src", "css");

// 3. nunjucks configuration
nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
  watch: true,
});

//4. static files
app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));

// 5. Logger middleware
app.use(logger);

// 6. Routes
app.use("/", postRoutes);
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  await ensureLogFile(LOG_FILE);
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();

// both are handler functions that say "server get ready zu be closed, but first disconnect the db properly"
process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});
