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
    }
}


const bibliotecaGeneral = [];
const arrayUsuarios = [];


let idUsuario = 0;
let idLibro = 0;


// Se crea un usuario nuevo y se muestra en una card
const crearUsuario = () => {
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
            console.log(`Usuario ${usuario.nombre} creado exitosamente.`);
            guardarLocalStorage('arrayUsuarios', arrayUsuarios);
            crearSelect($("#quienSubeLibro"), arrayUsuarios);
            mostrarUsuarios(arrayUsuarios);
            $('.inputUsuario').val("");
            return usuario;
        }
    }
}


// Se crea un libro con las caracteristicas ingresadas, y se guarda en la biblioteca del usuario seleccionado y en la general
const agregarLibro = () => {
    let tituloLibroNuevo = $('#titulo').val();
    let autorLibroNuevo = $('#autor').val();
    //let cantidadLibroNuevo = parseInt($('#cantidad').val());
    if ((tituloLibroNuevo == '') || (autorLibroNuevo == '')) {
        alert("Ingrese los datos correctamente");
    } else {
        let libro = new Libro(idLibro, tituloLibroNuevo, autorLibroNuevo);
        ++idLibro;
        bibliotecaGeneral.push(libro);
        console.log(`Se agrego el libro ${libro.titulo} correctamente, agregado por: ${arrayUsuarios[usuarioElegido].nombre}`);
        guardarLibro(usuarioElegido, libro);
        actualizarLocalStorage();
        mostrarLibros(bibliotecaGeneral);
        $('.inputLibro').val("");
        return libro;
    }
}

// Mostrar los usuarios existentes en cards
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


// Mostrar libros de biblioteca reutilizable 
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

