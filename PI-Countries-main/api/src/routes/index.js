const { Router } = require('express');
const router = Router();

// Importar todos los routers.
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter = require('./Country');
const activityRouter = require('./Activity');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countryRouter);  //"countries" es el nombre del modelo
router.use('/activity', activityRouter);  //"activity" es el nombre del modelo


module.exports = router;
