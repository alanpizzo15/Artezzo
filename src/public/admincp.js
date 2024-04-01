//Mostrar todos los productos en la página de administración / Petición GET, obtener productos.
async function showProducts() {
    
    const products = await (await fetch('/api/getproducts')).json();
    console.log(products);
    let productsHTML = "";

    document.getElementById('btnCleanSearch').setAttribute('disabled', true);

    products.forEach(element => {
        productsHTML +=
            `
        <tr>
            <td scope="row" style="width: 12,5% !important;"><img src="${element.imageUrl}" style="width: 40%;"></td>
            <td class="text-center">${element.name}</td>
            <td class="text-center" style="display: none;" id="idprod${element._id}" class="list-group-item text-muted">${element._id}</td>
            <td class="text-center">$ ${element.price}</td>
            <td class="text-center">$ ${element.offerprice}</td>
            <td class="text-center">${element.stock}</td>
            <td class="text-center">${element.destacado}</td>
            <td class="text-center">
                <button class="btn btn-warning" onclick="prodToEdit('${element._id}')" data-bs-toggle="modal" data-bs-target="#editModal">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </td>
            <td class="text-center">
                <button type="button" class="btn btn-danger" onclick="prodToDelete('${element._id}')" data-bs-toggle="modal" data-bs-target="#deleteModal">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    });
    
    document.getElementById('products').innerHTML = productsHTML;
};

//Obtener los productos al cargar la página de inicio
window.onload = () => {
    buscando();
   showBusqueda();
}

//----------------filtrar los productos al utilizar el buscador

function quitarTildes(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
};

function buscando() {
    document.getElementById('formSearch').addEventListener('submit', (e) => {
        e.preventDefault();
        let busqueda = document.getElementById('buscadorAdm').value.toLowerCase();
        window.location.href = `/adm-control-panel?busqueda=${busqueda}&page=1`;
    });
};

async function showBusqueda() {
    const products = await (await fetch('/api/getproducts')).json();
    let valorDeBusqueda = new URLSearchParams(window.location.search).get('busqueda');
    if (valorDeBusqueda !== null) {
        showProdBuscados(products, valorDeBusqueda);
    } else {
        showProducts(products);
    };
};

function showProdBuscados(products, busqueda) {
    let productoBuscado = products.filter(element => quitarTildes(element.name).toLowerCase().includes(busqueda) || quitarTildes(element.category).toLowerCase().includes(busqueda)); //Devuelve un array con los productos filtrados

    productoBuscado.forEach(element => {
        document.getElementById('products').innerHTML +=
            `
            <tr>
                <td scope="row" style="width: 12,5% !important;"><img src="${element.path}" style="width: 40%;"></td>
                <td class="text-center">${element.name}</td>
                <td class="text-center" style="display: none;" id="idprod${element._id}" class="list-group-item text-muted">Id: ${element._id}</td>
                <td class="text-center">$ ${element.price}</td>
                <td class="text-center">$ ${element.offerprice}</td>
                <td class="text-center">Stock: ${element.stock}</td>
                <td class="text-center">
                    <button class="btn btn-warning" onclick="prodToEdit('${element._id}')" data-bs-toggle="modal" data-bs-target="#editModal">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
                <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="prodToDelete('${element._id}')" data-bs-toggle="modal" data-bs-target="#deleteModal">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
            `;
    })
    document.getElementById('btnCleanSearch').removeAttribute('disabled');
};

//----------Filtrar/ordenar según criterios-------
async function filtrarOfertas() {
    const products = await (await fetch('/api/getproducts')).json();
    const prodFiltered = products.filter(element => element.offerprice !== undefined && element.offerprice !== null);
    document.getElementById('products').innerHTML = "";
    prodFiltered.forEach(element => {
        document.getElementById('products').innerHTML +=
            `
            <tr>
                <td scope="row" style="width: 12,5% !important;"><img src="${element.path}" style="width: 40%;"></td>
                <td class="text-center">${element.name}</td>
                <td class="text-center" style="display: none;" id="idprod${element._id}" class="list-group-item text-muted">Id: ${element._id}</td>
                <td class="text-center">$ ${element.price}</td>
                <td class="text-center">$ ${element.offerprice}</td>
                <td class="text-center">Stock: ${element.stock}</td>
                <td class="text-center">
                    <button class="btn btn-warning" onclick="prodToEdit('${element._id}')" data-bs-toggle="modal" data-bs-target="#editModal">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
                <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="prodToDelete('${element._id}')" data-bs-toggle="modal" data-bs-target="#deleteModal">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
            `;
    })
    document.getElementById('btnCleanSearch').removeAttribute('disabled');
};

//Tomar id del producto a editar.
function prodToEdit(idproduct) {
    document.getElementById('idProdBox').innerHTML = idproduct;
    fetch(`/api/getproducts/${idproduct}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('editPorPorcion').checked   = data.porciones;
        document.getElementById('editDestacado').checked    = data.destacado;
        document.getElementById('newname').value            = data.name;
        document.getElementById('categoriaEdit').value      = data.category;
        document.getElementById('subCatListE').value        = data.subcategory;
        document.getElementById('newdesc').value            = data.description;
        document.getElementById('newprice').value           = data.price;
        document.getElementById('nostock').checked          = data.nostock;
        document.getElementById('newPorcion1').value        = data.porcion1;
        document.getElementById('newPorcion2').value        = data.porcion2;
        document.getElementById('newPorcion3').value        = data.porcion3;
    });
};

