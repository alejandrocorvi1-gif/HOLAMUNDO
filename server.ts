import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ruta de salud para verificar que el servidor responde
  app.get("/ping", (req, res) => res.send("pong"));

  // Verificamos si existe la carpeta 'dist' (producción)
  const distPath = path.join(process.cwd(), "dist");
  const isProd = fs.existsSync(path.join(distPath, "index.html"));

  if (isProd) {
    console.log("Sirviendo desde la carpeta DIST (Producción)");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    console.log("Iniciando en modo DESARROLLO con Vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor activo en puerto ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Error al iniciar el servidor:", err);
});
