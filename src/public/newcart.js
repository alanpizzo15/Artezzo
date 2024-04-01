window.addEventListener("load", (evt)=> {
    showCartItems();
    loader();
    window.matchMedia('(max-width: 600px)').matches === true ? document.querySelector('.redes').classList.add('noDisplay') : console.log('Vista de escritorio.');
    window.matchMedia('(min-width: 601px)').matches === true ? document.querySelector('.hamburger').classList.add('noDisplay') : console.log('Vista de escritorio.');
    window.matchMedia('(min-width: 601px)').matches === true ? document.querySelector('.menu').classList.add('noDisplay') : console.log('Vista de escritorio.');
    window.matchMedia('(min-width: 601px)').matches === true ? document.querySelector('.toggler').classList.add('noDisplay') : console.log('Vista de escritorio.');
});


async function añadirAlCarrito(prodId) {
    const product = await (await fetch('/api/getproducts/' + prodId)).json();
    let porcion = "";
    if (document.getElementById('prodPorcion')){
        porcion = document.getElementById('prodPorcion').value;
        var pricePorcion = Math.ceil((Number(porcion) * Number(product.price))/ 1000);

        var cartItem = {
            id: '',
            prodid: product._id,
            name: product.name,
            price: pricePorcion,
            quantity: 1,
            imageurl: product.imageUrl,
            porcion: porcion
        };
    } else {
        var cartItem = {
            id: '',
            prodid: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageurl: product.imageUrl,
            porcion: porcion
        };
    };

    var isStoredItem = JSON.parse(sessionStorage.getItem(prodId));

    if(product.porciones !== true){
        if(isStoredItem === null){
            Swal.fire({
                icon: 'success',
                title: 'Este producto se añadio correctamente a la Canasta :)',
                showConfirmButton: false,
                timer: 1500
              })
            cartItem.id = `${prodId}`
            sessionStorage.setItem(`${prodId}`, JSON.stringify(cartItem));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Este producto ya se encuentra en la Canasta',
                text: 'Si quiere agregar más cantidad, por favor dirijase hacia a la Canasta. Gracias!',
              })
        };
    } else {
        if(isStoredItem !== null){
            var x = findItems(prodId);
            Swal.fire({
                icon: 'success',
                title: 'Este producto se añadio correctamente a la Canasta :)',
                showConfirmButton: false,
                timer: 1500
              })
            cartItem.id = `${prodId}-${x}`
            sessionStorage.setItem(`${prodId}-${x}`, JSON.stringify(cartItem));
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Este producto se añadio correctamente a la Canasta :)',
                showConfirmButton: false,
                timer: 1500
              })
            cartItem.id = `${prodId}`
            sessionStorage.setItem(`${prodId}`, JSON.stringify(cartItem));
        }
    };

    showCartItems();
};

function showCartItems(){
    itemsCount();

    var itemsBox = document.getElementById('itemsBox');
    itemsBox.innerHTML = ``;

    for(var i = 0, len = sessionStorage.length; i < len; ++i){
        let item = JSON.parse(sessionStorage.getItem( sessionStorage.key( i )));

        if(item.porcion !== ""){
            itemsBox.innerHTML += `
            <div class="itemCartBox ">
            <img src="${item.imageurl}"/>
            <div class="itemCartDataBox">
                <p>${item.name}</p>
                <p>${item.porcion} grs.</p>
                <p id='priceUnit${item.id}'>$ ${item.price}</p>
                <input id="${item.id}" type="number" min="1" value="${item.quantity}" onchange="changeItemQty('${item.id}')"/>                    
            </div>
            <i class="fa-solid fa-trash-can buttCart" style="color: red;"  type="button" onclick="deleteItemCart('${item.id}')"></i>
        </div>
            `
        } else {
            itemsBox.innerHTML += `
            <div class="itemCartBox ">
            <img src="${item.imageurl}"/>
            <div class="itemCartDataBox">
                <p>${item.name}</p>
                <input class="inPut" id="${item.id}" type="number" min="1" value="${item.quantity}" onchange="changeItemQty('${item.id}')"/>             
            </div>
            <p id='priceUnit${item.id}' class="priceCart">$ ${item.price}</p>
                <i class="fa-solid fa-trash-can buttCart" style="color: red;"  type="button" onclick="deleteItemCart('${item.id}')"></i>
            </div>
            `
        }
        
    };

    showTotal();
};

