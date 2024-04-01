function showProducts(products, page) {
    document.getElementById('btnCleanSearch').classList.add('ocultarBtn');
    let productsHTML = "";
    let perPage = 15;
    let index = page * perPage -12;
    let end = index + perPage;
    let productosPerPage = products.slice(index, end);
    let totalPages = products.length / perPage;
    totalPages = Math.ceil(totalPages);
    let pagesHTML = "";

    for(i=1; i <= totalPages; i++){
        pagesHTML += 
        `
        <li class="page-item" id="pageLink${i}"><a class="page-link" href="/productos/?page=${i}">${i}</a></li>
        `;
    };
    document.getElementById('pagesList').innerHTML = pagesHTML;
    document.getElementById(`pageLink${page}`).classList.add('active');

    productosPerPage.forEach(element => {
        if(element.offerprice !== undefined && element.offerprice !== null){
            productsHTML +=
            `
            <div class="card-3">
                <ul class="list-group list-group-flush">
                    <a href="/product/${element._id}" method="GET">
                    <li class="list-group-item">
                        <img type="button" src="${element.path}">
                    </li>
                    <li class="list-group-item d-flex flex-nowrap justify-content-evenly align-items-center price">
                        <p class="text-muted" style="font-size: 15px; text-decoration:line-through;">
                            $ ${element.price}
                        </p>
                        <p>
                            <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style="margin-left: 80%;">
                            Oferta
                                <span class="visually-hidden">En oferta</span>
                            </span>
                            $ ${element.offerprice}
                        </p>
                    </li>
                    <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center">
                        <h2 class="card-title">${element.name}</h2>
                    </li>
                    </a>
                    <li class="d-flex flex-row flex-nowrap align-items-center btnBox">
                        <button onclick="añadirAlCarrito('${element._id}')" class="btn btn-danger" type="button" id="bt1${element._id}">Añadir a mi Canasta</button>
                    </li>
                </ul>
            </div>
            `
        } else {
            productsHTML +=
            `
            <div class="card-3">
                <ul class="list-group list-group-flush">
                    <a href="/product/${element._id}" method="GET">
                    <li class="list-group-item">
                        <img type="button" src="${element.path}">
                    </li>
                    <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center price">
                        <p>$ ${element.price}</p>
                    </li>
                    <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center">
                        <h2 class="card-title">${element.name}</h2>
                    </li>
                    </a>
                    <li class="d-flex flex-row flex-nowrap align-items-center btnBox">
                        <button onclick="añadirAlCarrito('${element._id}')" class="btn btn-danger" type="button" id="bt1${element._id}">Añadir a mi Canasta</button>
                    </li>
                </ul>
            </div>
            `
        }
    });
    document.getElementById('productsBox').innerHTML = productsHTML;
};

function mostrarProductosBuscados(products, page, busqueda){
    busqueda = busqueda.toLowerCase();
    let contenidoHTML = '';

    document.getElementById('btnCleanSearch').classList.remove('ocultarBtn');

    let productoBuscado = products.filter(element => quitarTildes(element.name).toLowerCase().includes(busqueda) || quitarTildes(element.category).toLowerCase().includes(busqueda)); //Devuelve un array con los productos filtrados
    let perPage = 12;
    let index = page * perPage -12;
    let end = index + perPage;
    let productosBuscadosPerPage = productoBuscado.slice(index, end);
    let totalPages = productoBuscado.length / perPage;
    totalPages = Math.ceil(totalPages);
    let pagesHTML = "";
    for(i=1; i <= totalPages; i++){
        pagesHTML += 
        `
        <li class="page-item" id="pageLink${i}"><a class="page-link" href="/productos/?busqueda=${busqueda}&page=${i}">${i}</a></li>
        `;
    };
    document.getElementById('pagesList').innerHTML = pagesHTML;
    document.getElementById(`pageLink${page}`).classList.add('active');

    productosBuscadosPerPage.forEach(element => {
        if(element.offerprice !== undefined && element.offerprice !== null){
            contenidoHTML +=
            `
            <div class="card-3">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                    <a href="/product/${element._id}" method="GET">
                        <img type="button" src="${element.path}">
                    </li>
                    <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center price">
                        <p class="text-muted" style="font-size: 15px; text-decoration:line-through;">
                            $ ${element.price}
                        </p>
                        <p>
                            <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style="margin-left: 80%;">
                            Oferta
                                <span class="visually-hidden">En oferta</span>
                            </span>
                            $ ${element.offerprice}
                        </p>
                    </li>
                    <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center">
                        <h2 class="card-title">${element.name}</h2>
                    </li>
                    </a>
                    <li class="d-flex flex-row flex-nowrap align-items-center btnBox">
                        <button onclick="añadirAlCarrito('${element._id}')" class="btn btn-danger" type="button" id="bt1${element._id}">Añadir a mi Canasta</button>
                    </li>
                </ul>
            </div>
            `
        } else {
            contenidoHTML +=
            `
            <div class="card-3">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                    <a href="/product/${element._id}" method="GET">
                        <img type="button" src="${element.path}">
                    </li>
                    <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center price">
                    $ ${element.price}</li>
                    <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center">
                        <h2 class="card-title">${element.name}</h2>
                    </li>
                    </a>
                    <li class="d-flex flex-row flex-nowrap align-items-center btnBox">
                        <button onclick="añadirAlCarrito('${element._id}')" class="btn btn-danger" type="button" id="bt1${element._id}">Añadir a mi Canasta</button>
                    </li>
                </ul>
            </div>
            `
        }
    });
    document.getElementById('productsBox').innerHTML = contenidoHTML;
};

//Obtener los productos al cargar la página de inicio
window.onload = async () => {
    let page = new URLSearchParams(window.location.search).get('page');
    let valorDeBusqueda = new URLSearchParams(window.location.search).get('busqueda');
    let products = await (await fetch(`/api/getproducts`)).json();

    if(valorDeBusqueda !== null){
        mostrarProductosBuscados(products, page, valorDeBusqueda);
    } else {
        showProducts(products, page);
    };
};

function quitarTildes(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
};

//Funcion de boton Menu

document.querySelector('.first-button').addEventListener('click', function () {

    document.querySelector('.animated-icon1').classList.toggle('open');
});


