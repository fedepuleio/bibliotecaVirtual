// Comienzo 
const arrayLibros = [];

arrayLibros.push(new Libro(0, "Las Enseñanzas de Don Juan", 3000, 25));
arrayLibros.push(new Libro(1, "1984", 1800, 10));
arrayLibros.push(new Libro(2, "Un mundo feliz", 1550, 5));
arrayLibros.push(new Libro(3, "Rebelión en la Granja", 1050, 12));
arrayLibros.push(new Libro(4, "El hombre duplicado", 2300, 3));
arrayLibros.push(new Libro(5, "Ensayo sobre la ceguera", 1620, 4));
arrayLibros.push(new Libro(6, "El señor de los anillos: La comunidad del anillo", 2300, 22));
arrayLibros.push(new Libro(7, "El señor de los anillos: Las dos torres", 2300, 17));
arrayLibros.push(new Libro(8, "El señor de los anillos: El retorno del rey", 2300, 16));


// buscador 
let botonBuscar = document.getElementById("btnBuscar");
botonBuscar.onclick = filtrarDatos;

let inputBusqueda = document.getElementById("busqueda");
inputBusqueda.addEventListener("keyup", busquedaPorTeclado);

function busquedaPorTeclado() {
    console.log(inputBusqueda.value);
    if (inputBusqueda.value.length > 3) {
        filtrarDatos();
    }
}



function filtrarDatos() {
    let productosFiltrados = arrayLibros;
    let palabraClave = document.getElementById("busqueda");
    productosFiltrados = arrayLibros.filter(elemento => elemento.titulo.includes(palabraClave.value));
    limpiarHTML();
/*     crearLibros(productosFiltrados); */
}



function crearLibros(libros) {
    for (const libro of libros) {
        let cards = document.createElement("div");
        cards.innerHTML =
            `
                <div class="card" style="width: 18rem;">
                    <div class="card-body tarjeta">
                        <h5 class="card-title"> ${libro.titulo} </h5>
                        <p class="card-text">Stock: ${libro.stock} unidades.</p>
                        <p class="card-text">Precio: $${libro.precio}.-</p>
                        <button class="btn btn-primary" onclick=cantidadComprados(${libro.id});>Agregar al carrito </button> 
                    </div>
                </div>
        `
        document.getElementById('contenedorCards').appendChild(cards);
    }
}

crearLibros(arrayLibros);





const limpiarHTML = () => {
    //elimino todo
    /* let contenedorCards = $('#contenedorCards');
    document.body.removeChild(contenedorCards); */
    $('#contenedorCards').remove(contenedorCards);
    // crea nuevamente contenedorCards

    $('#contenedorCards').append("<div id='contenedorCards'></div>");
    /* contenedorCards = document.createElement("div");
    let id = document.createAttribute("id");
    id.value = 'contenedorCards';
    contenedorCards.setAttributeNode(id);
    document.body.appendChild(contenedorCards); */
}



const cantidadComprados = (idProducto) => {
    // tomo el span del carrito y le agrego 1 por cada vez que se presiona el boton
    var elemento = document.getElementsByClassName('agregados')[0];
    var cantidad = parseFloat(elemento.innerHTML) + 1;
    elemento.innerHTML = cantidad;
    agregarProductoAlCarrito(idProducto);
}



const agregarProductoAlCarrito = (idProducto) => {
    // creo un localstorage con un array para que guarde los productos del carrito
    /* localStorage.setItem('carrito',JSON.stringify());
    let carrito = JSON.parse(localStorage.getItem('carrito'));  */
    //buscar en el arreglo de libros el produidProductocto que compramos 
    let carrito = [];
    let libros = arrayLibros;
    let productoComprado = libros.find(x => x.id == idProducto);
    carrito.push(productoComprado);
    localStorage.setItem(idProducto, JSON.stringify(carrito));
    console.log(productoComprado);
}


// 3 input para agregar libros (titulo,precio,stock)
//Luego, tomar esos input y crear un nuevo libro en una card, y agregar a un array nuevo;


/* let tituloLibroNuevo = $('#titulo').value;
let precioLibroNuevo = parseInt($('#precio').value);
let stockLibroNuevo= parseInt($('#stock').value);

const AgregarNuevosLibros = (tituloNuevo,precioNuevo,stockNuevo) => {
    let nuevosLibros = [];
    nuevosLibros.push(new Libro(tituloNuevo,precioNuevo,stockNuevo));
    console.log(nuevosLibros)
}

let seguirAgregando = $('.agregarLibro');
seguirAgregando.onclick = () => {console.log('Respuesta 2')};
let confirmarAgregar = $('.confirmarAgregar'); */




// quiero que cuando toque el boton Agregar al carrito, se descuente del stock 1 unidad del libro que tocó;








/* 
// toma el array creado y lo devuelve en un html 
const vercarrito = () => {
    let compras = JSON.parse(localStorage.getItem('carrito'));
    let contenedor = document.createElement("div");

    for (const carrito of compras) {
        contenedor.innerHTML +=
            `
        <h2>${carrito.titulo}</h2>
        `
    }
    document.body.appendChild(contenedor);
}

 */


