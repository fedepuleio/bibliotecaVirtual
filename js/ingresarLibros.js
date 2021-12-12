class Usuario {
    constructor(idUsuario, nombre, email, telefono, ) {
        this.id = idUsuario;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.bibliotecaUsuario = [];
    }
}

class Libro {
    constructor(idLibro, titulo, autor) {
        this.id = idLibro;
        this.titulo = titulo;
        this.autor = autor;
        //this.stock = parseInt(stock);
    }
}


const bibliotecaGeneral = [];
const arrayUsuarios = [];


let idUsuario = 0;
let idLibro = 0;


// Comprueba que el usuario o mail que se quiere ingresar no existan previamente antes de crearlo.
const agregarUsuario = () => {
    let nombreUser = $('#nombre').val();
    let emailUser = $('#email').val();
    let telefonoUser = $('#telefono').val();
    if ((nombreUser == '') || (emailUser == '') || (telefonoUser == '')) {
        alert("Ingrese los datos correctamente - Los campos no pueden estar vacios");
    } else {
        var existeUsuario = arrayUsuarios.find(usuario => usuario.nombre == nombreUser);
        var existeEmail = arrayUsuarios.find(usuario => usuario.email == emailUser);
        if (existeUsuario || existeEmail) {
            alert("El usuario y/o email ingresado ya existe, ingresá uno nuevo!");
            $('.inputUsuario').val("");
        } else {
            let usuario = new Usuario(idUsuario, nombreUser, emailUser, telefonoUser);
            ++idUsuario;
            arrayUsuarios.push(usuario);
            guardarLocalStorage('arrayUsuarios', arrayUsuarios);
            crearSelect($("#quienSubeLibro"), arrayUsuarios);
            mostrarUsuarios(arrayUsuarios);
            $('.inputUsuario').val("");
            return usuario;
        }
    }
}


// Comprueba que el libro que se quiere agregar no exista, si es asi; lo crea, sino; actualiza el stock del mismo;
const agregarLibro = () => {
    let tituloLibroNuevo = $('#titulo').val();
    let autorLibroNuevo = $('#autor').val();
    let cantidadLibroNuevo = parseInt($('#cantidad').val());
    if ((tituloLibroNuevo == '') || (autorLibroNuevo == '') || (cantidadLibroNuevo == '')) {
        alert("Ingrese los datos correctamente");
    } else {
            let libro = new Libro(idLibro, tituloLibroNuevo, autorLibroNuevo, cantidadLibroNuevo);
            ++idLibro;
            bibliotecaGeneral.push(libro);
            console.log('Se agrego el libro ' + libro.titulo + ' correctamente, agregado por: ', arrayUsuarios[usuarioElegido].nombre);
            guardarLibro(usuarioElegido, libro);
            actualizarLocalStorage();
            mostrarLibros(bibliotecaGeneral);
            $('.inputLibro').val("");
            return libro;
    }
}


const mostrarBiblioteca = () => {
    if (bibliotecaGeneral.length <= 0) {

    } else {
        $("#bibliotecaGeneral").removeClass("oculto").addClass("contenedorCards");;
        mostrarLibros(bibliotecaGeneral);
    }
}


// se muestran solo los libros del usuario seleccionado 
const mostrarLibrosUsuario = (idUsuario) => {
    var mostrarLibrosDe = arrayUsuarios.find(usuario => usuario.id == idUsuario);
    var bibliotecaUsuario = mostrarLibrosDe.bibliotecaUsuario;
    $("#bibliotecaGeneral").removeClass("oculto").addClass("contenedorCards");
    $("#bibliotecaGeneral").empty();
    for (const libro of bibliotecaUsuario) {
        let titulo = libro.titulo;
        /* let librosDuplicados = biblioteca.filter(function (currentElement) {
            // the current value is an object, so you can check on its properties
            return currentElement.titulo === libro.titulo && currentElement.autor  === libro.autor;
        }); */
        $("#bibliotecaGeneral").append(
            `
                <div class="card libro${libro.titulo}" style="width: 18rem;">
                    <div class="card-body tarjeta">
                        <img src="./images/libro.jpg" class= "foto-chica">
                        <h5 class="badge bg-light text-dark card-title"> ${libro.titulo} </h5>
                        <p class="card-text badge bg-warning">Autor: ${libro.autor}</p>
                        <button class="btn btn-outline-dark flexCenter separado centro" onclick="solicitarLibro(${libro.id},${idUsuario})";>Solicitar este libro</button>
                    </div>
                </div>
        `);
        }
}




