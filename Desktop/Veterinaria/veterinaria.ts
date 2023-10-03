class Veterinaria {
  private nombre: string;
  private direccion: string;
  private id: number;
  private sucursales: Sucursal[];
  private pacientes: Paciente[];
  private personas: Persona[];
  private clientes: Cliente[];
  private proveedores: Proveedor[];

  constructor(nombre: string, direccion: string) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.id = this.generarNumeroAleatorio();
    this.sucursales = [];
    this.pacientes = [];
    this.personas = [];
    this.clientes = [];
    this.proveedores = [];
  }

  private generarNumeroAleatorio(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  public altaSucursal(sucursal: Sucursal): void {
    this.sucursales.push(sucursal);
  }

  public modificarSucursal(id: number, nuevaDireccion: string): void {
    const sucursal = this.sucursales.find((s) => s.getId() === id);
    if (sucursal) {
      sucursal.setDireccion(nuevaDireccion);
    }
  }

  public bajaSucursal(id: number): void {
    this.sucursales = this.sucursales.filter((s) => s.getId() !== id);
  }
}