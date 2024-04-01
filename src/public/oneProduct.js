//Mostrar producto seleccionado / Petición GET, obtener producto.
function showProduct(product) {
    let productsHTML = "";
    if(product.offerprice !== undefined && product.offerprice !== null){
        productsHTML +=
        `
        <div class="contendor-Product">
            <div class="contenedorImg">
                <img src="${product.path}">
            </div>
            <div class="card-2">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><h1>${product.name}</h1></li>
                    <li class="list-group-item text-muted" style="display: none;">
                        Id: ${product._id}
                    </li>
                    <li class="list-group-item" id="priceProduct">
                        <p class="text-muted" style="font-size: 15px; text-decoration:line-through;">
                            $ ${product.price}
                        </p>
                        <p style="margin-left: 20px;">
                            <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" 
                                  style="margin-left: 30%;">
                                Oferta
                                <span class="visually-hidden">En oferta</span>
                            </span>
                            $ ${product.offerprice}
                        </p>
                    </li>
                    <li class="list-group-item" style="display: none;">stock: ${product.stock}</li>
                    <button onclick="añadirAlCarrito('${product._id}')" 
                            class="btn btn-large btn-danger" 
                            type="button">
                            [+] Agregar a mi Canasta</button>
                    <li class="list-group-item"><b>Descripción: </b>${product.description}</li>
                    <li class="list-group-item"><b>Las imágenes son ilustrativas y los cortes de los productos son aproximados, siempre intentando ser lo más certeros posibles, por lo que el precio final de la compra puede variar. </b></li>
                </ul>
            </div>
        </div>
        `
    } else {
        if (product.porciones === true){
            var pricePorcion = (Number(product.porcion1) * Number(product.price))/ 1000;
            productsHTML +=
            `
            <div class="contendor-Product">
                <div class="contenedorImg">
                    <img src="${product.imageUrl}">
                </div>
                
                <div class="productData">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h1>${product.name}</h1></li>
                        <li class="list-group-item text-muted" style="display: none;">Id: ${product._id}</li>
                        <li class="list-group-item">Seleccione una opción: 
                            <select id="prodPorcion" onchange="changePorcionPrice(${product.price})">
                                <option value="${product.porcion1}">${product.porcion1} grs.</option>
                                <option value="${product.porcion2}">${product.porcion2} grs.</option>
                                <option value="${product.porcion3}">${product.porcion3} grs.</option>
                            </select>
                        </li>
                        <span id="stockText" class="stockText"></span>
                        <li class="list-group-item" id="priceProduct">$ ${pricePorcion}</li>
                        <li class="list-group-item" style="display: none;">stock: ${product.stock}</li>
                        <button onclick="añadirAlCarrito('${product._id}')" class="btn btn-large btn-danger" id="buy-Btn" type="button">[+] Agregar a mi Canasta</button>
                        <li class="list-group-item"><b>Descripción: </b>${product.description}</li>
                        <li class="list-group-item"><b>Las imágenes son ilustrativas y los cortes de los productos son aproximados, siempre intentando ser lo más certeros posibles, por lo que el precio final de la compra puede variar. </b></li>
                    </ul>
                </div>
            </div>
            `

        } else {
            productsHTML +=
            `
            <div class="contendor-Product">
                <div class="contenedorImg">
                    <img src="${product.imageUrl}">
                </div>
                
                <div class="productData">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h1>${product.name}</h1></li>
                        <li class="list-group-item text-muted" style="display: none;">Id: ${product._id}</li>
                        <span id="stockText" class="stockText"></span>
                        <li class="list-group-item" id="priceProduct">$ ${product.price}</li>
                        <li class="list-group-item" style="display: none;">stock: ${product.stock}</li>
                        <button onclick="añadirAlCarrito('${product._id}')" id="buy-Btn" class="btn btn-large btn-danger" type="button">[+] Agregar a mi Canasta</button>
                        <li class="list-group-item"><b>Descripción: </b>${product.description}</li>
                        <li class="list-group-item"><b>Las imágenes son ilustrativas y los cortes de los productos son aproximados, siempre intentando ser lo más certeros posibles, por lo que el precio final de la compra puede variar. </b></li>
                    </ul>
                </div>
            </div>
            `
        }
    };

    document.getElementById('productBox').innerHTML = productsHTML;

    if(product.nostock === true){

     document.getElementById('priceProduct').innerHTML = 'SIN STOCK';
        document.getElementById('prodPorcion').setAttribute('disabled', 'true');
        document.getElementById('buy-Btn').setAttribute('disabled', 'true');
    };

    getRelatedProducts(product.category);
};

