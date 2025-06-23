const express = require('express');
const router = express.Router();

//Importacionde los modulos de usuarios
const {
    CrearElementoConfigController,
    ObtenerElementoConfigController,
    ObtenerElementosConfigController,
    ModificarElementoConfigController,
    EliminarElementoConfigController
} = require('../controllers/crud-elemento-configuracion-controller');

// Rutas para elementos configuracion
router.post('/crear-elemento-config',CrearElementoConfigController); 
router.get('/obtener-elementos-config',ObtenerElementosConfigController);
router.post('/obtener-elemento-config',ObtenerElementoConfigController);
router.put('/modificar-elemento-config',ModificarElementoConfigController);
router.post('/eliminar-elemento-config',EliminarElementoConfigController);

module.exports = router;