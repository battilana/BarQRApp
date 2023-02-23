const { Router } = require('express');
const qrRoute = require ("./qrGeneration.js")
const loginRoute = require ("./login.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/qrs", qrRoute)
router.use("/", loginRoute)

module.exports = router;
