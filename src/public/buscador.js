document.addEventListener('DOMContentLoaded', async () => {
    const searchListBox = document.getElementById('searchList');
    const products = await (await fetch('/api/getproducts')).json();
    funcionBuscar(products, searchListBox);
});

function quitarTildes(cadena){
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
};

function funcionBuscar(products, searchListBox){
    document.getElementById('busqueda').addEventListener('keyup', (e)=> {
        e.preventDefault();

        const buscador = document.getElementById('buscador');
        const busqueda = buscador.value.toLowerCase();

        if(busqueda === ""){
            searchListBox.innerHTML = "";
        } else {
            let productoBuscado = products.filter(element => quitarTildes(element.name).toLowerCase().includes(busqueda) || quitarTildes(element.category).toLowerCase().includes(busqueda)); //Devuelve un array con los productos filtrados

            let searchListHTML = "";
            productoBuscado.forEach(prod => {
                searchListHTML += 
                `
                
                <a href="/product/${prod._id}"><img src="${prod.imageUrl}" class="img_search"><div>${prod.name}</div><p>$ ${prod.price}</p></a>
                
                `    
            })
            searchListBox.innerHTML = searchListHTML;
            ;
        }
    });

    document.getElementById('busqueda').addEventListener('submit', (e) => {
        e.preventDefault();
        let query = document.getElementById('buscador').value;
        window.location.href = `/productos?busqueda=${query}&page=1`;
    })
};

//Ocultar search input.

const buscadorElmt = document.getElementById('buscador');
const lupaElmt = document.getElementById('lupaBtn');
const contenedorElmt = document.getElementById('container');
const scrollContainerElmt = document.getElementById('searchList');
const logoBoxElmt = document.getElementById('logoContainer');
const menuCheckboxElmt = document.getElementById('hamburguerCheck');
const menuElmt = document.getElementById('hamburguerMenu');

// buscadorElmt.classList.add('noDisplay');

lupaElmt.addEventListener('click', () =>{

    console.log('click lupa');
    // buscadorElmt.classList.toggle('noDisplay');
    // buscadorElmt.classList.add('search-input');

    logoBoxElmt.classList.toggle('moveToLeft');
    menuCheckboxElmt.classList.toggle('moveToLeft');
    menuElmt.classList.toggle('moveToLeft')
});

contenedorElmt.addEventListener('click', ()=> {
    // buscadorElmt.classList.add('noDisplay');

    logoBoxElmt.classList.remove('moveToLeft');
    menuCheckboxElmt.classList.remove('moveToLeft');
    menuElmt.classList.remove('moveToLeft');
});

scrollContainerElmt.addEventListener('click', ()=> {
    buscadorElmt.classList.add('noDisplay');

    logoBoxElmt.classList.toggle('moveToLeft');
    menuCheckboxElmt.classList.toggle('moveToLeft');
    menuElmt.classList.toggle('moveToLeft')
});