// muestra en el html una card con los datos de cada usuario existente 
function mostrarUsuarios(arrayUsuarios) {
    $("#arrayUsuarios").removeClass("oculto").addClass("contenedorCards");;
    $("#arrayUsuarios").empty();
    for (const usuario of arrayUsuarios) {
        $("#arrayUsuarios").append(
            `
                <div class="card usuario${usuario.id}" style="width: 18rem;">
                    <div class="card-body tarjeta">
                        <h5 class="badge bg-light text-dark card-title"> ${usuario.nombre}</h5>
                        <p class="badge bg-danger card-text "> ID:${usuario.id} </p>
                        <p class="badge bg-warning card-text"> E-mail: ${usuario.email}</p>
                        <p class="badge bg-warning card-text"> Teléfono: ${usuario.telefono}</p>
                        <div class= "badge bg-info card-text"> LIbros:
                        <button type="button" onclick=mostrarLibrosUsuario(${usuario.id}) class="btn btn-outline-dark flexCenter separado centro mostrarLibrosUsuario${usuario.id}">Mostrar libros de ${usuario.nombre}</button>
                        <ul class"bibliotecaUsuario"></ul>
                        </div>
                    </div>
                </div>
        `)
    }
}

//encontrar los libros duplicados dentro de una biblioteca.
// darle un valor al stock por cada libro encontrado



// Muestra en el html una card con los datos de cada libro existente 
function mostrarLibros(biblioteca) {
    $("#bibliotecaGeneral").removeClass("oculto").addClass("contenedorCards");
    $("#bibliotecaGeneral").empty();
    for (const libro of biblioteca) {
        /* let librosDuplicados = biblioteca.filter(function (currentElement) {
            // the current value is an object, so you can check on its properties
            return currentElement.titulo === libro.titulo && currentElement.autor  === libro.autor;
        }); */
        $("#bibliotecaGeneral").append(
            `
                <div class="card libro${libro.titulo}" style="width: 18rem;">
                    <div class="card-body tarjeta">
                        <img src="./images/libro.jpg" class= "foto-chica">
                        <h5 class="badge bg-light text-dark card-title"> ${libro.titulo} </h5>
                        <p class="card-text badge bg-warning">Autor: ${libro.autor}</p>
                    </div>
                </div>
        `);
        }
    }




$('#opcionesUsuarios').change(function () {
    etiqueta = document.getElementById('opcionesUsuarios');
    quienSolicitaLibro = this.options[etiqueta.selectedIndex].value;
    console.log('Se seleccionó el usuario con id ' + quienSolicitaLibro);
    return quienSolicitaLibro;
});

var select = document.getElementById('quienSubeLibro');
select.addEventListener('change', seleccionarUsuario);


// Permite almacenar el dato del usuario que se está seleccionando: 
function seleccionarUsuario() {
    usuarioElegido = this.options[select.selectedIndex].value;
    console.log('Se seleccionó el usuario con id ' + usuarioElegido);
    return usuarioElegido;
}

// Crea un select por cada usuario que se agrega, permitiendo elegir que usuario sube el libro
const crearSelect = (etiqueta, array) => {
    etiqueta.empty();
    etiqueta.prepend(`
    <option value="" disabled selected>Seleccionar...</option>
    `)
    for (let i = 0; i < array.length; i++) {
        etiqueta.append(`
                    <option value="${array[i].id}" >${array[i].nombre}</option>
                    `);
    }
}

// Buscador 
let botonBuscar = document.getElementById("btnBuscar");
botonBuscar.onclick = filtrarLibros;

// filtra los resultados en la busqueda de los libros de biblioteca general
function filtrarLibros() {
    let productosFiltrados = bibliotecaGeneral;
    let palabraClave = document.getElementById("busqueda");
    productosFiltrados = bibliotecaGeneral.filter(elemento => elemento.titulo.includes(palabraClave.value));
    //limpiarHTML(); // falta crear limpiarHTML;
    mostrarLibros(productosFiltrados);
}


// Guardado

// Guarda el libro en bibioteca privada del usuario y en el local storage
function guardarLibro(selectedUser, libro) {
    const usuario = arrayUsuarios.find(usuario => usuario.id == selectedUser);
    console.log(usuario);
    usuario.bibliotecaUsuario.push(libro);
    guardarLocalStorage(usuario.id, usuario.bibliotecaUsuario);
}

// Guarda en local
function guardarLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

// Actualiza bibloteca general y array usuarios
function actualizarLocalStorage() {
    guardarLocalStorage('bibliotecaGeneral', bibliotecaGeneral);
    guardarLocalStorage('arrayUsuarios', arrayUsuarios);
}



$('#mostrarBibliotecaGral').on('click', mostrarBiblioteca);

$('#agregarUsuario').on('click', agregarUsuario);

$('#agregarLibro').on('click', agregarLibro);

$('#cancelar').on('click', function () {
    $(".section-solicitarLibro").addClass("oculto");
});


