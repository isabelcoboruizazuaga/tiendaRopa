function showRegister() {
    let main = $("main");
    main.empty();

    /*Sección*/
    let registro = $("<section>")
        .addClass("registro")
        .appendTo(main);

    let form = $("<form>")
        .appendTo(registro);

    //Fieldsets
    showFielsetSesion(form);
    showFielsetPersonal(form);
    showFielsetDireccion(form);

        
    let submit=$("<input>")
    .attr("type","submit")
    .attr("value","Registrarme")
    .click(function () {
        addUser();
        return false;
    })
    .appendTo(form);
    
}
function showFielsetSesion(form){
    let fieldSesion=$("<fieldset>")
    .appendTo(form);
    
    $("<legend> Datos de sesión</legend>")
    .appendTo(fieldSesion);

    let div1=$("<div>")
    .appendTo(fieldSesion);    
    $("<label> Correo electrónico:</label>")
    .attr("for","email")
    .appendTo(div1);
    $("<input>")
    .attr("type","email")
    .attr("id","email")
    .attr("name","email")
    .attr("required", true)
    .appendTo(div1);

    let div2=$("<div>")
    .appendTo(fieldSesion);    
    $("<label> Nombre de usuario:</label>")
    .attr("for","username")
    .appendTo(div2);
    $("<input>")
    .attr("type","text")
    .attr("id","username")
    .attr("name","username")
    .attr("required", true)
    .appendTo(div2);

    let div3=$("<div>")
    .appendTo(fieldSesion);    
    $("<label> Contraseña:</label>")
    .attr("for","password")
    .appendTo(div3);
    $("<input>")
    .attr("type","password")
    .attr("id","password")
    .attr("name","password")
    .attr("required", true)
    .appendTo(div3);
}

function showFielsetPersonal(form){
    let fieldPersonal=$("<fieldset>")
    .appendTo(form);

    $("<legend> Datos personales</legend>")
    .appendTo(fieldPersonal);

    let div1=$("<div>")
    .appendTo(fieldPersonal);    
    $("<label> Nombre:</label>")
    .attr("for","nombre")
    .appendTo(div1);
    $("<input>")
    .attr("type","text")
    .attr("id","nombre")
    .attr("name","nombre")
    .attr("required", true)
    .appendTo(div1);

    let div2=$("<div>")
    .appendTo(fieldPersonal);    
    $("<label> Apellidos:</label>")
    .attr("for","apellidos")
    .appendTo(div2);
    $("<input>")
    .attr("type","text")
    .attr("id","apellidos")
    .attr("name","apellidos")
    .attr("required", true)
    .appendTo(div2);
    
    let div3=$("<div>")
    .appendTo(fieldPersonal);    
    $("<label> Teléfono:</label>")
    .attr("for","tel")
    .appendTo(div3);
    $("<input>")
    .attr("type","number")
    .attr("id","tel")
    .attr("name","tel")
    .appendTo(div3);
}

function showFielsetDireccion(form){
    let fieldDirec=$("<fieldset>")
    .appendTo(form);

    $("<legend> Dirección</legend>")
    .appendTo(fieldDirec);

    let div1=$("<div>")
    .appendTo(fieldDirec);    
    $("<label> Ciudad:</label>")
    .attr("for","ciudad")
    .appendTo(div1);
    $("<input>")
    .attr("type","text")
    .attr("id","ciudad")
    .attr("name","ciudad")
    .appendTo(div1);

    let div2=$("<div>")
    .appendTo(fieldDirec);    
    $("<label> Calle:</label>")
    .attr("for","calle")
    .appendTo(div2);
    $("<input>")
    .attr("type","text")
    .attr("id","calle")
    .attr("name","calle")
    .appendTo(div2);
    
    let div3=$("<div>")
    .appendTo(fieldDirec);    
    $("<label> Número:</label>")
    .attr("for","numero")
    .appendTo(div3);
    $("<input>")
    .attr("type","number")
    .attr("id","numero")
    .attr("name","numero")
    .appendTo(div3);

    
    let div4=$("<div>")
    .appendTo(fieldDirec);    
    $("<label> Código postal:</label>")
    .attr("for","zip")
    .appendTo(div4);
    $("<input>")
    .attr("type","number")
    .attr("id","zip")
    .attr("name","zip")
    .appendTo(div4);
}

function addUser(){
   httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = respuesta;

    let usu={
        email: $("#email").val(),
        username:$("#username").val(),
        password:$("#password").val(),
        name:{
            firstname:$("#nombre").val(),
            lastname:$("#apellidos").val()
        },
        address:{
            city:$("#ciudad").val(),
            street:$("#calle").val(),
            number:$("#numero").val(),
            zipcode:$("#zip").val(),
            geolocation:{
                lat:'0',
                long:'0'
            }
        },
        phone:$("#tel").val()
    }

    httpRequest.open("POST", "https://fakestoreapi.com/users");
    httpRequest.send(JSON.stringify(usu));
    
}

function respuesta() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var usuario = JSON.parse(httpRequest.responseText);

            //La api nos devuelve un id solo (1 o 11), como eso no me sirve lo maqueto dándole al objeto un id único
            id= usuario.id; //id que devuelve la api
            const uid = Date.now().toString(36) + Math.random().toString(36).slice(2) //id único para el usuario
            
            usu={
                id: uid,
                email: $("#email").val(),
                username:$("#username").val(),
                password:$("#password").val(),
                name:{
                    firstname:$("#nombre").val(),
                    lastname:$("#apellidos").val()
                },
                address:{
                    city:$("#ciudad").val(),
                    street:$("#calle").val(),
                    number:$("#numero").val(),
                    zipcode:$("#zip").val(),
                    geolocation:{
                        lat:'0',
                        long:'0'
                    }
                },
                phone:$("#tel").val(),
                cart:{}
            }

            //Guardo el usuario en localstorage ya que la bd de la api no sirve
            listaUsuarios.push(usu);
            localStorage.setItem('usuarios',  JSON.stringify(listaUsuarios));

            //Redirijo a iniciar sesión
            showLogin();
        } else {
            alert("There was a problem with the request.");
        }
    }
}