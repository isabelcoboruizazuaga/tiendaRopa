class CarritoCompra {
    constructor(carrito = []) {
        this.carrito = carrito;
    }

    getCarrito() {
        return this.carrito;
    }

    addToCart(art, talla, cantidad) {
        let priorCantidad = 0;

        let id = art.id;
        //Se comprueba si ya está el artículo
        for (let i = 0; i < this.carrito.length; i++) {
            const filaCarrito = this.carrito[i];

            let tal = filaCarrito.getTalla();
            let articulo = filaCarrito.getArticulo();
            //Un articulo se distingue por su id y la talla
            if (articulo.id == id && tal == talla) {
                //Si se encuentra se obtiene la cantidad y se elimina
                priorCantidad = filaCarrito.cantidad;
                this.carrito.splice(i, 1);
            }

        }

        //Se añade a la cesta
        let fila = new FilaCarrito(art, cantidad + priorCantidad, talla);

        this.carrito.push(fila);
    }

    deleteFromCart(id, talla) {
        //Se recorre el carrito
        for (let i = 0; i < this.carrito.length; i++) {
            const filaCarrito = this.carrito[i];

            let tal = filaCarrito.getTalla();
            let articulo = filaCarrito.getArticulo();

            //Un articulo se distingue por su id y la talla
            if (articulo.id == id && tal == talla) {
                this.carrito.splice(i, 1);
            }

        }
    }

    isArticulo(id, talla) {
        //Se recorre el carrito
        for (let i = 0; i < this.carrito.length; i++) {
            const filaCarrito = this.carrito[i];

            let tal = filaCarrito.getTalla();
            let articulo = filaCarrito.getArticulo();
            //Un articulo se distingue por su id y la talla
            if (articulo.id == id && tal == talla) {
                return true;
            }

        }
        return false;
    }

    changeTalla(id, oldTalla, newTalla) {
        let newCarrito=this.carrito.map(fila=>{
            //Si la fila es la que buscamos (el articulo es el id y la talla es la antigua)
            if(fila.articulo.id ==id && fila.talla==oldTalla){
                //Devolvemos la nueva fila con la talla ya cambiada
                fila.setTalla(newTalla);
                return fila;
            }else{
                return fila;
            }
        });

        //Se sustituye el array por el nuevo
        this.carrito=newCarrito;
    }

    changeCantidad(id,talla,newCantidad){
        let newCarrito=this.carrito.map(fila=>{
            //Si la fila es la que buscamos (el articulo es el id y la talla corresponde)
            if(fila.articulo.id ==id && fila.talla==talla){
                //Devolvemos la nueva fila con la cantidad ya cambiada
                fila.setCantidad(newCantidad);
                return fila;
            }else{
                return fila;
            }
        });

        //Se sustituye el array por el nuevo
        this.carrito=newCarrito;
    }
}