
      // creamos la clase COMPRA

      class Compra{
        constructor(id,nombre,marca,precio, thumb,cantidad,total){
            this.id = id;
            this.nombre = nombre;
            this.marca = marca;
            this.precio = precio;
            this.thumb = thumb;
            this.cantidad = cantidad;
            this.total = total;
        }
    }
    // creamos un array para las compras

    let compras_array = [];

    //traemos los datos, si no existen, se crea el array vacio

    compras_array= JSON.parse( localStorage.getItem("carrito")) || [];

    //NUEVO, obtenemos la base de datos de productos del archivo JSON
    // EN CASO DE QUE NO ESTES EN UN SERVER, EL MONTA EL ARCHIVO JS, NO EL JSON, es para que igual se pueda usar.
    
    let productos_array = [];

    fetch('./productos.json')
    .then( (res) => res.json())
    .then( (data) => {
        productos_array = JSON.parse(JSON.stringify(data));
        productos();
    })
    .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        console.log('Es posible que no estes usando un SERVIDOR');
        productos_array = productosJSON;
        productos();
    })


    //agregamos los selectores
    const app = document.getElementById("app");
    const txt_buscar = document.getElementById("txt_buscar");
    const btn_buscar = document.getElementById("btn_buscar");
    const filtro_oferta = document.querySelectorAll(".filtro_oferta");
    const filtro_unidades = document.querySelectorAll(".filtro_unidades");
    const filtro_usados = document.querySelectorAll(".filtro_usados");
    const btn_user = document.getElementById("user");
    const btn_carrito = document.getElementById("carrito");
    const btn_home = document.getElementById("home");
    const carrito_icon = document.getElementById("carrito");
    const user_icon = document.getElementById("user");
    const carrito_num = document.getElementById("carrito_num");
    const productos_filtros = document.querySelectorAll(".producto_filtro");

    //agregamos los event handlers

    btn_buscar.addEventListener("click",function(){
        busquedas.nombre=txt_buscar.value;
        txt_buscar.value="";
        filtro();
    });
    filtro_oferta.forEach(elemento => {
        elemento.addEventListener('click', ()=>{
            busquedas.oferta = true;
            filtro();
        });
    });
    filtro_unidades.forEach(elemento => {
        elemento.addEventListener('click', ()=>{
            busquedas.ultimo = true;
            filtro();
        });
    });
    filtro_usados.forEach(elemento => {
        elemento.addEventListener('click', ()=>{
            busquedas.usado = true;
            filtro();
        });
    });
    //hacemos que al apretar ENTER, se envie la solicitud de busqueda
    txt_buscar.addEventListener("keyup", function(event) {
        if (event.key === 'Enter') {
            busquedas.nombre=txt_buscar.value;
            txt_buscar.value="";
            filtro();
        }
    });
    btn_user.addEventListener("click",historialDeCompras);
    btn_carrito.addEventListener("click",carritoDeCompras);
    btn_home.addEventListener("click",()=>{
        busquedas= new Busquedas("","");
        filtro();
    });
    productos_filtros.forEach(producto_filtro =>{
        producto_filtro.addEventListener('click',() => {
            busquedas.nombre=producto_filtro.textContent;
            filtro();
        });
    });

    //controla si hay productos en el carrito

    if(compras_array.length >0){
        carrito_num.className = "carrito_num";
        carrito_num.innerHTML = compras_array.length;
    }
