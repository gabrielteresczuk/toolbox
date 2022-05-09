    //NUEVO creamos una clase para manejar las busquedas, para filtrar mas facil
    class Busquedas {
        constructor(nombre,marca,oferta,ultimo,usado,precio){
            this.nombre = nombre
            this.marca = marca
            this.oferta = oferta
            this.ultimo = ultimo
            this.usado = usado
            this.precio = precio
        }
    }

    let busquedas = new Busquedas("","",false,false,false,0);


function borrarBusqueda(borrar){

    if(borrar == "nombre"){
        busquedas.nombre="";
    }
    if(borrar == "marca"){
        busquedas.marca ="";
    }
    if(borrar == "oferta"){
        busquedas.oferta = false;
    }
    if(borrar == "ultimo"){
        busquedas.ultimo = false;
    }
    if(borrar == "usado"){
        busquedas.usado = false;
    }
    if(borrar == "precio"){
        busquedas.precio = 0;
    }

    filtro();
}


//filtros de productos
function filtro(){

    user_icon.style.backgroundColor = "transparent";
    carrito_icon.style.backgroundColor = "transparent";

    let productos_filtrados = [...productos_array];

    if(busquedas.nombre){
        productos_filtrados = productos_array.filter((el)=>{
            return el.nombre.toLowerCase().includes(busquedas.nombre.toLowerCase());
        });
    }

    if(busquedas.marca){
        productos_filtrados= productos_filtrados.filter(function(el){
            return el.marca == busquedas.marca;
        });
    }

    if(busquedas.oferta){
        productos_filtrados= productos_filtrados.filter(function(el){
            return el.oferta > 0;
        });
    }

    if(busquedas.ultimo){
        productos_filtrados= productos_filtrados.filter(function(el){
            return el.unidad <= 3;
        });
    }

    if(busquedas.usado){
        productos_filtrados= productos_filtrados.filter(function(el){
            return el.usado;
        });
    }

    if(busquedas.precio){
        productos_filtrados= productos_filtrados.filter(function(el){
            return el.precio <= parseInt( busquedas.precio);
        });
    }

    productos(productos_filtrados);

}

//funcion para ordenar los resultados segun se elija la opcion
function ordenar(txt,productosAOrdear){
    let orden = txt;
    let productos_busqueda = [...productosAOrdear];

    if(orden == "menor"){
        productos_busqueda.sort((a,b) => (a.precio > b.precio) ? 1 : ((b.precio > a.precio) ? -1 : 0));
        productos(productos_busqueda,"menor");
    }
    else if(orden == "mayor"){
        productos_busqueda.sort((a,b) => (a.precio < b.precio) ? 1 : ((b.precio < a.precio) ? -1 : 0));
        productos(productos_busqueda,"mayor");
    }

}