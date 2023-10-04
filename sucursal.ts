import Cliente from './cliente';
import Proveedor from './Proveedor';
import Paciente from './Paciente';
import Producto from './producto';

export default class Sucursal{
    private id : number;
    private nombre : string;
    private direccion : string;
    private clientes : Cliente[] = [];
    private proveedores : Proveedor[] = [];
    private pacientes : Paciente[] = [];
    private productos : Producto[] = [];
    private clienteSeleccionado : Cliente | null = null;
    private proveedorSeleccionado : Proveedor | null = null;

    constructor(id : number, nombre : string, direccion : string){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;

        let clienteConsumidorFinal = new Cliente("Consumidor Final", "2983-123456", []);
        this.clientes.push(clienteConsumidorFinal);

        let proveedorStockInicial = new Proveedor('Stock Inicial', '2983-654321', []);
        this.proveedores.push(proveedorStockInicial);
    }

    getNombre() : string{
        return this.nombre;
    }

    setNombre(nuevoNombre : string) : void{
        this.nombre = nuevoNombre;
    }

    getId() : number{
        return this.id;
    }

    setId(nuevoId : number) : void{
        this.id = nuevoId;
    }

    getDireccion() : string{
        return this.direccion;
    }

    setDireccion(nuevaDireccion : string) : void{
        this.direccion = nuevaDireccion;
    }

    setPaciente(paciente : Paciente) : void{
        this.pacientes.push(paciente);
    }

    public eliminarCliente(cliente : Cliente) : void{
        let index = this.clientes.indexOf(cliente);
        if (index !== -1){
            this.clientes.splice(index, 1);
        }
    }

    public eliminarProveedor(proveedor : Proveedor) : void{
        let index = this.proveedores.indexOf(proveedor);
        if (index !== -1){
            this.proveedores.splice(index, 1);
        }
    }

    public eliminarProducto(producto : Producto) : void{
        let index = this.productos.indexOf(producto);
        if (index !== -1){
            this.productos.splice(index, 1);
        }
    }    
    
    getClientes() : Cliente[]{
        return this.clientes;
    }

    getProveedores() : Proveedor[]{
        return this.proveedores;
    }

    getProductos() : Producto[]{
        return this.productos;
    }

    setCliente(cliente : Cliente) : void{
        this.clientes.push(cliente);
    }

    setProveedor(proveedor : Proveedor) : void{
        this.proveedores.push(proveedor);
    }

    setProducto(producto : Producto,){
        this.productos.push(producto);
    }
  
    public seleccionarCliente(cliente : Cliente) : void{
        this.clienteSeleccionado = cliente;
        console.log(`Cliente "${cliente.getNombre()}" seleccionado.`);
    }

    public seleccionarProveedor(proveedor : Proveedor) : void{
        this.proveedorSeleccionado = proveedor;
        console.log(`Proveedor "${proveedor.getNombre()}" seleccionado.`);
    }

    getClienteSeleccionado() : Cliente | null{
        return this.clienteSeleccionado;
    }
    
    setClienteSeleccionado(cliente : Cliente | null) : void{
        this.clienteSeleccionado = cliente;
    }
    
    getProveedorSeleccionado() : Proveedor | null{
        return this.proveedorSeleccionado;
    }
    
    setProveedorSeleccionado(proveedor : Proveedor | null) : void{
        this.proveedorSeleccionado = proveedor;
    }

    public detallesSucursal() : string{
        return `Sucursal ID: ${this.id}\nNombre: ${this.nombre}\nDirección: ${this.direccion}`;
    }
}