//Tomar id del producto a ELIMINAR.
function prodToDelete(idproduct) {
    document.getElementById('deleteProdBtn').setAttribute("onclick", `deleteProd('${idproduct}')`);
};

//Eliminar producto.
async function deleteProd(idprod) {
    await fetch(`/api/deleteproduct/${idprod}`, { method: 'DELETE' })
};

//-------------------------MANEJO DEL CRUD DE PRODUCTOS MEDIANTE PETICIONES HTTP A LA API REST.-------------------

//Peticion añadir producto / Petición POST.
const addProdForm = document.getElementById('addProdForm');
const addProdBtn = document.getElementById('addProductBtn');


addProdForm.addEventListener('change', () => {
    let name = document.getElementById('name').value;
    let category = document.getElementById('categoriaAdd').value;
    let image = document.getElementById("image");
    let price = document.getElementById('price').value;

    console.log(image.files.length);
    if (name !== '' && category !== '' && image.files.length !== 0 && price !== 0) {
        addProdBtn.disabled = false;
    }
});

addProdBtn.addEventListener('click', ()=> {
    let porPorcion = document.getElementById('porPorcion').checked;
    let destacado = document.getElementById('prodDestacado').checked;
    let name = document.getElementById('name').value;
    let category = document.getElementById('categoriaAdd').value;
    let subcategory = document.getElementById('subCatListA').value;
    let desc = document.getElementById('desc').value;
    let image = document.getElementById("image");
    let price = document.getElementById('price').value;

    let porcion1 = document.getElementById('porcion1').value;
    let porcion2 = document.getElementById('porcion2').value;
    let porcion3 = document.getElementById('porcion3').value;

    const formData = new FormData();
    formData.append('porciones', porPorcion);
    formData.append('destacado', destacado);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('description', desc);
    formData.append('price', price);
    formData.append('image', image.files[0]);
    formData.append('porcion1', porcion1);
    formData.append('porcion2', porcion2);
    formData.append('porcion3', porcion3);

    fetch('/api/addproduct/',
    {
        method: 'POST',
        body: formData
    })
});

//Peticion editar producto. Petición PUT.

document.getElementById('editProductBtn').addEventListener('click', (e) => {
    let idProd = document.getElementById('idProdBox').innerHTML;

    let destacado = document.getElementById('editDestacado').checked;
    let name = document.getElementById('newname').value;
    let category = document.getElementById('categoriaEdit').value;
    let subcategory = document.getElementById('subCatListE').value;
    let desc = document.getElementById('newdesc').value;
    let image = document.getElementById('newimage');
    let price = document.getElementById('newprice').value;
    let offerPrice = document.getElementById('offerPrice').value;
    let nostock = document.getElementById('nostock').checked;
    let porcion1 = document.getElementById('newPorcion1').value;
    let porcion2 = document.getElementById('newPorcion2').value;
    let porcion3 = document.getElementById('newPorcion3').value;

    const formData = new FormData();
    formData.append('destacado', destacado);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('description', desc);
    formData.append('price', price);
    formData.append('offerprice', offerPrice);
    formData.append('image', image.files[0]);
    formData.append('nostock', nostock);
    formData.append('porcion1', porcion1);
    formData.append('porcion2', porcion2);
    formData.append('porcion3', porcion3);

    fetch(`/api/editproduct/${idProd}`,
        {
            method: 'PUT',
            body: formData
        })
});

