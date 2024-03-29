function showProducts(products) {
  let prodDestacados = [];
  prodDestacados = products.filter((element) => {
    if (element.destacado !== false) {
      return products;
    };
  });

  const carouselBox = document.getElementById('content');
  let slidesHtml = ``;

  prodDestacados.forEach(item => {
    if(item.porciones === true){
      slidesHtml += `
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
              <a href="/product/${item._id}" class="btn btn-dark btnInx" type="button">Ver opciones</a>
            </li>
          </ul>
        </div>
        `
    } else {
      slidesHtml += `
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
  carouselBox.innerHTML = slidesHtml;
};

//Obtener los productos al cargar la página de inicio
window.onload = async () => {
  const products = await (await fetch('/api/getproducts')).json();

  showProducts(products);
};


//Slider destacados.

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