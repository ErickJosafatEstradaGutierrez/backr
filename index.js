const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde /firmware
app.use("/download_bin", express.static(path.join(__dirname, "firmware")));

// Endpoint para version.json
app.get("/version", (req, res) => {
  res.sendFile(path.join(__dirname, "version.json"));
});

app.listen(PORT, () => {
  console.log(`OTA Server corriendo en http://localhost:${PORT}`);
});
