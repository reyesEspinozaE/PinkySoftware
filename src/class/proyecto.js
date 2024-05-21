class Proyecto {
    constructor(idProyecto, idPartida, nombreProyecto, descripcionProyecto, nombreEncargado, fechaInicio, fechaFin) {
        this.idProyecto = idProyecto;
        this.idPartida = idPartida;
        this.nombreProyecto = nombreProyecto;
        this.descripcionProyecto = descripcionProyecto;
        this.nombreEncargado = nombreEncargado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
}

module.exports = Proyecto;
