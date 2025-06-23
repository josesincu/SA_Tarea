/* dotenv nos permite leer las variables de entorno de nuestro .env */
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const { Pool } = require('pg'); // libreria conexion a db


const connection = new Pool({
            user: process.env.DB_USER || "elemento_configuracion",
            host: process.env.DB_HOST || "localhost",
            database: process.env.DB_NAME || "postgress",
            password: process.env.DB_PASS || "dark",
            port: process.env.DB_PORT || "5432",
            
        });
module.exports = connection;

