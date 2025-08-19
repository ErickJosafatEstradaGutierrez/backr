import express from "express";
import path from "path";

const app = express();
const SERVER_FIRMWARE_VERSION = "v1.1.5";

// Ruta donde estarán los .bin (carpeta raíz/public/download_bin)
const BIN_FOLDER = path.join(process.cwd(), "public", "download_bin");

// Endpoint para versión
app.get("/version", (req, res) => {
  res.json({ version: SERVER_FIRMWARE_VERSION });
});

// Endpoint para descargar firmware
app.get("/download_bin/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(BIN_FOLDER, filename);

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("X-Firmware-Version", SERVER_FIRMWARE_VERSION);

  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(404).json({ error: "Firmware no encontrado" });
    }
  });
});

// Probar servidor
app.get("/get", (req, res) => {
  res.send("Hello, World!, GET");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://0.0.0.0:${PORT}`);
});
