export default class Persona{
  protected nombre : string;
  protected telefono : string;
  protected id : number;

  constructor(nombre : string, telefono : string){
    this.nombre = nombre;
    this.telefono = telefono;
  }

  getNombre() : string{
    return this.nombre;
  }

  getTelefono() : string{
    return this.telefono;
  }

  getId() : number{
    return this.id;
  }

  setId(nuevoId : number) : void{
    this.id = nuevoId;
  }

  setNombre(nuevoNombre : string) : void{
    this.nombre = nuevoNombre;
  }

  setTelefono(nuevoTelefono : string) : void{
    this.telefono = nuevoTelefono;
  }
}