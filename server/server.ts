import express from "express";
// O alternativamente: const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get("/api", (req, res) => {
  res.json({ message: "¡API funcionando!" });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
