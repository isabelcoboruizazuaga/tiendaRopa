class CarritoCompra {
    constructor(carrito = []) {
        this.carrito = carrito;
    }

    /**
     * 
     * @returns {Array} array del carrito
     */
    getCarrito() {
        //Se invierte para obtener los últimos productos añadidos antes
        let carrito =  this.carrito.slice().reverse();
        return carrito;
    }

    /**
     * Añade al carrito el artículo dado
     * @param {Object} art artículo a añadir
     * @param {String} talla 
     * @param {Number} cantidad 
     */
    addToCart(art, talla, cantidad) {
        let priorCantidad = 0;

        let id = art.id;
        //Se comprueba si ya está el artículo
        for (let i = 0; i < this.carrito.length; i++) {            
            const fil = this.carrito[i];
            let filaCarrito= new FilaCarrito(fil.articulo,fil.cantidad,fil.talla);

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

    /**
     * Elimina un artículo del carrito
     * @param {Number} id 
     * @param {String} talla 
     */
    deleteFromCart(id, talla) {
        //Se recorre el carrito
        for (let i = 0; i < this.carrito.length; i++) {            
            const fil = this.carrito[i];
            let filaCarrito= new FilaCarrito(fil.articulo,fil.cantidad,fil.talla);

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
            const fil = this.carrito[i];
            let filaCarrito= new FilaCarrito(fil.articulo,fil.cantidad,fil.talla);

            let tal = filaCarrito.getTalla();
            let articulo = filaCarrito.getArticulo();
            //Un articulo se distingue por su id y la talla
            if (articulo.id == id && tal == talla) {
                return true;
            }

        }
        return false;
    }

    /**
     * Cambia la talla de un artículo del carrito
     * @param {Number} id 
     * @param {String} oldTalla talla que tiene actualmente el artículo
     * @param {String} newTalla nueva talla deseada
     */
    changeTalla(id, oldTalla, newTalla) {
        let newCarrito=this.carrito.map(fil=>{
            let fila= new FilaCarrito(fil.articulo,fil.cantidad,fil.talla);
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

    /**
     * Cambia la cantidad de un artículo del carrito
     * @param {Number} id 
     * @param {String} talla 
     * @param {Number} newCantidad nueva cantidad deseada
     */
    changeCantidad(id,talla,newCantidad){
        let newCarrito=this.carrito.map(fil=>{
            let fila= new FilaCarrito(fil.articulo,fil.cantidad,fil.talla);
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