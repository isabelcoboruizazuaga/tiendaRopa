window.onload = () => {

    //Click events para las categorías
    $(".art-all").click(() => { requestAllProducts(); })
    $(".art-mujer").click(() => { requestAllProducts("/category/women's clothing"); })
    $(".art-hombre").click(() => { requestAllProducts("/category/men's clothing"); })
    $(".art-jewele").click(() => { requestAllProducts("/category/jewelery"); })

    //Click events para el orden

}

var lastRequest;

/**
 * Realiza la llamada a la api para la categoría indicada
 * @param  {String} category Categoría a buscar, puede estar vacío
 * @param  {String} sort Parámetros de orden, puede estar vacío
 */
function requestAllProducts(category = "", sort = "") {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = tratarRespuesta;

    //Si se ordena se coge la última petición y se añade el orden, si no se hace la nueva petición
    sort ? newRequest = lastRequest + category + sort : newRequest = "https://fakestoreapi.com/products" + category

    httpRequest.open("GET", newRequest);///category/men's clothing
    httpRequest.send();
    lastRequest = newRequest;
}

/**
 * Gestiona la respuesta de la api.
 * @see cargarElementos
 */
function tratarRespuesta() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var datos = JSON.parse(httpRequest.responseText);
            cargarElementos(datos);
        } else {
            alert("There was a problem with the request.");
        }
    }
}

/**
 * Carga los elementos de un JSON dado en el HTML
 * @param {JSON} datos 
 * @see tratarRespuesta
 */
function cargarElementos(datos) {    
    let main = $("main");
    main.empty();

    /*Sección*/
    let catalogo = $("<section>")
        .addClass("catalogo")
        .appendTo(main);

    /*Botones de control de orden*/
    botonesControl(catalogo);

    /*Contenedor de productos*/
    let container = $("<div>")
        .addClass("item-container")
        .appendTo(catalogo);

    //Se cargan los artículos
    datos.forEach(item => {
        let divItem = $('<div>')
            .addClass('item')
            .appendTo(container);

        let img = $('<img>')
            .attr("src", item.image)
            .appendTo(divItem);
        let nomb = $('<h3>' + item.title + '</h3>')
            .appendTo(divItem);
        let preci = $('<p>' + item.price + '€</p>')
            .appendTo(divItem);

        divItem.click(function (event) { requestProductoSeleccionado(item.id);});
    });
}

/**
 * Carga los elementos de control de orden y les asigna los click listeners
 * @param {JQuery} catalogo 
 */
function botonesControl(catalogo) {
    let control = $("<div>")
        .addClass("control")
        .appendTo(catalogo);

    let botAsc = $("<button> Ascendente </button>")
        .addClass("ascendente")
        .appendTo(control);

    let botDesc = $("<button>Descendente </button>")
        .addClass("descendente")
        .appendTo(control);

        
    botAsc.click(() => { requestAllProducts("", "?sort=asc"); })
    botDesc.click(() => { requestAllProducts("", "?sort=desc"); })
}

/**
 * Lanza una petición a la api para obtener los datos de un producto dado su id
 * @param {Number} id 
 */
function requestProductoSeleccionado(id) {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = respuestaProducto;

    httpRequest.open("GET", 'https://fakestoreapi.com/products/'+id);
    httpRequest.send();
}

/**
 * Recibe la respuesta del producto buscado por la api y llama al método para mostrarlo
 * @see mostrarProducto
 */
function respuestaProducto() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var datos = JSON.parse(httpRequest.responseText);
            mostrarProducto(datos);
        } else {
            alert("There was a problem with the request.");
        }
    }
}

/**
 * Coloca un producto en el html
 * @param {JSON} item 
 * @see respuestaProducto
 */
function mostrarProducto(item){
    let main = $("main");
    main.empty();

    /*Sección*/
    let container = $("<section>")
        .addClass("detalle")
        .appendTo(main);

    let images = $("<div>")
        .addClass("detalle-images")
        .appendTo(container);

    let img = $('<img>')
        .attr("src", item.image)
        .appendTo(images);

    let info = $("<div>")
        .addClass("info")
        .appendTo(container);

    let nomb = $('<h1>' + item.title + '</h1>')
        .appendTo(info);
    let preci = $('<h2>' + item.price + '</h2>')
        .appendTo(info);
    let desc = $('<p>' + item.description + '</p>')
        .appendTo(info);

    var arr = [
        { val: "xs", text: 'XS' },
        { val: "s", text: 'S' },
        { val: "m", text: 'M' },
        { val: "l", text: 'L' },
        { val: "xl", text: 'XL' }
    ];

    var selec = $('<select>').appendTo(info);
    $(arr).each(function () {
        selec.append($("<option>").attr('value', this.val).text(this.text));
    });

    let add = $('<button> Añadir al carrito </button>')
    .appendTo(info);
}