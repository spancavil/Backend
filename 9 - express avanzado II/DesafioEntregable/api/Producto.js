class Producto {
    constructor (){
        this.productos = [];
    }

    listar(){
        if (this.productos.length === 0){
            return {error: "No hay productos cargados"};
        }
        else{
            return this.productos;
        }
    }
    
    listar_id(productoId){
        let producto = this.productos.find(element => element.id === parseInt(productoId));
        if (producto){
            return(producto);
        } else {
            return {error: "Producto no encontrado."};
        }
    }

    agregar(producto){
        let objeto = {...producto, 
                        id: this.productos.length + 1}
        this.productos.push(objeto);
        return objeto;
    }

    update(productoId, body){
        let producto = this.productos.find(element => element.id === parseInt(productoId));
        if (producto){
            this.productos[productoId-1] = {...body, id: parseInt(productoId)};
            return this.productos[productoId-1];
        } else {
            return {error: "Producto a actualizar no encontrado."};
        } 
    }

    borrar(productoId){
        let producto = this.productos.find(element => element.id === parseInt(productoId));
        if (producto){
            let productoEliminado = this.productos[productoId-1];
            this.productos.splice(productoId-1, 1);
            return productoEliminado;
        } else {
            return {error: "Producto a borrar no encontrado."};
        }
    }

}

module.exports = Producto;