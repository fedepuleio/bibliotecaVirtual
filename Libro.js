class Libro {
    constructor (id,titulo,precio,stock) {
        this.id         = parseInt(id);
        this.titulo     = titulo;
        this.precio     = parseFloat(precio);
        this.stock      = parseInt(stock);
/*         this.alquilable   = true;
        this.vecesAlquilado = 0 ; */
    }
    agregarStock(cantidad) {
        this.stock = this.stock + cantidad;
        console.log("Acaba de ingresar " + cantidad + " libro/s de " + this.titulo + " al stock de manera exitosa.");
    }
}

class Libreria {
    
    salidaStock(cantidad) {
        if(this.controlStock(cantidad)) {
            this.stock = this.stock - cantidad;
            console.log("Se vendieron " + cantidad + " libro/s de " + this.titulo + " exitosamente. Stock actual: " + this.stock);
        } else {
            console.log("No fue posible realizar la operacion, vuelva a realizar su pedido");
        }
        
    }
    controlStock(cantidad) {
        if (this.stock >= cantidad) {
            return true;
        }
    }
    alquilar(cantidad) {
        if (this.alquilable) {
            do {
                this.stock = this.stock - cantidad;
            } while (this.vecesAlquilado <= 3); 
        }
        this.vecesAlquilado++;
        console.log("Bien! Alquilaste " + this.nombre + ". Disfrutalo y cuidalo como si fuera tuyo :)");
        }

}

