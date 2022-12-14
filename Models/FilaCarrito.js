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