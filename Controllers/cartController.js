
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
    for (let j = 0; j < 10; j++) {

        let divItem = $("<div>")
            .addClass("item-c")
            .appendTo(container);

        let img = $('<img>')
            .attr("src", "imgs/prueba.jpg")
            .appendTo(divItem);

        let datos = $("<div>")
            .addClass("datos")
            .appendTo(divItem);

        let nombre = $("<h2> Nombre producto </h2>")
            .appendTo(datos);
        let descrip = $("<p> Descripcion producto </p>")
            .appendTo(datos);


        let adicional = $("<div>")
            .addClass("adicional")
            .appendTo(datos);

        let arr = [
            { val: "xs", text: 'XS' },
            { val: "s", text: 'S' },
            { val: "m", text: 'M' },
            { val: "l", text: 'L' },
            { val: "xl", text: 'XL' }
        ];

        let tall = $("<p> Talla: </p>")
            .appendTo(adicional);
        //Select de tallas
        let tallas = $('<select>')
            .addClass("selectTallas")
            .appendTo(adicional);
        $(arr).each(function () {
            tallas.append($("<option>").attr('value', this.val).text(this.text));
        });
        //Se selecciona por defecto la talla elegida
        $(".selectTallas > option[value=m]").attr("selected", true);

        let cant = $("<p> Cantidad: </p>")
            .appendTo(adicional);
        //Select de cantidad
        let cantidad = $('<select>')
            .addClass("selectCantidad")
            .appendTo(adicional);
        for (i = 1; i <= 10; i++) {
            cantidad.append($('<option></option>').val(i).html(i))
        }
        //Se selecciona el número de objetos
        $(".selectCantidad > option[value=2]").attr("selected", true);


        let borrar = $("<i>")
            .addClass("fa-solid fa-trash-can")
            .appendTo(adicional);

        let precio = $("<h2>99.99€</h2>")
            .appendTo(divItem);
    }
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