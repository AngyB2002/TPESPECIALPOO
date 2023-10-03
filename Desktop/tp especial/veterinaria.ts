import Sucursal from './sucursal';
​
export default class Veterinaria{
  private nombre : string;
  private direccion : string;
  private idCounter: number = 1;
  private sucursales : Sucursal[] = [];
  private sucursalSeleccionada : Sucursal | null = null;
​
  constructor(nombre : string, direccion : string, sucursales : Sucursal[]){
    this.nombre = nombre;
    this.direccion = direccion;
  }
​
  public crearSucursal(nombre : string, direccion : string) : void{
    let nuevaSucursal = new Sucursal(this.idCounter, nombre, direccion);
    this.sucursales.push(nuevaSucursal);
    this.idCounter++; 
  }
​
  getId() : number{
    return this.idCounter;
  }
​
  public sucursal() : string{
    return `Veterinaria ID: ${this.idCounter}\nNombre: ${this.nombre}\nDireccion: ${this.direccion}`;
  }
​
  getNombre() : string{
    return this.nombre;
  }
​
  setNombre(nombre : string) : void{
    this.nombre = nombre;
  }
​
  getDireccion() : string{
    return this.direccion;
  }
​
  setDireccion(direccion : string) : void{
    this.direccion = direccion;
  }
​
  getSucursales() : Sucursal[]{
    return this.sucursales;
  }
​
  setSucursales(sucursal : Sucursal) : void{
    this.sucursales.push(sucursal)
  }
​
  public eliminarSucursal(sucursal : Sucursal) : void{
    let index = this.sucursales.indexOf(sucursal);
    if (index !== -1){
      if (this.sucursalSeleccionada === sucursal){
        this.sucursalSeleccionada = null;
      }
      this.sucursales.splice(index, 1);
    }
  }
​
  public seleccionarSucursal(sucursal : Sucursal) : void{
    let index = this.sucursales.indexOf(sucursal);
    if (index !== -1) {
      this.sucursalSeleccionada = sucursal;
      console.log(`Sucursal "${sucursal.getNombre()}" seleccionada.`);
    } else {
      console.log('La sucursal no existe en la lista de sucursales.');
    }
  }
​
  public getSucursalSeleccionada() : Sucursal | null{
    return this.sucursalSeleccionada;
  }
}