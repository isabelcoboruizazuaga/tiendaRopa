
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