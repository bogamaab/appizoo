const express = require("express");
const router = express.Router();
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

module.exports = router;
