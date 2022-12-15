window.onload = () => {
    let cart=JSON.parse(localStorage.getItem('carrito'));
    console.log(cart);
    if(cart!=null){
        carrito= new CarritoCompra(cart);
    }else{
        carrito= new CarritoCompra()
    }
    

    //Click events para las categorías
    $(".art-all").click(() => { requestAllProducts(); })
    $(".art-mujer").click(() => { requestAllProducts("/category/women's clothing"); })
    $(".art-hombre").click(() => { requestAllProducts("/category/men's clothing"); })
    $(".art-jewele").click(() => { requestAllProducts("/category/jewelery"); })

    //Click event del carrito
    $("#carro").click(() => { showCart(); });

    /*let carrito= new CarritoCompra();
    let articulo={id:98,title:"Jacket",description:"azul"};
    carrito.addToCart(articulo,"L",1);
    
    carrito.addToCart(articulo,"L",2);    
    
    articulo={id:99,title:"Jacket",description:"azul"};
    carrito.addToCart(articulo,"L",1);

    carrito.changeTalla(99,"L","S");
    carrito.changeTalla(98,"L","XL");

    carrito.changeCantidad(99,"XL",10);*/



}

var carrito;