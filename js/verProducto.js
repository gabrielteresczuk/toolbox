    // al dar click, carga el producto seleccionado
    function verProducto(id){

        window.scrollTo({ top: 0, behavior: 'smooth' });

        let ver = productos_array.find(
            (el) => el.id == id
            );

        let texto = `
        <div class="producto">
        <div class="producto_contenedor">
            <div class="producto_menu">
                <button class="btn" id="cerrar"><i class="fa-solid fa-xmark"></i></button>
            </div>


            <div class="producto_cont">
            <div class="producto_slide">

                <div class="carousel_cont">

                    <div class="carousel_display">
                        <img id="img_display" class="fade" src="" alt="">
                        <div class="prev"><</div>
                        <div class="next">></div>
                    </div>

                    <div class="carousel_items">

                        <img class="mySlides" src="img/p_img/${ver.img1}" alt="">
                        <img class="mySlides" src="img/p_img/${ver.img2}" alt="">
                        <img class="mySlides" src="img/p_img/${ver.img3}" alt="">

                    </div>
                </div>
                
            </div>
            <div class="producto_texto">
                <div class="card_head">
                ${ver.unidad >0 ?
                    ver.oferta? "<span>⚡ "+ver.oferta+"% OFF</span>" : ""
                    :""}
                ${ver.unidad >0 ?   
                    ver.unidad<=3? "<span>🔥 "+ver.unidad+"un</span>" :"" 
                    : "AGOTADO" }
                ${ver.unidad >0 ? 
                    ver.usado? "<span>🔨 usado </span>" : "<span>✨ nuevo</span>"
                    : ""}
                </div>
                <small class="p_modelo">Modelo: ${ver.modelo}</small>
                <p class="p_titulo">${ver.nombre} ${ver.marca}</p>
                <p class="p_subtitulo">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p class="p_texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nostrum tempora corporis, labore, dicta laborum eius inventore quia mollitia sequi culpa! Harum dicta et laborum vel, sapiente asperiores ipsa deleniti!</p>
                <p class="p_precio">$${ver.precio}</p>
                <p class="p_coment">Lorem, ipsum dolor sit amet consectetur adipisicing</p>
                <div class="p_form">
                        <label for="cantidad" class="" >Cantidad</label>
                        <input type="number" id="cantidad" min="1" max=${ver.unidad} class="input" value="1"  placeholder="1">
                        <button class="btn" id="agregar">Al Carrito</button>
                </div>

            </div>
            </div>
            </div>
        </div>
        `;

        app.innerHTML=texto;

        //NUEVO cargamos el slider

            cargarSlider();

        //creamos un evento, para agregar el producto al carrito

        const agregar = document.getElementById("agregar");
        const cantidad = document.getElementById("cantidad");
        const cerrar = document.getElementById("cerrar");

        agregar.addEventListener("click",function(){

            // si hay unidades disponibles
            if (ver.unidad > 0){

                ver.unidad=ver.unidad-cantidad.value;
    
                Toastify({
                    text: "Producto agregado al Carrito 😁",
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
    
                compras_array.push(new Compra(
                    ver.id,
                    ver.nombre,
                    ver.marca,
                    ver.precio,
                    ver.thumb,
                    cantidad.value,
                    (cantidad.value * ver.precio)));
    
                localStorage.setItem("carrito",JSON.stringify(compras_array));
                carrito_num.className = "carrito_num";
                carrito_num.innerHTML = compras_array.length;
    
                verProducto(id);

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

        cerrar.addEventListener("click",()=>{filtro()});

    }