export default class Paciente{
    private nombre: string;
    private especie: string;
    private idDueno: number;
  
    constructor(nombre : string, especie : string, idDueno : number){
        this.nombre = nombre;
        this.especie = especie;
        this.idDueno = idDueno;
    }
  
    getNombre() : string{
        return this.nombre;
    }
  
    getEspecie() : string{
        return this.especie;
    }
  
    getIdDueno() : number{
        return this.idDueno;
    }
  
    setIdDueno(nuevoIdDueno : number) : void{
        this.idDueno = nuevoIdDueno;
    }
  
    setNombre(nuevoNombre : string) : void{
        this.nombre = nuevoNombre;
    }
  
    setEspecie(nuevaEspecie : string) : void{
        this.especie = nuevaEspecie;
    }
}  