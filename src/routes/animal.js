const express = require("express");
const router = express.Router(); //manejador de rutas de express
// const verifyToken = require('./validate_token'); TODO: descomentar cuando accedamos con token.

const animalSchema = require("../models/animal");

router.get("/animals",  ( _, res) => { // TODO: Eliminar esta linea cuando hagamos token access
//router.get("/animals", verifyToken, ( _, res) => { TODO: de momento estamos accediendo sin token, comentado por ahora
    animalSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Nuevo animal
router.post("/animals", (req, res) => {
    const animal = animalSchema(req.body);
    animal
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put("/animals/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, edad, tipo, fecha } = req.body;
    animalSchema
        .updateOne({_id: id}, {
            $set: {nombre, edad, tipo, fecha }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.delete("/animals/:id", (req, res) => {
    const { id } = req.params

    animalSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
})


module.exports = router;
