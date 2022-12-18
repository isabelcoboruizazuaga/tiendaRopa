/**
 * Método que gestiona la creación del carrito en el html
 * @see showProduct
 * @see showResumen
 */
function showCart() {
    let main = $("main");
    main.empty();

    /*Sección*/
    let carrito = $("<section>")
        .addClass("carrito")
        .appendTo(main);


    let title = $("<h1> Cesta </h1>")
        .addClass("title")
        .appendTo(carrito);

    /*Contenedor de productos*/
    let container = $("<div>")
        .addClass("container-items")
        .appendTo(carrito);

    //Producto
    showProduct(container);

    //Resumen de pedido
    showResumen(carrito);
}

/**
 * Coloca los productos en el html
 * @param {JQuery} container 
 */
function showProduct(container) {
    //Se obtiene el carrito
    let carritoArr = [];
    if (usu == "") {
        //Si no hay sesión iniciada se coge el último
        let carro = new CarritoCompra(JSON.parse(localStorage.getItem('carrito')));
        carritoArr = carro.getCarrito();
    } else {
        //Si hay sesión iniciada se coge el carrito del usuario
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        for (let i = 0; i < usuarios.length; i++) {
            const usuario = usuarios[i];
            if (usuario.id == usu.id) {
                try {
                    carrito = new CarritoCompra(JSON.parse(usuario.carrito));
                    carritoArr = carrito.getCarrito();

                } catch (error) {
                    carrito = new CarritoCompra();
                }
                //Se establece el último carrito de storage al del usuario
                localStorage.setItem('carrito', JSON.stringify(carrito.getCarrito()));
            }
        }
    }
    carritoArr.forEach(fila => {
        let divItem = $("<div>")
            .addClass("item-c")
            .appendTo(container);

        let img = $('<img>')
            .attr("src", fila.articulo.image)
            .appendTo(divItem);

        let datos = $("<div>")
            .addClass("datos")
            .appendTo(divItem);

        let nombre = $("<h2>" + fila.articulo.title + " </h2>")
            .appendTo(datos);
        let descrip = $("<p> " + fila.articulo.description + " </p>")
            .appendTo(datos);


        let adicional = $("<div>")
            .addClass("adicional")
            .appendTo(datos);

        //Selects de tallas y cantidad
        selectTallas(adicional, fila);
        selectCantidad(adicional, fila);

        let borrar = $("<i>")
            .addClass("fa-solid fa-trash-can")
            .click(function () { borrarArticulo(fila) })
            .appendTo(adicional);

        let precio = $("<h2>" + fila.articulo.price + "€</h2>")
            .appendTo(divItem);
    });
}

/**
 * Borra un artículo del carrito
 * @param {FilaCarrito} fila 
 */
function borrarArticulo(fila) {
    //Se elimina del array
    carrito.deleteFromCart(fila.articulo.id, fila.talla);
    //Se actualiza el usuario en localStorage
    sustituirUsuario(usu.id);
    //Se actualiza en localStorage el carrito  
    localStorage.setItem('carrito', JSON.stringify(carrito.getCarrito()));
    //Se actualiza la vista
    showCart();
}

/**
 * Crea el select de la cantidad
 * @param {JQuery} adicional elemento al que se adjunta
 * @param {FilaCarrito} fila 
 */
function selectCantidad(adicional, fila) {
    //Etiqueta
    let cant = $("<p> Cantidad: </p>")
        .appendTo(adicional);

    //Select 
    let cantidad = $('<select>')
        .addClass("selectCantidad")
        .attr("id", fila.articulo.id + fila.talla)
        .on('change', function () { cambioCantidad.call(this, fila) })
        .appendTo(adicional);
    //Se rellena del 1 al 10
    for (i = 1; i <= 20; i++) {
        cantidad.append($('<option></option>').val(i).html(i))
    }

    //Se selecciona por defecto la cantidad elegida
    $(".selectCantidad#" + fila.articulo.id + fila.talla + " > option[value='" + fila.cantidad + "']").attr("selected", true);
}

/**
 * Crea el select de las tallas
 * @param {JQuery} adicional elemento al que se adjunta
 * @param {FilaCarrito} fila 
 */
function selectTallas(adicional, fila) {
    //Array de tallas
    let arr = [
        { val: "XS", text: 'XS' },
        { val: "S", text: 'S' },
        { val: "M", text: 'M' },
        { val: "L", text: 'L' },
        { val: "XL", text: 'XL' }
    ];

    //Etiqueta
    let tall = $("<p> Talla: </p>")
        .appendTo(adicional);

    //Select
    let tallas = $('<select>')
        .addClass("selectTallas")
        .attr("id", fila.articulo.id + fila.talla)
        .on('change', function () { cambioTalla.call(this, fila) })
        .appendTo(adicional);
    $(arr).each(function () {
        tallas.append($("<option>").attr('value', this.val).text(this.text));
    });

    //Se selecciona por defecto la talla elegida
    $(".selectTallas#" + fila.articulo.id + fila.talla + " > option[value='" + fila.talla + "']").attr("selected", true);

}

/**
 * Cambia la cantidad del artículo seleccionado
 * @param {FilaCarrito} fila 
 * @see selectCantidad
 */
function cambioCantidad(fila) {
    var newCantidad = this.value;

    //Cambiamos la cantidad en el carrito
    carrito.changeCantidad(fila.articulo.id, fila.talla, newCantidad)
    //Se actualiza el usuario en localStorage
    sustituirUsuario(usu.id);
    //Se actualiza en localStorage el carrito  
    localStorage.setItem('carrito', JSON.stringify(carrito.getCarrito()));
    //Se actualiza la vista
    showCart();
}

/**
 * Cambia la talla del artículo seleccionado
 * @param {FilaCarrito} fila 
 * @see selectTallas
 */
function cambioTalla(fila) {
    var tallaSelected = this.value;

    //Cambiamos la talla en el carrito
    carrito.changeTalla(fila.articulo.id, fila.talla, tallaSelected);
    //Se actualiza el usuario en localStorage
    sustituirUsuario(usu.id);
    //Se actualiza en localStorage el carrito  
    localStorage.setItem('carrito', JSON.stringify(carrito.getCarrito()));
    //Se actualiza la vista
    showCart();
}

/**
 * Coloca el resumen de pedido en el html
 * @param {JQuery} carritoDiv 
 */
function showResumen(carritoDiv) {
    let resumen = $("<div>")
        .addClass("resumen")
        .appendTo(carritoDiv);

    let title = $("<h1> Resumen </h1>")
        .appendTo(resumen);

    let subtoDiv = $("<div>")
        .addClass("subtotal")
        .appendTo(resumen);
    let sub = $("<p> Subtotal </p>")
        .appendTo(subtoDiv);
    let subto = $("<p> " + carrito.calculaSubtotal().toFixed(2) + "€</p>")
        .appendTo(subtoDiv);

    let envioDiv = $("<div>")
        .addClass("envio")
        .appendTo(resumen);
    let en = $("<p> Gastos de envío y gestión </p>")
        .appendTo(envioDiv);
    let env = $("<p> 2.99€ </p>")
        .appendTo(envioDiv);

    let totDiv = $("<div>")
        .addClass("total")
        .appendTo(resumen);
    let tot = $("<p> Total </p>")
        .appendTo(totDiv);
    let total = $("<p> " + carrito.calculaTotal().toFixed(2) + "</p>")
        .appendTo(totDiv);

    let pag = $("<button> Pasar por caja </button>")
        .appendTo(resumen);

}