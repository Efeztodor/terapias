import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { query } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV !== "production";

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

// En producción servir el frontend estático (build de Vite) y SPA fallback
if (!isDev) {
  const distPath = path.join(__dirname, "..", "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res, next) => {
    // No devolver index.html para rutas de API
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"));
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
