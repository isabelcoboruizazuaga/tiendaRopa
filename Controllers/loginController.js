/**
 * Rellena el html con la vista de iniciar sesión
 */
function showLogin() {
    let main = $("main");
    main.empty();

    /*Sección*/
    let login = $("<section>")
        .addClass("login")
        .appendTo(main);

    let form = $("<form>")
        .addClass("inicioSesionForm")
        .appendTo(login);

    //Fieldset
    let fieldSesion = $("<fieldset>")
        .appendTo(form);

    $("<legend> Inicia sesión</legend>")
        .appendTo(fieldSesion);

    let div1 = $("<div>")
        .appendTo(fieldSesion);
    $("<label> Nombre de usuario:</label>")
        .attr("for", "usernameLogin")
        .appendTo(div1);
    $("<input>")
        .attr("type", "text")
        .attr("id", "usernameLogin")
        .attr("name", "usernameLogin")
        .attr("required", true)
        .appendTo(div1);

    let div2 = $("<div>")
        .appendTo(fieldSesion);
    $("<label> Contraseña:</label>")
        .attr("for", "passwordLogin")
        .appendTo(div2);
    $("<input>")
        .attr("type", "password")
        .attr("id", "passwordLogin")
        .attr("name", "passwordLogin")
        .attr("required", true)
        .appendTo(div2);


    let submit = $("<input>")
        .attr("type", "submit")
        .attr("value", "Iniciar sesión")
        .click(function () {
            iniciaSesion();
            return false;
        })
        .appendTo(form);

}

/**
 * Realiza una petición a la api para iniciar sesión
 */
function iniciaSesion() {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = respuestaSesion;

    httpRequest.open("POST", "https://fakestoreapi.com/auth/login");

    //Obtenemos el nombre de usuario y contraseña
    let username = $("#usernameLogin").val();
    let password = $("#passwordLogin").val();

    //La api no acepta otros por lo que usamos los predeterminados
    httpRequest.send(JSON.stringify({
        username: "mor_2314",
        password: "83r5^_"
    }));
}

/**
 * Recoge la respuesta de iniciar sesión
 * (al fallar la api los datos se mockean)
 * @see compruebaUsu
 */
function respuestaSesion() {
    //Aquí supuestamente la api devuelve un código si el inicio es correcto pero falla
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var datos = JSON.parse(httpRequest.responseText);
            let codigo = datos.token;

        }
    }
    //Como no hay respuesta por el CORS simulamos que el inicio es correcto
    compruebaUsu($("#usernameLogin").val(), $("#passwordLogin").val());

}

/**
 * Comprueba si un usuario está en la base de datos local para iniciar sesión
 * @param {String} username 
 * @param {String} password 
 */
function compruebaUsu(username, password) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        if (usuario.username == username && usuario.password == password) {
            usu = usuario;

            alert("Sesión iniciada");

            //Edición del menú de enlaces
            let enlaces = $(".enlaces")
                .empty();

            $("<p> Cerrar Sesión</p>")
                .attr("id", "cerrarSesion")
                .click(cerrarSes)
                .appendTo(enlaces);

            $("<i>")
                .addClass("fa-solid fa-cart-shopping")
                .attr("id", "carro")
                .click(() => { showCart(); })
                .appendTo(enlaces);

            //Redirección al menú principal
            requestAllProducts();
        } else {
            showLogin();
            $("<p>El usuario o contraseña no son correctos </p>")
                .attr("id", "failSesion")
                .appendTo(".inicioSesionForm");
        }
    }
}

/**
 * Cierra la sesión de un usuario
 */
function cerrarSes() {
    usu = "";

    let enlaces = $(".enlaces")
        .empty();

    $("<p> Inicio sesión</p>")
        .attr("id", "iniciarSesion")
        .click(() => { showLogin(); })
        .appendTo(enlaces);
    $("<p> Registro</p>")
        .attr("id", "registrarse")
        .click(() => { showRegister(); })
        .appendTo(enlaces);
    $("<i>")
        .addClass("fa-solid fa-cart-shopping")
        .attr("id", "carro")
        .click(() => { showCart(); })
        .appendTo(enlaces);

    //Redirección al menú principal
    requestAllProducts();
}