import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { query } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV !== "production";
const distPath = path.join(__dirname, "..", "dist");
const hasDist = fs.existsSync(distPath);

// Log para debug en Railway
console.log("=== Server Startup ===");
console.log("__dirname:", __dirname);
console.log("distPath:", distPath);
console.log("hasDist:", hasDist);
console.log("NODE_ENV:", process.env.NODE_ENV);
if (hasDist) {
  const distContents = fs.readdirSync(distPath);
  console.log("dist contents:", distContents.slice(0, 10));
}

// En desarrollo permitir cualquier origen (para poder abrir desde el móvil en la red local)
app.use(
  cors({
    origin: isDev
      ? true
      : process.env.CORS_ORIGIN || true,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    const result = await query("SELECT NOW() as now");
    res.json({ status: "ok", time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: "error", message: (err as Error).message });
  }
});

// --- Agrega tus rutas API aquí ---
// Ejemplo:
// app.get("/api/therapies", async (_req, res) => {
//   const { rows } = await query("SELECT * FROM therapies ORDER BY id");
//   res.json(rows);
// });

// Servir frontend estático cuando exista dist (Railway, producción, o preview)
// Así funciona aunque NODE_ENV no esté en "production"
if (hasDist) {
  console.log("Serving static files from:", distPath);
  app.use(express.static(distPath, { index: "index.html" }));
  
  // SPA fallback: todas las rutas no-API devuelven index.html
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    const indexFile = path.join(distPath, "index.html");
    if (fs.existsSync(indexFile)) {
      res.sendFile(indexFile);
    } else {
      res.status(404).json({ error: "index.html not found in dist" });
    }
  });
} else {
  console.warn("⚠️  WARNING: dist folder not found! Frontend will not be served.");
  app.get("/", (_req, res) => {
    res.status(503).json({
      error: "Frontend not built",
      message: "The dist folder does not exist. Run 'npm run build' first.",
      distPath,
    });
  });
}

const HOST = process.env.HOST || "0.0.0.0";
app.listen(Number(PORT), HOST, () => {
  console.log(`✅ Servidor API corriendo en http://${HOST}:${PORT}`);
  console.log(`📁 dist exists: ${hasDist}`);
  if (HOST === "0.0.0.0") {
    console.log(`🌐 Accesible en la red: http://<tu-IP>:${PORT}`);
  }
});

export default app;
