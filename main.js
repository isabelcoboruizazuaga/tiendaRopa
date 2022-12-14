window.onload = () => {

    //Click events para las categorías
    $(".art-all").click(() => { requestAllProducts(); })
    $(".art-mujer").click(() => { requestAllProducts("/category/women's clothing"); })
    $(".art-hombre").click(() => { requestAllProducts("/category/men's clothing"); })
    $(".art-jewele").click(() => { requestAllProducts("/category/jewelery"); })

    //Click event del carrito
    $("#carro").click(() => { showCart(); });

    /*let carrito= new CarritoCompra();
    let articulo={id:1,title:"Jacket",description:"azul"};
    carrito.addToCart(articulo,"L",1);
    
    carrito.addToCart(articulo,"L",2);    
    
    articulo={id:2,title:"Jacket",description:"azul"};
    carrito.addToCart(articulo,"L",1);

    carrito.changeTalla(2,"L","S");
    carrito.changeTalla(1,"L","XL");

    carrito.changeCantidad(1,"XL",10);
    console.log(carrito.getCarrito());*/
}
