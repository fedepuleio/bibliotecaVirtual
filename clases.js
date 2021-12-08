export class Libreria {

    vender(idlibro,cantidad) {
        if(arrayLibros[idlibro].controlarStock(cantidad)) {
            arrayLibros[idlibro].stock = arrayLibros[idlibro].stock - cantidad;
            console.log("Se vendieron " + cantidad + " libro/s de " + arrayLibros[idlibro].titulo + " exitosamente. Stock actual: " + arrayLibros[idlibro].stock);
        } else {
            console.log("No fue posible realizar la operacion, vuelva a realizar su pedido");
        }
        
    }
    controlarStock(idlibro,cantidad) {
        if (arrayLibros[idlibro].stock >= cantidad) {
            return true;
        }
    }
    alquilar(idlibro,cantidad) {
        if (arrayLibros[idlibro].alquilable) {
            do {
                arrayLibros[idlibro].stock = arrayLibros[idlibro].stock - cantidad;
            } while (arrayLibros[idlibro].vecesAlquilado <= 3); 
        }
        arrayLibros[idlibro].vecesAlquilado++;
        alert("Bien! Alquilaste" + arrayLibros[idlibro].nombre + ". Disfrutalo y cuidalo como si fuera tuyo");
        }
}



