import Persona from "./Persona";
import Producto from "./producto";

export default class Proveedor extends Persona{
    constructor(nombre : string, telefono : string, proveedor : Persona[]){
        super(nombre, telefono);
        this.id = this.generarIDUnico(proveedor);
    }

    private productos : Producto[] = [];

    private generarIDUnico(proveedor : Persona[]) : number{
        let noEsta: boolean = false;
        let nuevoID: number = 0;

        while (!noEsta){
            nuevoID = Math.floor(Math.random() * 100000) + 1;
            let estaID = false;

            for (let i = 0; i < proveedor.length; i++){
                if (proveedor[i].getId() === nuevoID){
                    estaID = true;
                    break;
                }
            }

            if (!estaID){
                noEsta = true;
            }
        }
        return nuevoID;
    }

    getObtenerIDUnico() : number{
        return this.generarIDUnico([]);
    }

    getProductos() : Producto[]{
        return this.productos;
    }
}