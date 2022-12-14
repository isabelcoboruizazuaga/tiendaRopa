class FilaCarrito{
    constructor(articulo,cantidad,talla){
        this.articulo=articulo;
        this.cantidad=cantidad;
        this.talla=talla;
    }

    setCantidad(cantidad){
        this.cantidad=cantidad;
    }
    setTalla(talla){
        this.talla=talla;
    }

    getTalla(){
        return this.talla;
    }

    getCantidad(){
        return this.cantidad;
    }

    getArticulo(){
        return this.articulo;
    }
}

/**class Articulo{
    constructor(id,nombre, descripcion, imagen,precio){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.imagen=imagen;
        this.precio=precio;
    }

    setTalla(talla){
        this.talla=talla;
    }

    getTalla(){
        return this.talla;
    } */