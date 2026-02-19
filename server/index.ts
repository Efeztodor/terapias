import express from "express";
import cors from "cors";
import { query } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

// En desarrollo permitir cualquier origen (para poder abrir desde el móvil en la red local)
const isDev = process.env.NODE_ENV !== "production";
app.use(
  cors({
    origin: isDev
      ? true
      : process.env.CORS_ORIGIN || "http://localhost:5173",
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

const HOST = process.env.HOST || "0.0.0.0";
app.listen(Number(PORT), HOST, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
  if (HOST === "0.0.0.0") {
    console.log("  Accesible en la red: http://<tu-IP>:${PORT}");
  }
});

export default app;
