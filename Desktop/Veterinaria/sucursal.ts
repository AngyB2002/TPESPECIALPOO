class Sucursal {
  private nombre: string;
  private direccion: string;
  private id: number;

  constructor(nombre: string, direccion: string) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.id = this.generarNumeroAleatorio();
  }

  private generarNumeroAleatorio(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public getDireccion(): string {
    return this.direccion;
  }

  public setDireccion(direccion: string): void {
    this.direccion = direccion;
  }

  public getId(): number {
    return this.id;
  }

  public sucursalInfo(): string {
    return `Sucursal ID: ${this.id}, Nombre: ${this.nombre}, Dirección: ${this.direccion}`;
  }
}

  