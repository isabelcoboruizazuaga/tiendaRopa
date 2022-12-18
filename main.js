var carrito;
var usu = "";
var listaUsuarios = [];
window.onload = () => {
    emailjs.init("9FGoHE7v3zGxA7-gg");

    let cart = JSON.parse(localStorage.getItem('carrito'));
    if (cart != null) {
        carrito = new CarritoCompra(cart);
    } else {
        carrito = new CarritoCompra();
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (usuarios != null) {
        listaUsuarios = usuarios;
    } else {
        listaUsuarios = [];
    }

    //Click events para las categorías
    $(".art-all").click(() => { requestAllProducts(); })
    $(".art-mujer").click(() => { requestAllProducts("/category/women's clothing"); })
    $(".art-hombre").click(() => { requestAllProducts("/category/men's clothing"); })
    $(".art-jewele").click(() => { requestAllProducts("/category/jewelery"); })

    //Click event del carrito
    $("#carro").click(() => { showCart(); });

    //Click events de registro e inicio de sesión
    $("#registrarse").click(() => { showRegister(); });
    $("#iniciarSesion").click(() => { showLogin(); });

}