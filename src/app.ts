import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postRoutes from "./routes/postRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import { logger } from "./middleware/logger.js";
import { ensureLogFile } from "./middleware/logger.js";

const LOG_FILE = path.join(process.cwd(), "logs", "logs.txt");

const app = express();
app.set("view engine", "njk");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
const cssDir = path.join(projectRoot, "src", "css");

nunjucks.configure(path.join(projectRoot, "views"), {
  autoescape: true,
  express: app,
});
app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));
app.use(logger);
app.use("/", postRoutes);
app.use("/api", apiRoutes);

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  await ensureLogFile(LOG_FILE);
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
