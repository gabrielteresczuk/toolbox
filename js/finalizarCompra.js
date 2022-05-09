
 //Formulario de finalizacion de compras
   function finalizarCompra(){

    let texto;
    let carrito_total=compras_array.reduce((partialSum, el) => partialSum + el.total, 0);



    texto = `
    <div class="compras_cont">
    <h2>Finalizar Compra</h2>

        <div class="finalizar_compra_grid">

            <div class="finalizar_compra_grid_col">
            <h3>Resumen</h3>
                <table class="carrito_table">
                <thead>
                <tr>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Cant</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>

                `+
                
                    //hacemos un mapeo por cada producto seleccionado y lo cargamos a una tabla
                    compras_array.map((el,i)=>{
                        //NUEVO desestructurado
                        let {nombre,marca,precio,cantidad,total} = el;
                        
                        
                        return (
                            `<tr >

                            <td >
                            <p>${nombre} ${marca}</p>
                            </td>
                            <td>
                                <p>$${precio}</p>
                            </td>
                            <td>
                            ${cantidad}
                            </td>
                            <td class="carrito_subtotal_td">
                                <p>$${total}</p>
                            </td>
                            </tr>`
                        )

                    }).join('')

                +`
                    </tbody>
                <tfoot>
                    <tr>
                    <td></td>
                    <td></td>
                    <td>TOTAL</td>
                    <td>$${carrito_total}</td>
                    </tr>
                </tfoot>
            </table>
            </div>

            <div class="finalizar_compra_grid_col">
            <h3>Datos de Facturacion</h3>
            <form class="finalizar_compra_form">
                <label for="fname">Apellido y Nombre:</label>
                <input type="text" id="fname" name="fname" value="John Doe">

                <label for="fdir">Direccion:</label>
                <input type="text" id="fdir" name="fdir" value="Calle Fake 123">

                <label for="ftel">Telefono:</label>
                <input type="text" id="ftel" name="ftel" value="3764-581122">

                <label for="fcuotas">Cuotas:</label>
                <select id="fcuotas" name="fcuotas">
                    <option value="1">1 cuota - $${carrito_total}</option>
                    <option value="2">3 cuotas - $${(carrito_total/3).toFixed(2)}</option>
                    <option value="3">6 cuotas - $${(carrito_total/6).toFixed(2)}</option>
                </select>

                <div class="finalizar_tarjeta">

                    <span class="finalizar_tarjeta_imagen">
                        <img src="img/chip.png">
                        <img src="img/visa.png">
                    </span>
                    <div class="finalizar_tarjeta_numero">
                        <label for="ftnum">Numero de Tarjeta:</label>
                        <span>
                            <span>
                                <input type="text" id="ftnum" name="ftnum" placeholder="1234" maxlength="4" size="4" class="digit4">-
                            </span>
                            <span>
                                <input type="text" id="ftnum" name="ftnum" placeholder="1234" maxlength="4" size="4" class="digit4">-
                            </span>
                            <span>
                                <input type="text" id="ftnum" name="ftnum" placeholder="1234" maxlength="4" size="4" class="digit4">-
                            </span>
                            <span>
                                <input type="text" id="ftnum" name="ftnum" placeholder="1234" maxlength="4" size="4" class="digit4">
                            </span>
                        <span>
                    </div>
                    <div class="finalizar_tarjeta_desde">
                        <label for="ftdesde">Desde/From:</label>
                        <span>
                            <span>
                                <input type="text" id="ftdesde1" name="fdesde1" placeholder="08" maxlength="2" size="2" class="digit2">/
                            </span>    
                            <span>
                                <input type="text" id="ftdesde2" name="fdesde2" placeholder="22" maxlength="2" size="2" class="digit2">
                            </span>    
                        </span> 
                    </div>
                    <div class="finalizar_tarjeta_hasta">
                        <label for="fthasta">Hasta/Thru:</label>
                        <span>
                            <span>
                                <input type="text" id="fthasta1" name="fhasta1" placeholder="08" maxlength="2" size="2" class="digit2">/
                            </span>    
                            <span>
                                <input type="text" id="fthasta2" name="fhasta2" placeholder="25" maxlength="2" size="2" class="digit2">
                            </span>    
                        </span> 
                    </div>
                    <div class="finalizar_tarjeta_cvc">
                        <label for="ftcvc">CVC</label>
                        <input type="text" id="ftcvc" name="ftcvc" placeholder="777" maxlength="3" size="3" class="digit3">
                    </div>
                    <div class="finalizar_tarjeta_nombre">
                        <label for="ftnombre">nombre</label>
                        <input type="text" id="ftnombre" name="ftnombre" placeholder="John Doe">
                    </div>

                </div>

            </form>

        </div>

        </div>

        <div class="carrito_finalizar">
            <button class="btn2" id="finalizar_volver">VOLVER</button>
            <a href="#"><button class="btn" id="finalizar_finalizar"> FINALIZAR COMPRA</button></a>
        </div>

    </div>

    `;

    app.innerHTML=texto;

    const btn_volver = document.getElementById("finalizar_volver");
    const btn_finalizar = document.getElementById("finalizar_finalizar");

    btn_volver.addEventListener("click",()=>{carritoDeCompras()});{}

    btn_finalizar.addEventListener("click",()=>{


        const comprobarPago = () =>{

            let loading = `
            <div class="compras_cont">
            <h2>Verificacion</h2>
                <div class="loading_cont">
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    <h2>Comprobando Informacion</h2>
                </div>
            </div>
            `;

            app.innerHTML=loading;

            console.log("loading...");
            return new Promise ((resolve,reject) => {
                setTimeout(()=>{resolve("resuelto")},3000);
            })
        }
    
        comprobarPago()
        .then((res)=>{
            
            Toastify({
                text: "🚀 Compra finalizada con Exito",
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

                    
            //NUEVO, creamos un objeto para guardar la fecha en el paquete de la compra
            const d = new Date();
            let fecha = (d.getFullYear() + "-" + (d.getMonth() + 1) + "-"+ d.getDate()+ " "+ d.getHours()+":"+d.getMinutes());

            historial.push(new Historial(fecha,compras_array));
            localStorage.setItem("carrito",JSON.stringify(compras_array));
            
            //guardamos el array como JSON, en el local storage

            localStorage.setItem("historial",JSON.stringify(historial));
            compras_array = [];
            localStorage.removeItem("carrito");
            carrito_num.innerHTML = "";
            carrito_num.className ="";
            historialDeCompras();

        });


    });

}

