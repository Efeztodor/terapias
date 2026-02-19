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
  app.use(express.static(distPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    const indexFile = path.join(distPath, "index.html");
    res.sendFile(indexFile, (err) => {
      if (err) next(err);
    });
  });
}

const HOST = process.env.HOST || "0.0.0.0";
app.listen(Number(PORT), HOST, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
  if (HOST === "0.0.0.0") {
    console.log(`  Accesible en la red: http://<tu-IP>:${PORT}`);
  }
});

export default app;