//Obtener los productos al cargar la página de inicio
window.onload = async () => {

    let idProd = document.getElementById('id-prod').innerHTML;
    const product = await (await fetch('/api/getproducts/' + idProd)).json();
    showProduct(product);

    const mediaMax480 = window.matchMedia("(max-width: 480px)");
    const mediaMin481 = window.matchMedia("(min-width: 481px)");

    if(mediaMax480.matches){
        var swiper = new Swiper(".swiperMobile", {
            slidesPerView: 2,
            spaceBetween: 0,
            slidesPerGroup: 2,
            loop: true,
            loopFillGroupWithBlank: false,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    };

    if(mediaMin481.matches){
            var swiper = new Swiper(".swiperMobile", {
                slidesPerView: 2,
                spaceBetween: 0,
                slidesPerGroup: 2,
                loop: true,
                loopFillGroupWithBlank: false,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        };


const contenedorImg = document.querySelector('.contenedorImg');
    const imgElmt = document.querySelector('.contenedorImg img');
    const imgZoom = 130;

    if(contenedorImg && imgElmt){
        contenedorImg.addEventListener('mouseenter', function(){
            imgElmt.style.width = imgZoom + '%';
        });

        contenedorImg.addEventListener('mouseleave', function(){
            imgElmt.style.width = '100%';
            imgElmt.style.top = '0';
            imgElmt.style.left = '0';
        });

        contenedorImg.addEventListener('mousemove', function(mouseEvent){
            let obj = contenedorImg;
            let obj_left = 0;
            let obj_top = 0;
            let xpos;
            let ypos;

            while (obj.offsetParent){
                obj_left += obj.offsetLeft;
                obj_top += obj.offsetTop;
                obj = obj.offsetParent;
            }

            if(mouseEvent){
                xpos = mouseEvent.pageX;
                ypos = mouseEvent.pageY;
            } else {
                xpos = window.Event.x + document.body.scrollLeft - 2;
                ypos = window.Event.y + document.body.scrollTop - 2;
            }
            xpos -= obj_left;
            ypos -+ obj_top;

            const imgWidth = imgElmt.clientWidth;
            const imgHeight = imgElmt.clientHeight;

            imgElmt.style.top = -(((imgHeight - this.clientHeight)* ypos) / this.clientHeight) + 'px';
            imgElmt.style.left = -(((imgWidth - this.clientWidth)* xpos) / this.clientWidth) + 'px';
        });

        function changeHeight(){
            contenedorImg.style.height = contenedorImg.clientWidth + 'px'; 
        };

        changeHeight();

        window.addEventListener('resize', changeHeight);
    };

};

async function getRelatedProducts(prodCategory) {
    const related = await (await fetch(`/api/getrelatedproducts/${prodCategory}`)).json();
    let relatedHTML = ``;

    related.forEach(item => {
        if(item.porciones === true){
            relatedHTML += `
              <div class="item">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                  <a href="/product/${item._id}">
                      <img type="button" src="${item.imageUrl}" style="width: 100%;">
                  </li>
                  <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center name_idx"><h2>${item.name}</h2></li>
                  <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center price_idx">$ ${item.price}</li>
                  </a>
                  <li class="flex-row flex-nowrap btnItem">
                    <a href="/product/${item._id}" class="btn btn-dark" type="button">Ver opciones</a>
                  </li>
                </ul>
              </div>
              `
          } else {
            relatedHTML += `
              <div class="item">
                <ul class="list-group list-group-flush">
                 <li class="list-group-item">
                   <a href="/product/${item._id}">
                     <img type="button" src="${item.imageUrl}" style="width: 100%;">
                 </li>
                   <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center name_idx"><h2>${item.name}</h2></li>
                   <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center price_idx">$ ${item.price}</li>
                    </a>
                  <li class="flex-row flex-nowrap btnItem">
                    <button onclick="añadirAlCarrito('${item._id}')"  class="btn btn-dark btnInx" type="button" id="bt1${item._id}">Comprar <i class="fa-solid fa-basket-shopping"></i></button>
                   </li>
                </ul>
              </div>
              `
          }
    });
    document.getElementById('content').innerHTML = relatedHTML;
};

function changePorcionPrice(priceProd){
    var porcion = document.getElementById('prodPorcion').value;

    var pricePorcion = Math.ceil((Number(porcion) * Number(priceProd))/ 1000);
    document.getElementById('priceProduct').innerHTML = `$ ${pricePorcion}`;
};

//Slider relacionados.

const gap = 16;

const carousel = document.getElementById("carousel");
const content = document.getElementById("content");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));