// Mostrar la Biblioteca General
const mostrarBiblioteca = () => {
    if (bibliotecaGeneral.length <= 0) {
    } else {
        $("#bibliotecaGeneral").removeClass("oculto").addClass("contenedorCards");;
        mostrarLibros(bibliotecaGeneral);
    }
}
// Se muestran solo los libros del usuario seleccionado 
const mostrarLibrosUsuario = (idUsuario) => {
    var mostrarLibrosDe = arrayUsuarios.find(usuario => usuario.id == idUsuario);
    var bibliotecaUsuario = mostrarLibrosDe.bibliotecaUsuario;
    $("#bibliotecaGeneral").removeClass("oculto").addClass("contenedorCards");
    $("#bibliotecaGeneral").empty();
    for (const libro of bibliotecaUsuario) {
        let titulo = libro.titulo;
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

// Permite almacenar el dato del usuario que se está seleccionando: 
function seleccionarUsuario() {
    usuarioElegido = this.options[select.selectedIndex].value;
    console.log(`El usuario con id ${usuarioElegido}, va a agregar un libro`);
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
botonBuscar.onclick = filtrar;

// Filtrar los resultados de busqueda
function filtrar() {
    let productosFiltrados = bibliotecaGeneral;
    let palabraClave = document.getElementById("busqueda");
    productosFiltrados = bibliotecaGeneral.filter(elemento => elemento.titulo.includes(palabraClave.value));
    mostrarLibros(productosFiltrados);
}


// Guardado

// Guardar el libro en bibioteca privada del usuario y en el local storage
function guardarLibro(selectedUser, libro) {
    const usuario = arrayUsuarios.find(usuario => usuario.id == selectedUser);
    console.log(`El usuario ${usuario.nombre} acaba de guardar el libro ${libro.titulo} en su biblioteca privada`);
    usuario.bibliotecaUsuario.push(libro);
    guardarLocalStorage(usuario.id, usuario.bibliotecaUsuario);
}

// Guardar en localstorage reutilizable
function guardarLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

// Actualizar bibloteca general y array usuarios
function actualizarLocalStorage() {
    guardarLocalStorage('bibliotecaGeneral', bibliotecaGeneral);
    guardarLocalStorage('arrayUsuarios', arrayUsuarios);
}


// Intercambio 

// Se despliega un menu para elegir quien va a recibir el libro solicitado
function solicitarLibro(idLibro, idPropietario) {
    $("#idPropietario").val(idPropietario);
    $("#idLibro").val(idLibro);
    $(".section-solicitarLibro").toggle(2000);
    crearSelect($("#opcionesUsuarios"), arrayUsuarios);
}

// boton listo que se despliega cuando damos click en "solicitar Libro"
function intercambiarLibro(idDestinatario) {
    let propietario = arrayUsuarios.find(usuario => usuario.id == $("#idPropietario").val());
    let libro = propietario.bibliotecaUsuario.find(libro => libro.id == $("#idLibro").val());
    let destinatario = arrayUsuarios.find(usuario => usuario.id == idDestinatario);
    destinatario.bibliotecaUsuario.push(libro);
    propietario.bibliotecaUsuario.splice(propietario.bibliotecaUsuario.findIndex(b => b.id == libro.id), 1);
    guardarLocalStorage(propietario.id, propietario.bibliotecaUsuario);
    console.log(`Se actualizó la biblioteca de ${destinatario.nombre}`);
    guardarLocalStorage(destinatario.id, destinatario.bibliotecaUsuario);
    mostrarLibrosUsuario(destinatario.id);
}



$('#verFormularioUsuario').click(() => {
    $("#formularioUsuario").toggle(2000);
});

$('#verFormulariolibro').click(() => {
    $("#formularioLibro").toggle(2000);
});

$('#crearUsuario').on('click', crearUsuario);

$('#agregarLibro').on('click', agregarLibro);

// Retorna el id del destinatario del intercambio 
$('#opcionesUsuarios').change(function () {
    etiqueta = document.getElementById('opcionesUsuarios');
    quienSolicitaLibro = this.options[etiqueta.selectedIndex].value;
    console.log(`El usuario con id ${quienSolicitaLibro}, quiere solicitar un libro`);
    return quienSolicitaLibro;
});

var select = document.getElementById('quienSubeLibro');
select.addEventListener('change', seleccionarUsuario);

$('#mostrarBibliotecaGral').on('click', mostrarBiblioteca);

$('#aceptar').on('click', function () {
    console.log(`El usuario con id ${quienSolicitaLibro} solicita un libro`);
    const usuario = arrayUsuarios.find(usuario => usuario.id == quienSolicitaLibro);
    intercambiarLibro(usuario.id);
});

$('#cancelar').on('click', function () {
    $(".section-solicitarLibro").addClass("oculto");
});

// Mostrar libros para archivo json con libros precargados
$("#verLibrosPrecargados").click(() => {
    $("#ejemploLibros").removeClass("oculto").addClass("contenedorCards flexCentro");
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
                        <button id=solicitar${libros[i]}" ; class="btn btn-outline-dark flexCenter separado centro">Solicitar este libro</button>
                    </div>
                </div>
        `)
        }
    });
});
 //onclick="solicitarLibroPrecargado(${libros[i].id})"



 /* // misma funcion con solicitarLibro, pero para los libros pre cargados
function solicitarLibroPrecargado(idLibro) {
    $("#idLibro").val(idLibro);
    $(".section-solicitarLibro").toggle(2000);
    crearSelect($("#opcionesUsuarios"),arrayUsuarios);
} */


/* function confirmarSolicitudPrecargado(idDestinatario) {
    let libro = propietario.bibliotecaUsuario.find(libro => libro.id == $("#idLibro").val());
    let destinatario = arrayUsuarios.find(usuario => usuario.id == idDestinatario);
    let quienLoTiene = arrayUsuarios.find(usuario => usuario.bibliotecaUsuario.find(libroUsuario => libroUsuario.id == libro));
    if(quienLoTiene){
        alert("Este libro ya lo tiene " + quienLoTiene + " , pediselo!");
    } else {
        destinatario.bibliotecaUsuario.push(libro);
        guardarLocalStorage(propietario.id, propietario.bibliotecaUsuario);
    }
} */


// LOG IN PARA QUE CUANDO ENTRO ME CARGUE LOS DATOS, MENSAJES Y PETICIONES QUE TENGA














// Proximos avances

// Select en card de bibliotecaUsuario para seleccionar a quien se lo envias para hacer el cambio
// Opcion de quitar de tu biblioteca
// Buscador de usuarios, bandeja de entrada para ver solicitudes
// No te permite solicitar un libro si tu biblioteca privada esta vacia
// Mensaje de solicitud de intercambio;
