    // para almacenar el historial, con una fecha
    class Historial{
            constructor(fecha,array_compras){
                this.fecha = fecha;
                this.array_compras = array_compras;
            }
    }

    let historial = [];
    historial= JSON.parse( localStorage.getItem("historial")) || [];
    
    
    //mostramos el historial con las compras FINALIZADAS, luego que pasan por el carrito
    function historialDeCompras(){


        user_icon.style.backgroundColor = "#00695C";
        carrito_icon.style.backgroundColor = "transparent";

        let texto;

        if(historial.length == 0){
            texto = `
            <div class="compras_cont">
            <h2>Historial de Compras</h2>
            <p>El usuario no registra compras</p>
            </div>
        
            `;

        }else{

            texto = `
            <div class="compras_cont">
            <h2>Historial de Compras</h2>

            `+
            //cargamos el mapeo, de todos los productos, agrupados por packetes.

            historial.map(
                (el)=>{
                    let compras_total = 0;
                    return (
                        `<div class="compras">
                        <p>${el.fecha}</p>
                        <hr class="hr">
                        <table class="carrito_table">
                        <thead>
                        <tr>
                            <th class="table_img">Imagen</th>
                            <th>Descripcion</th>
                            <th>Cant</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>`+
        
                        el.array_compras.map((value)=>{
                            //NUEVO desestructuracion
                            let {thumb,nombre,marca,cantidad,precio,total} = value;
                            compras_total =  compras_total + parseInt( total);
                            return (
                                `
                                <tr >
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
                                    ${cantidad}
                                </td>
                                <td class="carrito_subtotal_td">
                                    <p>$${total}</p>
                                </td>
                                </tr>
                                `
                            );
                        }).join('')

                    +`
                        </tbody>
                        <tfoot>
                            <tr>
                            <td class="table_img"></td>
                            <td></td>
                            <td></td>
                            <td>TOTAL</td>
                            <td>$${compras_total}</td>
                            </tr>
                        </tfoot>
                    </table>
                    </div> `
                    );
                }
                ).join('')

            +`  <div class="btn_right">
                <button class="btn_delete" id="limpiarHistorial"> Limpiar Historial - TESTING</button>
                <div>
            </div>
            `;
        }
        
        app.innerHTML=texto;

        if(historial.length > 0){
            //boton para eliminar el historial
            limpiarHistoria = document.getElementById("limpiarHistorial");

            limpiarHistoria.addEventListener("click",function(){
                localStorage.removeItem("compras");
                localStorage.removeItem("historial");

                historial=[];
                historialDeCompras();
            });
        }

    }
