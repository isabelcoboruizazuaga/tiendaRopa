
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

    let arr = [
        { val: "xs", text: 'XS' },
        { val: "s", text: 'S' },
        { val: "m", text: 'M' },
        { val: "l", text: 'L' },
        { val: "xl", text: 'XL' }
    ];

    let selec = $('<select>')
    .addClass("tallaProduct")
    .appendTo(info);
    $(arr).each(function () {
        selec.append($("<option>").attr('value', this.val).text(this.text));
    });

    let add = $('<button> Añadir al carrito </button>')
    .click(function (){
        if(usu!=""){
        //Se añade el artículo al carrito
        let talla=$( ".tallaProduct option:selected" ).text();
        carrito.addToCart(item,talla,1);

        //Se añade a local storage
        localStorage.setItem('carrito',  JSON.stringify(carrito.getCarrito()));
        sustituirUsuario(usu.id);
        }else{
            alert("Debes iniciar sesión para añadir un artículo al carrito");
        }
    })
    .appendTo(info);
}

/**
 * Sustituye un usuario dado en localStorage por el mismo usuario con el carrito actualizado
 * @param {String} id id del usuario a actualizar
 */
function sustituirUsuario(id){
    //Se sustituye el carrito por el actual
    usu.carrito=JSON.stringify(carrito.getCarrito());

    listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));

    for (let i = 0; i < listaUsuarios.length; i++) {
        const usuario = listaUsuarios[i];
        if (usuario.id == id) {
            //Se elimina el usuario desactualizado
            listaUsuarios.splice(i, 1);
            //Se añade el usuario con el nuevo carrito
            listaUsuarios.push(usu);
            //Se devuelve al localStorage
            localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
        } 
    }
}