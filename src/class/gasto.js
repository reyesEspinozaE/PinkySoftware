class Gasto {
    constructor(idGasto, idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto, imagen) {
        this.idGasto = idGasto;
        this.idProyecto = idProyecto;
        this.descripcionGasto = descripcionGasto;
        this.lugar = lugar;
        this.montoGasto = montoGasto;
        this.fechaGasto = fechaGasto;
        this.imagen = imagen;
    }
}

module.exports = Gasto;
