//Importacion de los modulos 
const connection = require('../config/database');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

// Creacion de un elemento config
exports.CrearElementoConfigService = async function(datosElemento) {
    try {
        const {
            nombre, tipo, descripcion, numero_serie, version, fecha_adquisicion,
            estado_actual, ubicacion_fisica, nivel_seguridad, cumplimiento,
            estado_configuracion, numero_licencia, fecha_vencimiento, responsable_id
        } = datosElemento.body;

        // Verificar si el elemento ya existe
        const comandoExiste = 'SELECT * FROM elementoconfiguracion WHERE nombre = $1';
        const resultExiste = await connection.query(comandoExiste, [nombre]);

        if (resultExiste.rows.length > 0) {
            return {status: 409, data: {error: `El elemento de configuración ${nombre} ya existe`}};
        }

        // Insertar en la base de datos
        const text = `
            INSERT INTO elementoconfiguracion (
                nombre, tipo, descripcion, numero_serie, version, fecha_adquisicion,
                estado_actual, ubicacion_fisica, nivel_seguridad, cumplimiento,
                estado_configuracion, numero_licencia, fecha_vencimiento, responsable_id
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING *
        `;
        
        const values = [
            nombre, tipo, descripcion, numero_serie, version, fecha_adquisicion,
            estado_actual, ubicacion_fisica, nivel_seguridad, cumplimiento,
            estado_configuracion, numero_licencia, fecha_vencimiento, responsable_id
        ];

        const res = await connection.query(text, values);
        
        return {
            status: 201, 
            data: {
                elemento: res.rows[0], 
                mensaje: `Elemento de configuración creado exitosamente`
            }
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500, 
            data: {error: `Error al crear elemento de configuración: ${error}`}
        };
    }
};

// Obtener todos los elemento de config
exports.ObtenerElementosConfigService = async function() {
    try {
        const text = 'SELECT * FROM elementoconfiguracion ORDER BY nombre';
        const res = await connection.query(text);
        
        return {
            status: 200, 
            data: {elementos: res.rows}
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500, 
            data: {error: `Error al obtener elementos de configuración: ${error}`}
        };
    }
};


// Obtener un elemento en especifico
exports.ObtenerElementoConfigService = async function(id) {
    try {
        const text = 'SELECT * FROM elementoconfiguracion WHERE ci_id = $1';
        const res = await connection.query(text, [id]);

        if (res.rows.length === 0) {
            return {
                status: 404, 
                data: {error: `Elemento de configuración no encontrado`}
            };
        }
        
        return {
            status: 200, 
            data: {elemento: res.rows[0]}
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500, 
            data: {error: `Error al obtener elemento de configuración: ${error}`}
        };
    }
};

// Modificar un elemento especifico
exports.ModificarElementoConfigService = async function(datosElemento) {
    try {
        const {
            ci_id, nombre, tipo, descripcion, numero_serie, version, fecha_adquisicion,
            estado_actual, ubicacion_fisica, nivel_seguridad, cumplimiento,
            estado_configuracion, numero_licencia, fecha_vencimiento, responsable_id
        } = datosElemento.body;

        // Verificar si el elemento existe
        const comandoExiste = 'SELECT * FROM elementoconfiguracion WHERE ci_id = $1';
        const resultExiste = await connection.query(comandoExiste, [ci_id]);

        if (resultExiste.rows.length === 0) {
            return {
                status: 404, 
                data: {error: `Elemento de configuración no encontrado`}
            };
        }

        // Actualizar en la base de datos
        const text = `
            UPDATE elementoconfiguracion SET 
                nombre = $1, 
                tipo = $2, 
                descripcion = $3, 
                numero_serie = $4, 
                version = $5, 
                fecha_adquisicion = $6,
                estado_actual = $7, 
                ubicacion_fisica = $8, 
                nivel_seguridad = $9, 
                cumplimiento = $10,
                estado_configuracion = $11, 
                numero_licencia = $12, 
                fecha_vencimiento = $13, 
                responsable_id = $14
            WHERE ci_id = $15
            RETURNING *
        `;
        
        const values = [
            nombre, tipo, descripcion, numero_serie, version, fecha_adquisicion,
            estado_actual, ubicacion_fisica, nivel_seguridad, cumplimiento,
            estado_configuracion, numero_licencia, fecha_vencimiento, responsable_id,
            ci_id
        ];

        const res = await connection.query(text, values);
        
        return {
            status: 200, 
            data: {
                elemento: res.rows[0], 
                mensaje: `Elemento de configuración actualizado exitosamente`
            }
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500, 
            data: {error: `Error al actualizar elemento de configuración: ${error}`}
        };
    }
};


// Eliminar un elemento especifico
exports.EliminarElementoConfigService = async function(id) {
    try {
        // Verificar si el elemento existe
        const comandoExiste = 'SELECT * FROM elementoconfiguracion WHERE ci_id = $1';
        const resultExiste = await connection.query(comandoExiste, [id]);

        if (resultExiste.rows.length === 0) {
            return {
                status: 404, 
                data: {error: `Elemento de configuración no encontrado`}
            };
        }

        // Verificar si tiene relaciones dependientes
        const comandoRelaciones = 'SELECT * FROM relacionci WHERE ci_padre_id = $1 OR ci_hijo_id = $1';
        const resultRelaciones = await connection.query(comandoRelaciones, [id]);

        if (resultRelaciones.rows.length > 0) {
            return {
                status: 409, 
                data: {error: `No se puede eliminar, el elemento tiene relaciones dependientes`}
            };
        }

        // Eliminar de la base de datos
        const text = 'DELETE FROM elementoconfiguracion WHERE ci_id = $1 RETURNING *';
        const res = await connection.query(text, [id]);
        
        return {
            status: 200, 
            data: {
                elemento: res.rows[0], 
                mensaje: `Elemento de configuración eliminado exitosamente`
            }
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500, 
            data: {error: `Error al eliminar elemento de configuración: ${error}`}
        };
    }
};