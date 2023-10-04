let nextProductId = 1;

export default class Producto{
  private id : number;
  private nombre : string;
  private precio : number;

  constructor(nombre : string, precio : number){
    this.id = nextProductId++;
    this.nombre = nombre;
    this.precio = precio;
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
}