//------------Manejo de las categorías y subcategorias AL AÑADIR PRODUCTO

let QuesosSubCat = ["Colonia", "Duros", "Magros", "Blandos", "Untables", "Cabra", "Sin Sal"];
let AlmacenSubCat = ["Lácteos", "Cereales", "Aceites", "Latas", "Almacén"];
let DulcesSubCat = ["Mermeladas", "Dulce" , "ADU", "Repostería", "Postres"];
let FrutosSecosSubCat = ["Frutos Secos", "Granos y Semillas"];
let PanaderiaSubCat = ["Panes", "Grisines", "Masitas", "Galletas"];
let CondimentosSubCat = ["-"];

function addCategories(modo) {
    categoriaAdd = document.getElementById('categoriaAdd');
    categoriaEdit = document.getElementById('categoriaEdit');
    subcategoriaAdd = document.getElementById('subCatListA');
    subcategoriaEdit = document.getElementById('subCatListE');

    if(modo === "add"){
        if (categoriaAdd.value == "Quesos") {
            subcategoriaAdd.innerHTML = `<option value"-" class="scatoption">-</option>`;
            QuesosSubCat.forEach(element => {
                subcategoriaAdd.innerHTML += `<option value="${element}" class="scatoption"> ${element}</option>`;
            })
        } else if (categoriaAdd.value == "Almacen") {
            subcategoriaAdd.innerHTML = `<option value"-" class="scatoption">-</option>`;
            AlmacenSubCat.forEach(element => {
                subcategoriaAdd.innerHTML += `<option value="${element}"> ${element}</option>`;
            })
        } else if (categoriaAdd.value == "Dulces") {
            subcategoriaAdd.innerHTML = `<option value"-" class="scatoption">-</option>`;
            DulcesSubCat.forEach(element => {
                subcategoriaAdd.innerHTML += `<option value="${element}"> ${element}</option>`;
            })
        } else if (categoriaAdd.value == "Frutos-secos") {
            subcategoriaAdd.innerHTML = `<option value"-" class="scatoption">-</option>`;
            FrutosSecosSubCat.forEach(element => {
                subcategoriaAdd.innerHTML += `<option value="${element}"> ${element}</option>`;
            })
        } else if (categoriaAdd.value == "Panaderia") {
            subcategoriaAdd.innerHTML = `<option value"-" class="scatoption">-</option>`;
            PanaderiaSubCat.forEach(element => {
                subcategoriaAdd.innerHTML += `<option value="${element}"> ${element}</option>`;
            })
        } else if (categoriaAdd.value == "Condimentos") {
            subcategoriaAdd.innerHTML = `<option value"-" class="scatoption">-</option>`;
            CondimentosSubCat.forEach(element => {
                subcategoriaAdd.innerHTML += `<option value="${element}"> ${element}</option>`;
            })
        }
    } else {
        if (categoriaEdit.value == "Quesos") {
            subcategoriaEdit.innerHTML = `<option value"-" class="scatoption">-</option>`;
            QuesosSubCat.forEach(element => {
                subcategoriaEdit.innerHTML += `<option value="${element}" class="scatoption"> ${element}</option>`;
            })
        } else if (categoriaEdit.value == "Almacen") {
            subcategoriaEdit.innerHTML = `<option value"-" class="scatoption">-</option>`;
            AlmacenSubCat.forEach(element => {
                subcategoriaEdit.innerHTML += `<option value="${element}"> ${element}</option>`;
            })
        } else if (categoriaEdit.value == "Dulces") {
            subcategoriaEdit.innerHTML = `<option value"-" class="scatoption">-</option>`;
            DulcesSubCat.forEach(element => {
                subcategoriaEdit.innerHTML += `<option value="${element}"> ${element}</option>`;
            })
        } else if (categoriaEdit.value == "Frutos-secos") {
            subcategoriaEdit.innerHTML = `<option value"-" class="scatoption">-</option>`;
            FrutosSecosSubCat.forEach(element => {
                subcategoriaEdit.innerHTML += `<option value="${element}"> ${element}</option>`;
            })
        } else if (categoriaEdit.value == "Panaderia") {
            subcategoriaEdit.innerHTML = `<option value"-" class="scatoption">-</option>`;
            PanaderiaSubCat.forEach(element => {
                subcategoriaEdit.innerHTML += `<option value="${element}"> ${element}</option>`;
            })
        }
    }
};