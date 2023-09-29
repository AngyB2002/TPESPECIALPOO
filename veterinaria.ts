import Sucursal from './sucursal';

export default class Veterinaria{
  private nombre : string;
  private direccion : string;
  private id : number;
  private sucursales : Sucursal[] = [];
  private sucursalSeleccionada : Sucursal | null = null;

  constructor(nombre : string, direccion : string, sucursales : Sucursal[]){
    this.nombre = nombre;
    this.direccion = direccion;
    this.id = this.generarIDUnico(sucursales);
  }

  private generarIDUnico(sucursales : Sucursal[]) : number{
    let noEsta: boolean = false;
    let nuevoID: number = 0;

    while (!noEsta){
      nuevoID = Math.floor(Math.random() * 100000) + 1;
      let estaID = false;

      for (let i = 0; i < sucursales.length; i++){
        if (sucursales[i].getId() === nuevoID){
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
    return this.generarIDUnico(this.sucursales);
  }

  getNombre() : string{
    return this.nombre;
  }

  setNombre(nombre : string) : void{
    this.nombre = nombre;
  }

  getDireccion() : string{
    return this.direccion;
  }

  setDireccion(direccion : string) : void{
    this.direccion = direccion;
  }

  getId() : number{
    return this.id;
  }

  public sucursal() : string{
    return `Veterinaria ID: ${this.id}\nNombre: ${this.nombre}\nDirección: ${this.direccion}`;
  }

  public crearSucursal(sucursal : Sucursal) : void{
    this.sucursales.push(sucursal);
  }

  getSucursales() : Sucursal[]{
    return this.sucursales;
  }

  public eliminarSucursal(sucursal : Sucursal) : void{
    let index = this.sucursales.indexOf(sucursal);
    if (index !== -1){
      if (this.sucursalSeleccionada === sucursal){
        this.sucursalSeleccionada = null;
      }
      this.sucursales.splice(index, 1);
    }
  }

  public seleccionarSucursal(sucursal : Sucursal) : void{
    let index = this.sucursales.indexOf(sucursal);
    if (index !== -1) {
      this.sucursalSeleccionada = sucursal;
      console.log(`Sucursal "${sucursal.getNombre()}" seleccionada.`);
    } else {
      console.log('La sucursal no existe en la lista de sucursales.');
    }
  }

  public getSucursalSeleccionada() : Sucursal | null{
    return this.sucursalSeleccionada;
  }
}