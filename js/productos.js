        // creamos la clase producto

        class Producto{ 
            constructor (id,nombre, marca,modelo, precio, thumb, img1, img2, img3,oferta,unidad,usado){
            this.id=id;
            this.nombre = nombre;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
            this.thumb = thumb;
            this.img1 = img1;
            this.img2 = img2;
            this.img3 = img3;
            this.oferta=oferta;
            this.unidad=unidad;
            this.usado=usado;
            }
        }
    
    
    // esta funcion imprime una vista con los productos
    function productos(productos = productos_array,orden){

        //window scroll, nos lleba al top de la pagina
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        const marcas = productos.map((el) => el.marca);
        const unicos = [];

        for(var i = 0; i < marcas.length; i++) {
        
            const elemento = marcas[i];
            
            if (!unicos.includes(marcas[i])) {
                unicos.push(elemento);
            }
            
        }

        let texto = `
        
        <div class="contenedor_productos">
            <div class="filtros_cont">
                <div class="filtros">
                    <div class="filtros_head">
                    <p>filtros<p>
                    <button class="btn_gris" id="filtro_btn">˄</button>
                    </div>
                    <div class="filtros_body" id="filtros_body">
                        <span>${productos.length} resultados</span>
                        <p>Marca<p>
                            <ul>
                            ${//cargamos todas las marcas
                                unicos.map((el) => "<li class='marca'>"+el+"</li>" ).join("")
                            }

                            </ul>
                        <p>Precio<p>
                            <ul>
                                <li class="rango_precio" data-precio="10000">Hasta 10.000</li>
                                <li class="rango_precio" data-precio="20000">Hasta 20.000</li>
                                <li class="rango_precio" data-precio="0">mas de 30.0000</li>
                            </ul>
                        <p>Rangos<p>
                        <input type="range" id="rango" min="4699" max="86640" ${busquedas.precio? "value="+busquedas.precio:""}>
                        <label for="rango" id="rango_label">rango ${busquedas.precio? "$"+busquedas.precio : ""}</label>
                    </div>
                </div>
            </div>

            <div>
                <div class="busqueda_cont">
                    <div class="busqueda" >
                        Busqueda: ${busquedas.nombre? "<span class='busqueda_pill' data-text='nombre'>"+busquedas.nombre+" <span>X</span> </span>" : "Todas"}
                        ${busquedas.marca? "<span class='busqueda_pill' data-text='marca'>"+busquedas.marca+" <span>X</span> </span>" : ""}
                        ${busquedas.oferta? "<span class='busqueda_pill' data-text='oferta'>⚡Oferta<span> X</span> </span>" : ""}
                        ${busquedas.ultimo? "<span class='busqueda_pill' data-text='ultimo'>🔥Ultimos<span> X</span> </span>" : ""}
                        ${busquedas.usado? "<span class='busqueda_pill' data-text='usado'>🔨Usados<span> X</span> </span>" : ""}
                        ${busquedas.precio? "<span class='busqueda_pill' data-text='precio'> hasta $"+busquedas.precio+"<span> X</span> </span>" : ""}
                    </div>
                    <div>
                    <i class="fa-solid fa-arrow-down-short-wide"></i>
                    <select id="busqueda_orden" class="busqueda_orden">
                        <option value="mayor" ${orden == "mayor" ? "selected":"" }>Mayor Precio</option>
                        <option value="menor" ${orden == "menor" ? "selected":"" }>Menor Precio</option>
                    </select>
                    </div>
                </div>
                <div class="grid_cards">
                `+
                        //hacemos un mapeo por cada producto, como una card
                        
                        productos.map(
                            (el)=>{
                                //NUEVO asignacion deconstructiva
                                let {id,thumb,nombre,marca,precio,oferta,unidad,usado} = el;
                                    return (
                                    `
                                        <div class="grid_item">
                                            <div class="card_cont">
                                                <div ${ unidad ? "class='card'": "class='card_agotado'"} id="card" data-id=${id}>
                                                    <div class="card_head">
                                                        
                                                        ${unidad >0 ?
                                                            oferta? "<span>⚡ "+oferta+"% OFF</span>" : ""
                                                            :""}
                                                        ${unidad >0 ?   
                                                            unidad<=3? "<span>🔥 "+unidad+"un</span>" :"" 
                                                            : "AGOTADO" }
                                                        ${unidad >0 ? 
                                                            usado? "<span>🔨 usado </span>" : "<span>✨ nuevo</span>"
                                                            : ""}
                                                        
                                                    </div>
                                                    <div>
                                                        <img src=img/p_thumb/${thumb} class="card_img" alt="...">
                                                    </div>
                                                    <div class="card_text">
                                                        <p>${nombre} ${marca}</p>
                                                        ${oferta?
                                                             "<span class='card_text_oferta'>$"+Math.round(precio*(1+(oferta/100)))+"</span> <h4> $"+precio+"</h4>"
                                                             :"<h4>$"+precio+"</h4>"
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                    )
                                }
                            ).join('') 
                        
                +`
                ${productos.length > 0?"":"<div class='sin_resultado'>No se registran productos para esta busqueda</div>"}
                </div>
            </div>
        </div>    
        `;
    
            //se carga al html
            app.innerHTML=texto;

            //por cada producto, cargamos el evento ONLICK
            const cards = document.querySelectorAll(".card");
            const cards_agotado = document.querySelectorAll(".card_agotado");
            const busqueda_orden = document.getElementById("busqueda_orden");
            const rango = document.getElementById("rango");
            const rango_precio = document.querySelectorAll(".rango_precio");
            const marca = document.querySelectorAll(".marca");
            const busquedas_pills = document.querySelectorAll(".busqueda_pill");
            const filtro_btn = document.getElementById("filtro_btn");

            cards.forEach(card => {
                card.addEventListener('click', () => verProducto(card.getAttribute("data-id")));
            });

            cards_agotado.forEach(card => {
                card.addEventListener('click', () => {

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
                );
            });

            busqueda_orden.addEventListener("change",function(){
                ordenar(busqueda_orden.value,productos);
            });

            rango.addEventListener("change",function(){
                busquedas.precio = parseInt( rango.value);
                filtro();
            });

            rango_precio.forEach(rango => {
                rango.addEventListener('click', () => {
                    busquedas.precio = parseInt( rango.getAttribute("data-precio"));
                    filtro();
                });
            });

            marca.forEach(marca => {
                marca.addEventListener('click', () => {
                    busquedas.marca = marca.textContent;
                    filtro();
                });
            });

            busquedas_pills.forEach(el => {
                el.addEventListener('click', () => borrarBusqueda(el.getAttribute("data-text")));
            });

            filtro_btn.addEventListener("click", ()=>{
                var x = document.getElementById("filtros_body");
                if (x.style.display === "none") {
                    x.style.display = "block";
                    filtro_btn.textContent = "˄";
                  } else {
                    x.style.display = "none";
                    filtro_btn.textContent = "˅";
                  } 
            });

    }