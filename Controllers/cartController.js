
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
    let carro = new CarritoCompra(JSON.parse(localStorage.getItem('carrito')));
    console.log(carro);
    let carritoArr = carro.getCarrito();
    console.log("aaaaaaa");
    console.log(carritoArr);

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
        selectTallas(adicional,fila);
        selectCantidad(adicional,fila);


        let borrar = $("<i>")
            .addClass("fa-solid fa-trash-can")
            .appendTo(adicional);

        let precio = $("<h2>99.99€</h2>")
            .appendTo(divItem);
    });


}

function selectCantidad(adicional,fila) {
    //Etiqueta
    let cant = $("<p> Cantidad: </p>")
        .appendTo(adicional);

    //Select 
    let cantidad = $('<select>')
        .addClass("selectCantidad")
        .attr("id", fila.articulo.id + fila.talla)
        .appendTo(adicional);
    //Se rellena del 1 al 10
    for (i = 1; i <= 10; i++) {
        cantidad.append($('<option></option>').val(i).html(i))
    }

    //Se selecciona por defecto la cantidad elegida
    $(".selectCantidad#" + fila.articulo.id + fila.talla + " > option[value='" + fila.cantidad + "']").attr("selected", true);

}

function selectTallas(adicional,fila) {
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
        .on('change',function (){cambioTalla.call(this,fila)})
        .appendTo(adicional);
    $(arr).each(function () {
        tallas.append($("<option>").attr('value', this.val).text(this.text));
    });

    //Se selecciona por defecto la talla elegida
    $(".selectTallas#" + fila.articulo.id + fila.talla + " > option[value='" + fila.talla + "']").attr("selected", true);

}

function cambioTalla(fila){
    //var optionSelected = $("option:selected", this);
    console.log("hola?");
    var valueSelected = this.value;
    console.log(fila.articulo.id+" : "+valueSelected);

    //Cambiamos la talla en el carrito
    carrito.changeTalla(fila.articulo.id,fila.talla,valueSelected);
    //Se actualiza en localStorage    
    localStorage.setItem('carrito',  JSON.stringify(carrito.getCarrito()));
    //Se actualiza la vista
    showCart();
}

/**
 * Coloca el resumen de pedido en el html
 * @param {JQuery} carrito 
 */
function showResumen(carrito) {
    let resumen = $("<div>")
        .addClass("resumen")
        .appendTo(carrito);

    let title = $("<h1> Resumen </h1>")
        .appendTo(resumen);

    let subtoDiv = $("<div>")
        .addClass("subtotal")
        .appendTo(resumen);
    let sub = $("<p> Subtotal </p>")
        .appendTo(subtoDiv);
    let subto = $("<p> 999.999€ </p>")
        .appendTo(subtoDiv);

    let envioDiv = $("<div>")
        .addClass("envio")
        .appendTo(resumen);
    let en = $("<p> Gastos de envío y gestión </p>")
        .appendTo(envioDiv);
    let env = $("<p> 999.999€ </p>")
        .appendTo(envioDiv);


    let totDiv = $("<div>")
        .addClass("total")
        .appendTo(resumen);
    let tot = $("<p> Total </p>")
        .appendTo(totDiv);
    let total = $("<p> 999.999€ </p>")
        .appendTo(totDiv);

    let pag = $("<button> Pasar por caja </button>")
        .appendTo(resumen);

}