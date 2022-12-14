window.onload = () => {
    requestAllProducts();


    //Click events para las categorías
    $(".art-mujer").click( () =>{requestAllProducts("/category/women's clothing");})
    $(".art-hombre").click( () =>{requestAllProducts("/category/men's clothing");})
    $(".art-jewele").click( () =>{requestAllProducts("/category/jewelery");})

    //Click events para el orden
    $(".descendente").click( () =>{requestAllProducts("","?sort=desc");})
    $(".ascendente").click( () =>{requestAllProducts("","?sort=asc");})
    
}

var lastRequest;

/**
 * Realiza la llamada a la api para la categoría indicada
 * @param  {String} category Categoría a buscar, puede estar vacío
 * @param  {String} sort Parámetros de orden, puede estar vacío
 */
function requestAllProducts(category = "",sort="") {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = tratarRespuesta;

    //Si se ordena se coge la última petición y se añade el orden, si no se hace la nueva petición
    sort? newRequest=  lastRequest + category +sort : newRequest= "https://fakestoreapi.com/products" + category
    
    httpRequest.open("GET", newRequest);///category/men's clothing
    httpRequest.send();
    lastRequest=newRequest;
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
    var container = $(".item-container");

    //Se vacía por si hay algo ya
    console.log("alo?")
    container.empty();

    //Se cargan los artículos
    datos.forEach(item => {
        let nombre = item.title;
        let imagen = item.image;
        let precio = item.price;

        let divItem = $('<div>')
            .addClass('item')
            .appendTo(container);

        let img = $('<img>')
            .attr("src", imagen)
            .appendTo(divItem);
        let nomb = $('<h3>' + nombre + '</h3>')
            .appendTo(divItem);
        let preci = $('<p>' + precio + '€</p>')
            .appendTo(divItem);      
            
            divItem.click(function (event) { productoSeleccionado(event, item.id) });
    });
}

function productoSeleccionado(e,id){
     console.log(id);
     $(".item-container").empty;
     var container = $(".detalle");

     let images=$("<div>")
     .addClass("detalle-images")
     .appendTo(container);

     let img = $('<img>')
     .attr("src", "https://i.blogs.es/b880f2/pexels-pixabay-414102/200_200.jpg")
     .appendTo(images);

     let info=$("<div>")
     .addClass("info")
     .appendTo(container);
     
     let nomb = $('<h1>' + "nombreProducto" + '</h1>')
     .appendTo(info);
     let preci = $('<h2>' + "00.00€" + '</h2>')
     .appendTo(info);
     let desc = $('<p>' + "blablablablabl" + '</p>')
     .appendTo(info);

     var arr = [
        {val : "xs", text: 'XS'},
        {val : "s", text: 'S'},
        {val : "m", text: 'M'},
        {val : "l", text: 'L'},
        {val : "xl", text: 'XL'}
      ];
      
      var selec = $('<select>').appendTo('info');
      $(arr).each(function() {
       selec.append($("<option>").attr('value',this.val).text(this.text));
      });

      let add=$('<button> Añadir al carrito </button>');
     

}
function articulosMujer() {
    requestAllProducts("/category/women's clothing");
}