function itemsCount(){
    const contadorBox = document.getElementById('contador');
    let count = 0;
    for(var i = 0, len = sessionStorage.length; i < len; ++i){
        count = count+1;
    };
    contadorBox.innerHTML = count;
};

function changeItemQty(ProdId){
    let newItemQty = document.getElementById(`${ProdId}`).value;
    let itemFind = JSON.parse(sessionStorage.getItem(`${ProdId}`));
    
    itemFind.quantity = newItemQty;

    sessionStorage.setItem(`${ProdId}`, JSON.stringify(itemFind));

    showTotal(ProdId);
};

function deleteItemCart(ProdId){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Haz eliminado un producto de la Canasta :(',
      })
    sessionStorage.removeItem(`${ProdId}`);
    showCartItems();
};

function showTotal(prodId){
    const totalBox = document.getElementById("totalBox");
    const priceUnitBox = document.getElementById(`priceUnit${prodId}`);
    const itemFind = JSON.parse(sessionStorage.getItem(`${prodId}`));

    let subTotal = 0;

    itemFind !== null ? (subTotal = (Number(itemFind.quantity) * itemFind.price), priceUnitBox.innerHTML =  `$ ${subTotal}`, console.log('entro aca')): console.log('0 items en el carrito.');

    let Total = 0;
    for(var i = 0, len = sessionStorage.length; i < len; ++i){
        let item = JSON.parse(sessionStorage.getItem( sessionStorage.key( i )));

        let subtotalItem = item.price * item.quantity;
        Total += subtotalItem;
    };
    totalBox.innerHTML = `Envíos mayor a $800 son gratis - Total $${Math.ceil(Total)}`;
};

function clearCart(){
    sessionStorage.clear();
    showCartItems();
};

function showContactform(){
    let contactForm = document.getElementById('contactForm');
    contactForm.classList.toggle('contactFormHidden');
};

function tycChecked(){
    if (document.getElementById('termsReaded').checked){
        document.getElementById('sendOrderBtn').removeAttribute('disabled');
    } else {
        document.getElementById('sendOrderBtn').setAttribute('disabled', 'true');
    }
};

function findItems(itemId) {
    var i;
    var itemsContador = 0;

    for (i in sessionStorage) {
        if (sessionStorage.hasOwnProperty(i)) {
            if (i.match(itemId)) {
                itemsContador++
            }
        }
    };
    return itemsContador;
};
//|| (!query && typeof i === 'string')

function sendOrder(){
    Swal.fire({
        icon: 'success',
        title: 'Se envió su orden correctamente. Nos estaremos comunicando con usted a la brevedad.',
        showConfirmButton: false,
        timer: 5000
    });

    const orderData = [];
    const itemsData = [];
    
    const name = document.getElementById('nombre').value;
    const phone = document.getElementById('telefono').value;
    const location = document.getElementById('localidad').value;
    const address = document.getElementById('direccion').value;
    const clientData = {
        clientname: name,
        phone: phone,
        location: location,
        address: address
    };

    for(var i = 0, len = sessionStorage.length; i < len; ++i){
        let item = JSON.parse(sessionStorage.getItem( sessionStorage.key( i )));
        itemsData.push(item);
    };

    orderData.push(clientData);
    orderData.push(itemsData);

    if(name !== "" && phone !== "" && location !== "" && address !== ""){  

        fetch('/sendorder', {
                method: "POST",
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin", 
                headers: {
                "Content-Type": "application/json",
                },
            
                body: JSON.stringify(orderData), 
        });
        clearCart()
        setInterval("location.reload()", 5000);
    };
};  

//---------------- Spinner --------------------------

function loader(){
    setTimeout(loaderOut, 2000);
};

function loaderOut(){
    document.getElementById('loaderContainer').style.display = "none";
};