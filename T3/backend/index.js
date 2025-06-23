const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');


dotenv.config({path: '../.env'});

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

//Importacion de modulos de rutas
const elementoConfigRoute = require('./src/routes/crud-elemento-configuracion-route')

//morgarn
app.use(morgan('tiny'))
// Middleware para manejar datos JSON
app.use(express.json());
 
// Use CORS middleware
 app.use(cors());


// Rutas de usuario
app.use('/', elementoConfigRoute);


app.get('/', (req, res) => {
  res.send('Get de prueba práctica 3');
});




// Middleware autorize de rutas
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token no enviado' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`));
