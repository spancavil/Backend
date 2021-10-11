class IProductoDAO {
    constructor(){}

    listarId(){
        throw new Error('Método listarId no implementado');
    }

    listar(){
        throw new Error('Método listar no implementado');
    }

    agregar(){
        throw new Error('Método guardar no implementado');
    }

    update(){
        throw new Error('Método actualizar no implementado');
    }

    borrar(){
        throw new Error('Método borrar no implementado');
    }
}

module.exports = IProductoDAO;