$('#confirmar').on('click', function () {
    console.log(quienSolicitaLibro);
    const usuario = arrayUsuarios.find(usuario => usuario.id == quienSolicitaLibro);
    confirmarSolicitud(usuario.id);
});

function solicitarLibro(idLibro,idPropietario) {
    $("#idPropietario").val(idPropietario);
    $("#idLibro").val(idLibro);
    $(".section-solicitarLibro").removeClass("oculto");
    crearSelect($("#opcionesUsuarios"), arrayUsuarios);
}

function confirmarSolicitud (idDestinatario) {
    let propietario = arrayUsuarios.find(usuario => usuario.id == $("#idPropietario").val());
    let libro = propietario.bibliotecaUsuario.find(libro => libro.id == $("#idLibro").val());
    let destinatario = arrayUsuarios.find(usuario => usuario.id == idDestinatario);
    destinatario.bibliotecaUsuario.push(libro);
    propietario.bibliotecaUsuario.splice(propietario.bibliotecaUsuario.findIndex(b => b.id == libro.id), 1 );
    guardarLocalStorage(propietario.id, propietario.bibliotecaUsuario);
    console.log(destinatario.bibliotecaUsuario);
    guardarLocalStorage(destinatario.id,destinatario.bibliotecaUsuario);
    mostrarLibrosUsuario(destinatario.id);
    }




/* $('#inicioUsuario').click(() => {
    $("#ingresarUsuario").toggle(2000);
});

$('#inicioLibro').click(() => {
    $("#ingresarLibro").toggle(2000);
}); */



$("#inicioLibros").click(() => {
    $.get("./js/libros.json", (data) => {
        let libros = data.Libros;
        for (let i = 0; i < libros.length; i++) {

            $("#ejemploLibros").append(
                `
                <div class="card libro${libros[i].titulo}" style="width: 18rem;">
                    <div class="card-body tarjeta">
                        <img src="./images/libro.jpg" class= "foto-chica">
                        <h5 class="badge bg-light text-dark card-title"> ${libros[i].titulo} </h5>
                        <p class="card-text badge bg-warning">Autor: ${libros[i].autor}</p>
                        <p class="card-text badge bg-info">Stock:3 unidad/es.</p>
                        <button id=solicitar${libros[i]}" onclick=solicitarLibro(); class="btn btn-outline-dark flexCenter separado centro">Solicitar este libro</button>
                    </div>
                </div>
        `)
        }
    });
});



// LOG IN PARA QUE CUANDO ENTRO ME CARGUE LOS DATOS, MENSAJES Y PETICIONES QUE TENGA
















// las cards de cada usuario tiene un select para intercambiar libros, y seleccionas a quien se lo envias para hacer el cambio
// despues agregar la opcion de quitar de tu biblioteca

// agregar un buscador de usuarios para cuando te llega la solicitud de intercambio


// no te permite solicitar un libro si tu biblioteca privada esta vacia


// agregue en libro this.quienlotiene y this.mensajes en usuario 
// falta agregar que cuando toco el boton solicitar intercambio, se le envia un mensaje a cada usuario que posea ese libro ;






































/*         const ejemploLibros = [];

        ejemploLibros.push(new Libro(100, "Las Enseñanzas de Don Juan", "Carlos Castañeda", 25)); ejemploLibros.push(new Libro(101, "1984", "George Orwell", 10)); ejemploLibros.push(new Libro(102, "Un mundo feliz", "Aldous Huxley", 5)); ejemploLibros.push(new Libro(103, "Rebelión en la Granja", "George Orwell", 12)); ejemploLibros.push(new Libro(104, "El hombre duplicado", "José Saramago", 3)); ejemploLibros.push(new Libro(105, "Ensayo sobre la ceguera", "José Saramago", 4)); ejemploLibros.push(new Libro(106, "El señor de los anillos: La comunidad del anillo", "J.R.R. Tolkien", 22)); ejemploLibros.push(new Libro(107, "El señor de los anillos: Las dos torres", "J.R.R. Tolkien", 17)); ejemploLibros.push(new Libro(108, "El señor de los anillos: El retorno del rey", "J.R.R. Tolkien", 16));



        mostrarEjemploLibros(ejemploLibros);

        function mostrarEjemploLibros(libros) {
            for (const libro of libros) {
                $("#ejemploLibros").append(
                    `
                <div class="card libro${libro.titulo}" style="width: 18rem;">
                    <div class="card-body tarjeta">
                        <h5 class="badge bg-light text-dark card-title"> ${libro.titulo} </h5>
                        <p class="card-text badge bg-warning">Autor: ${libro.autor}</p>
                        <p class="card-text badge bg-info">Stock: ${libro.stock} unidad/es.</p>
                        <button id="solicitar" class="btn btn-outline-dark flexCenter separado centro">Solicitar este libro</button>
                    </div>
                </div>
        `)
            }
        } */