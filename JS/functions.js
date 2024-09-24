/*Evento botón comprar del carrito, cambio de color*/
const button = document.getElementById("btn");

button.addEventListener('click', () =>{
    button.classList.toggle("toggle");
});

/*evento para esconder carrito de compras al dar clic 
en el ícono del carrito*/
const header = document.querySelector("header");
const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");

cartIcon.addEventListener('click', () =>{
    cart.classList.toggle("show");
});

/*evento que sirve para remover un item
con el botecito de basura (de los que ya existen)*/
const iconRemove = document.querySelectorAll(".cart__btn-eliminar");

iconRemove.forEach(elem =>{
    elem.addEventListener('click', () => {
        const elemParent = elem.parentElement;
        elemParent.remove();
    } )
});

/*evento para opacidad de un producto*/
const product = document.querySelectorAll(".mouse");

product.forEach(producto => {
    producto.addEventListener('mouseenter', () =>{
        producto.style.opacity = ".5";
    });
    
    producto.addEventListener('mouseleave', () =>{
        producto.style.opacity = "1";
    });
})

/*evento para mostrar menu desde el ícono 
correspondiente*/
const menuIcon = header.firstElementChild;
const menu = document.querySelector(".menu");

menuIcon.addEventListener('click', () =>{
    menu.classList.add("show");
});

/*Evento par mostrar elementos de un submenú */
const submenus = document.querySelectorAll(".submenu");

submenus.forEach(submenu => {
  submenu.parentElement.addEventListener('click', () => {
    submenu.style.display = 'block';
  });

  submenu.parentElement.addEventListener('mouseleave', () => {
    submenu.style.display = 'none';
  });
});


/*Evento para cerrar menú con la X */
const section = document.querySelectorAll(".menu__btn-cerrar");
const closeIcon = section.lastElementChild;
const cerrar = document.querySelector(".menu__btn-cerrar");

cerrar.addEventListener("click", () => {
    menu.classList.remove("show");
})

/*Evento para agregar items al carrito de compras*/
const cartInfo = document.querySelector(".cart_items");
const carrito = document.querySelector(".cart");
const productList = document.querySelector(".products");

let allProd = [];
const countadorProds = document.querySelector('#contador');

//Evento para obtener los valores de los productos.(imagen,
//descripción y precio)
productList.addEventListener("click", (event) =>{
    if(event.target.classList.contains('cart__btn--add')){
        const producto = event.target.parentElement;

        const infoProducto = {
            qty: 1,
            pict: producto.querySelector('img').getAttribute('src'),
            descr: producto.querySelector('h3').textContent,
            price: producto.querySelector('p').textContent,
        }
        //constante que me permite saber si un producto ya fue
        //seleccionado en el carrito
       const existencia = allProd.some(producto => producto.descr === infoProducto.descr);
        if(existencia){//evualuo si existen repetidos
            const prod = allProd.map(producto =>{
                if(producto.descr === infoProducto.descr){
                    producto.qty++;
                    return producto;
                }else{
                    return producto;
                }
            })
            //en el array se esparcen los productos
            allProd = [...prod];
        }else{
            //variable declarada arriba, se guarda la información
        //del producto
        allProd = [...allProd, infoProducto];
        }
               
        //Llamado de la funcion que agrega los items en 
        //carrito
        mostrarItems();
    };
});

//Evento para eliminar los productos del carrito
carrito.addEventListener('click', (event) =>{
    if(event.target.classList.contains('cart__btn-eliminar')){
        const product = event.target.parentElement;
        console.log(product);
        //const product = event.target.closest(".cart_items");
        const descr = product.querySelector('p').textContent;
        
        allProd = allProd.filter(//el metodo filter me permite filtrar los elementos para poder eliminarlos
            prod => prod.descr !== descr);

            console.log(allProd);

            mostrarItems();
    }
});

const mostrarItems = () => {
    //Limpiar contenido de HTML en carrito
    //cartInfo.innerHTML = '';
    carrito.innerHTML = '';
    let totalProds = 0;

  allProd.forEach(producto =>{
    const contenedorProd = document.createElement('div');
    contenedorProd.classList.add('cart_items');

    contenedorProd.innerHTML = `
      <span class="cantidad__items">${producto.qty}</span>
      <img src="${producto.pict}" class="cart__img" alt="${producto.descr}">
      <p>${producto.descr}</p>
      <p>${producto.price}</p>
      <i class="cart__btn-eliminar"><img src="img/eliminar.png" alt="icono remover" class="cart__delete-icon"></i>
    `;

    carrito.append(contenedorProd);
    totalProds = totalProds + producto.qty;
  });

    countadorProds.innerText = totalProds;
};






