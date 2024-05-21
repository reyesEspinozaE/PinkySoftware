class Presupuesto {
    constructor(idPresupuesto, idProyecto, montoTotal, saldoPendiente, area, fechaMonto, descripcion) {
        this.idPresupuesto = idPresupuesto;
        this.idProyecto = idProyecto;
        this.montoTotal = montoTotal;
        this.saldoPendiente = saldoPendiente;
        this.area = area;
        this.fechaMonto = fechaMonto;
        this.descripcion = descripcion;
    }
}

module.exports = Presupuesto;
