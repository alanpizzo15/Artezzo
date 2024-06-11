const productsBox = document.getElementById('prodBox');

async function showCategory(categoria) {
    
    const products = await (await fetch('/api/getproducts')).json();
    let productsHTML = "";
    
    let productsFiltered = products.filter((prod) => limpiarString(prod.category) === limpiarString(categoria) || limpiarString(prod.subcategory) === limpiarString(categoria));
   
    productsFiltered.forEach(element => {
        if (element.offerprice !== undefined && element.offerprice !== null) {
            if(element.porciones === true){
                productsHTML +=
                `
                <div class="card-1">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                        <a href="/product/${element._id}" method="GET">
                            <img type="button" src="${element.path}">
                        </li>
                        <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center price">
                            <p class="text-muted" style="font-size: 55%; text-decoration:line-through;">
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
                        <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center" style="height: 90px;">
                            <h2>${element.name}</h2>
                        </li>
                        </a>
                        <li class="d-flex flex-row flex-nowrap align-items-center btnBox">
                            <a href="/product/${element._id}" class="btn btn-dark" type="button">Ver opciones</a>
                        </li>
                    </ul>
                </div>
                `
            } else {
                productsHTML +=
                `
                <div class="card-1">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                        <a href="/product/${element._id}" method="GET">
                            <img type="button" src="${element.path}">
                        </li>
                        <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center price">
                            <p class="text-muted" style="font-size: 55%; text-decoration:line-through;">
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
                        <li class="list-group-item d-flex flex-nowrap justify-content-around align-items-center" style="height: 90px;">
                            <h2>${element.name}</h2>
                        </li>
                        </a>
                        <li class="d-flex flex-row flex-nowrap align-items-center btnBox">
                            <button onclick="añadirAlCarrito('${element._id}')" id="btn${element._id}" class="btn btn-dark" type="button"><i class="fa-solid fa-basket-shopping"></i></button>
                        </li>
                    </ul>
                </div>
                `
            };
        } else {
            if(element.porciones === true){
                productsHTML +=
                `
                <div class="card-1">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                        <a href="/product/${element._id}" method="GET">
                            <img type="button" src="${element.imageUrl}" style="width: 100%;">
                        </li>
                        <li id="price${element._id}" class="list-group-item d-flex flex-nowrap justify-content-around align-items-center price">
                        $ ${element.price}</li>
                        <li class="list-group-item d-flex flex-nowrap justify-content-around namePro">
                            <h2>${element.name}</h2>
                        </li>
                        </a>
                        <li class="flex-row flex-nowrap btnBox">
                            <a href="/product/${element._id}" id="btn${element._id}" class="btn btn-dark" type="button">Ver opciones</a>
                        </li>
                    </ul>
                </div>
                `
            } else {
                productsHTML +=
                `
                <div class="card-1">
                    <ul class="list-group list-group-flush">
                    <span id="stockText${element._id}" class="stockText"></span>
                        <li class="list-group-item">
                        <a href="/product/${element._id}" method="GET">
                            <img type="button" src="${element.imageUrl}" style="width: 100%;">
                        </li>
                        <li id="price${element._id}" class="list-group-item d-flex flex-nowrap justify-content-around align-items-center price">
                        $ ${element.price}</li>
                        <li class="list-group-item d-flex flex-nowrap justify-content-around namePro">
                            <h2>${element.name}</h2>
                        </li>
                        </a>
                        <li class="flex-row flex-nowrap btnBox">
                            <button onclick="añadirAlCarrito('${element._id}')" id="btn${element._id}" class="btn btn-dark" type="button">Comprar <i class="fa-solid fa-basket-shopping"></i></button>
                        </li>
                    </ul>
                </div>
                `
            }
        };
    });
    productsBox.innerHTML = productsHTML;

    productsFiltered.forEach(element => {
        if(element.nostock === true){

            document.getElementById(`price${element._id}`).innerHTML = 'Sin stock';
              document.getElementById(`btn${element._id}`).setAttribute('disabled', 'true');
        }
    });
    
    const subCatList = document.getElementById('subCatList');

    let QuesosSubCat = [ "Colonia", "Duros", "Magros", "Blandos", "Untables", "Cabra", "Sin Sal"];
    let AlmacenSubCat = ["Productos Naturales", "Lácteos", "Cereales", "Aceites", "Latas", "Almacén"];
    let DulcesSubCat = ["Mermeladas", "Dulce", "Dulce de Leche", "ADU", "Repostería"];
    let FrutosSubCat = ["Frutos Secos", "Aceitunas", "Granos y Semillas"];
    let PanaderiaSubCat = ["Panes", "Grisines", "Masitas", "Galletas"];
    let PacksSubCat = ["Box", "Picadas", "Dieta"];

    if (categoria == "Quesos") {
        QuesosSubCat.forEach(element => {
            subCatList.innerHTML += `<a href='#' onclick="showCategory('${element}')" class="aSubList"><li>${element}</li></a>`
        })
    } else if (categoria == "Almacen") {
        AlmacenSubCat.forEach(element => {
            subCatList.innerHTML += `<a href='#' onclick="showCategory('${element}')" class="aSubList"><li>${element}</li></a>`
        })
    } else if (categoria == "Dulces") {
        DulcesSubCat.forEach(element => {
            subCatList.innerHTML += `<a href='#' onclick="showCategory('${element}')" class="aSubList"><li>${element}</li></a>`
        })
    } else if (categoria == "frutos") {
        FrutosSubCat.forEach(element => {
            subCatList.innerHTML += `<a href='#' onclick="showCategory('${element}')" class="aSubList"><li>${element}</li></a>`
        })
    } else if (categoria == "Panaderia") {
        PanaderiaSubCat.forEach(element => {
            subCatList.innerHTML += `<a href='#' onclick="showCategory('${element}')" class="aSubList"><li>${element}</li></a>`
        })
    } else if (categoria == "Packs") {
    PacksSubCat.forEach(element => {
        subCatList.innerHTML += `<a href='#' onclick="showCategory('${element}')" class="aSubList"><li>${element}</li></a>`
    })
}};

window.onload = () => {
    const url = window.location.pathname;
    let category = url.substring(12, url.length);

     if (category !== 'frutos') {
         category = category.charAt(0).toUpperCase() + category.slice(1);
     };
    
    showCategory(category);

    if(category === 'frutos'){
    category = "Frutos y Semillas";
    };
    if(category === 'Panaderia'){
        category = 'Panadería'
    };
    if(category === 'Almacen'){
        category = 'Almacén'
    };
    document.getElementById('categoriaBox').innerHTML = category;
};

function limpiarString(string){
    string = string.toLowerCase();
    string = string.normalize('NFD')
     .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
     .normalize();

    string = string.replace(/ /g, "");

    return string;
};