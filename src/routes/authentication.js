const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const userSchema = require("../models/user");

router.post('/signup', async(req, res) => {
    const { usuario, correo, clave } = req.body;
    const user = new userSchema({
        usuario: usuario,
        correo: correo,
        clave: clave
    });

    user.clave = await user.encryptClave(user.clave);
    await user.save();
    //res.json(user);
    res.json({
        message: "Usuario guardado."
    })
});

router.post('/login', async(req, res) => {
    const { error } = userSchema.validate(req.body.correo, req.body.clave);
    if (error) return res.status(400).json({error: error.details[0].message });

    const user = await userSchema.findOne({ correo: req.body.correo });
    if (!user) return res.status(400).json({eror: "Usuario no encontrado"});

    const validPassword = await bcrypt.compare(req.body.clave, user.clave);
    if(!validPassword)
        return res.status(400).json({ error: "Clave no valida" });
    res.json({
        error: null,
        data: `Bienvenido(a) ${user.usuario}`,
    });
});

module.exports = router;
