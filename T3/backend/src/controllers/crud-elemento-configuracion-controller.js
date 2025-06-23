const {
        CrearElementoConfigService,
        ObtenerElementoConfigService,
        ObtenerElementosConfigService,
        ModificarElementoConfigService,
        EliminarElementoConfigService
    } = require('../services/crud-elemento-configuracion-service');

/************************************************************************************
 * 
 * 
 *   CRUD elemento de configuracion
 * 
 * 
 ************************************************************************************/
exports.CrearElementoConfigController = async (req, res) => {
    CrearElementoConfigService(req)
    .then((result)=>{
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            return  res.json(err);
        }
    )

};

exports.ObtenerElementosConfigController = async (req, res) => {
    ObtenerElementosConfigService(req)
    .then((result)=>{
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            return  res.json(err);
        }
    )

};

exports.ObtenerElementoConfigController = async (req, res) => {
    ObtenerElementoConfigService(req.body.id)
    .then((result)=>{
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            return  res.json(err);
        }
    )

};

exports.ModificarElementoConfigController = async (req, res) => {
    ModificarElementoConfigService(req)
    .then((result)=>{
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            return  res.json(err);
        }
    )

};

exports.EliminarElementoConfigController = async (req, res) => {
    EliminarElementoConfigService(req.body.id)
    .then((result)=>{
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            return  res.json(err);
        }
    )

};
