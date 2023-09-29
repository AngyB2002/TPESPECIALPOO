import Proveedor from "./proveedor";

export default class Producto{
  private id : number;
  private nombre : string;
  private precio : number;
  private proveedores : Proveedor[];

  constructor(id : number, nombre : string, precio : number, proveedores){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.proveedores = [];
  }

  getId() : number{
    return this.id;
  }

  getNombre() : string{
    return this.nombre;
  }

  setNombre(nuevoNombre : string){
    this.nombre = nuevoNombre;
  }

  getPrecio() : number{
    return this.precio;
  }

  setPrecio(nuevoPrecio : number){
    this.precio = nuevoPrecio;
  }

  getProveedor() : Proveedor[]{
    return this.proveedores;
  }
  
  setProveedor(proveedor : Proveedor) : void{
    this.proveedores.push(proveedor)
  }

  public eliminarProveedor(proveedor : Proveedor) : void{
    let index = this.proveedores.indexOf(proveedor);
    if (index !== -1){
      this.proveedores.splice(index, 1);
    }
  }
}