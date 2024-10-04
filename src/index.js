const express = require('express');
const parser = require("body-parser");
const app = express();
const port = 4000;
const animalRoutes = require("./routes/animal");
const areaRoutes = require("./routes/area");
const authRoutes = require("./routes/authentication");
const mongoose = require("mongoose");

require('dotenv').config();

//permite leer los datos que vienen en la petición
app.use(parser.urlencoded({ extended: false }));

// transforma los datos a formato JSON
app.use(parser.json());

//Gestión de las rutas usando el middleware
app.use("/api", animalRoutes);
app.use("/api", areaRoutes);
app.use("/api", authRoutes);
app.use(express.json());

//Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));
//Conexión al puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
