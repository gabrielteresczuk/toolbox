 //muestra las compras cargadas al carrito
    function carritoDeCompras(){

        carrito_icon.style.backgroundColor = "#00695C";
        user_icon.style.backgroundColor = "transparent";

        let texto = "";

        if(compras_array.length == 0){
        // si no hay compras, el carrito estara vacio
            texto = `
            <div class="carrito_cont">
            <h2>Carrito</h2>
            <p>El carrito se encuentra vacio</p>
            </div>
            `;

            carrito_num.innerHTML = "";
            carrito_num.className ="";

        }else{

                let carrito_total = 0;

                texto = `
                <div class="carrito_cont">
                <h2>Carrito</h2>

                <table class="carrito_table">
                <thead>
                <tr>
                    <th class="table_img">Imagen</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Cant</th>
                    <th>Subtotal</th>
                    <th>Eliminar</th>
                </tr>
                </thead>
                <tbody>

                `+
                    //hacemos un mapeo por cada producto seleccionado y lo cargamos a una tabla
                    compras_array.map((el,i)=>{
                        //NUEVO desestructurado
                        let {id,thumb,nombre,marca,precio,cantidad,total} = el;

                        carrito_total =  carrito_total + parseInt( total);
                        return (
                            `<tr >
                            <td class="carrito_img_td table_img">
                            <img src=img/p_thumb/${thumb} alt="" class="carrito_img">
                            </td>
                            <td >
                            <p>${nombre} ${marca}</p>
                            </td>
                            <td>
                                <p>$${precio}</p>
                            </td>
                            <td>
                            <button class="btn carrito_menos" data-index=${i} data-id=${id}>-</button>
                            <input class="input carrito_cantidad" type="number" readonly  value=${cantidad}>
                            <button class="btn carrito_mas" data-index=${i} data-id=${id}>+</button>
                            </td>
                            <td class="carrito_subtotal_td">
                                <p>$${total}</p>
                            </td>
                            <td>
                                <button class="btn_delete" data-index=${i} data-id=${id}> Eliminar</button>
                            </td>
                            </tr>`
                        )

                    }).join('')

                +`
                    </tbody>
                <tfoot>
                    <tr>
                    <td class="table_img"></td>
                    <td></td>
                    <td></td>
                    <td>TOTAL</td>
                    <td>$${carrito_total}</td>
                    <td></td>
                    </tr>
                </tfoot>
            </table>

            <div class="carrito_finalizar">
                <button class="btn2" id="carrito_volver">VOLVER</button>
                <a href="#"><button class="btn" id="finalizar"> FINALIZAR COMPRA</button></a>
            </div>
                `;

        }

        app.innerHTML=texto;

        if(compras_array.length > 0){

        //cargamos el evento, si se preciona FINALIZAR, lo carga a COMPRADOS y limpia el carrito
        const botones = document.querySelectorAll(".btn_delete");
        const volver = document.getElementById("carrito_volver");
        const finalizar = document.getElementById("finalizar");
        const carrito_mas = document.querySelectorAll(".carrito_mas");
        const carrito_menos = document.querySelectorAll(".carrito_menos");

        volver.addEventListener("click",()=>{
            filtro();
        });

        botones.forEach(boton => {
            boton.addEventListener('click', function() {

                //NUEVO, aca buscamos el producto, por su ID, para cambiar el stock
                let id =  boton.getAttribute("data-id");
                let producto = productos_array.find(
                    (buscar) => buscar.id == id
                );



                Toastify({
                    text: "⛔ Producto Eliminado con Exito", duration: 2000, close: true, gravity: "bottom", position: "right", stopOnFocus: true,
                    style: {
                      background: "#F44336",
                      border: "1px solid #FAFAFA",
                      borderRadius: "5px",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();

                let index =  boton.getAttribute("data-index");
                producto.unidad = producto.unidad + parseInt(compras_array[index].cantidad) ; 
                console.log(compras_array[index].cantidad);

                compras_array.splice( boton.getAttribute("data-index"),1);
                carrito_num.innerHTML = compras_array.length;

                localStorage.setItem("carrito",JSON.stringify(compras_array));
                carritoDeCompras();

            } 
        );
        });

        finalizar.addEventListener('click',function(){

            finalizarCompra();

        });

        //NUEVO, permitimos agregar o restar unidades en el carrito
        carrito_mas.forEach(el =>{
            el.addEventListener("click", ()=>{

                //NUEVO, aca buscamos el producto, por su ID, para cambiar el stock
                let id = el.getAttribute("data-id");
                let producto = productos_array.find(
                    (buscar) => buscar.id == id
                );

                if (producto.unidad > 0){

                producto.unidad = producto.unidad-1;
               
                Toastify({
                    text: "⚙️ Modificacion Realizada +1", duration: 1000, close: true, gravity: "bottom", position: "right",  stopOnFocus: true, 
                    style: {
                      background: "#26A69A",
                      border: "1px solid #FAFAFA",
                      borderRadius: "5px",
                    },
                    onClick: function(){} 
                  }).showToast();


                let index = el.getAttribute("data-index");
                compras_array[index].cantidad = parseInt(compras_array[index].cantidad)  +1;
                compras_array[index].total = compras_array[index].precio*compras_array[index].cantidad;
                localStorage.setItem("carrito",JSON.stringify(compras_array));
                carritoDeCompras();
                }else{
                    Toastify({
                        text: "Unidades Agotadas 😔",
                        duration: 3000,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                          background: "#26A69A",
                          border: "1px solid #FAFAFA",
                          borderRadius: "5px",
                        },
                        onClick: function(){} // Callback after click
                      }).showToast();
                }
            });
        });

        carrito_menos.forEach(el =>{
            el.addEventListener("click", ()=>{

                //NUEVO, aca buscamos el producto, por su ID, para cambiar el stock
                let id = el.getAttribute("data-id");
                let producto = productos_array.find(
                    (buscar) => buscar.id == id
                );

                    let index = el.getAttribute("data-index");
                    if (compras_array[index].cantidad>1){

                        producto.unidad = producto.unidad+1;
                        
                        Toastify({
                            text: "⚙️ Modificacion Realizada -1", duration: 1000, close: true, gravity: "bottom", position: "right",  stopOnFocus: true, 
                            style: {
                            background: "#26A69A",
                            border: "1px solid #FAFAFA",
                            borderRadius: "5px",
                            },
                            onClick: function(){} 
                        }).showToast();

                        compras_array[index].cantidad = parseInt(compras_array[index].cantidad)  -1;
                        compras_array[index].total = compras_array[index].precio*compras_array[index].cantidad;
                        localStorage.setItem("carrito",JSON.stringify(compras_array));
                        carritoDeCompras();
                    }
            });
        });

    }

    }