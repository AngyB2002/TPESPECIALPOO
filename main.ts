import Cliente from "./cliente";
import Proveedor from "./Proveedor";
import Paciente from "./Paciente";
import Producto from "./producto";
import Sucursal from "./sucursal";
import Veterinaria from "./veterinaria";
import * as readlineSync from "readline-sync";

let veterinaria = new Veterinaria("Veterinaria Eva", "Roma 123", []);

let cliente1 = new Cliente("Noe", "2983-123456", []);
let cliente2 = new Cliente("Pepe", "2983-654321", []);

let proveedor1 = new Proveedor("Proveedor de alimentos", "2983-132465", []);
let proveedor2 = new Proveedor("Proveedor de accesorios", "346-967-365", []);

let paciente1 = new Paciente("Firulais", "Perro", cliente1.getId());
let paciente2 = new Paciente("Nano", "Gato", cliente2.getId());

let producto1 = new Producto(1, "15 kg de alimento balanceado", 20500, proveedor1);
let producto2 = new Producto(2, "Correa regulable",2300, proveedor2);

let sucursal1 = new Sucursal(1, "Sucursal Eva A", "Calle 456");
let sucursal2 = new Sucursal(2, "Sucursal Eva B", "Calle 789");

sucursal1.setCliente(cliente1);
sucursal1.setProveedor(proveedor1);
sucursal1.setPaciente(paciente1);

sucursal2.setCliente(cliente2);
sucursal2.setProveedor(proveedor2);
sucursal2.setPaciente(paciente2);

cliente1.setPaciente(paciente1);
cliente2.setPaciente(paciente2);

sucursal1.setProducto(producto1, proveedor1);
sucursal2.setProducto(producto2, proveedor2);

veterinaria.crearSucursal(sucursal1);
veterinaria.crearSucursal(sucursal2);

// SUCURSALES
function mostrarMenuSucursales(){
  console.log("GESTION DE SUCURSALES");
  console.log("1. Crear Sucursal");
  console.log("2. Seleccionar Sucursal");
  console.log("3. Listar Sucursales");
  console.log("4. Eliminar Sucursal");
  console.log("5. Salir");
}

function gestionarSucursales(veterinaria: Veterinaria) {
  let salir = false;

  while (!salir) {
    mostrarMenuSucursales();

    let opcion = readlineSync.question("Ingrese una opcion: ");

    switch (opcion) {
      case "1":
        crearSucursal(veterinaria);
        break;
      case "2":
        seleccionarSucursal(veterinaria);
        break;
      case "3":
        console.log("Sucursales disponibles:");
        console.log(veterinaria.getSucursales());
        break;
      case "4":
        eliminarSucursal(veterinaria);
        break;
      case "5":
        salir = true;
        break;
      default:
        console.log("Opcion no valida.");
        break;
    }
  }
}

function crearSucursal(veterinaria: Veterinaria){
  let nombre = readlineSync.question("Ingrese el nombre de la nueva sucursal: ");
  let direccion = readlineSync.question("Ingrese la dirección de la nueva sucursal: ");
  let nuevaSucursal = new Sucursal(0, nombre, direccion);

  veterinaria.crearSucursal(nuevaSucursal);
  console.log(`Sucursal "${nombre}" creada con exito.`);
}
  
function seleccionarSucursal(veterinaria : Veterinaria){
  let sucursales = veterinaria.getSucursales();
  console.log("SUCURSALES DISPONIBLES");
  sucursales.forEach((sucursal, index) =>{
    console.log(`${index + 1}. ${sucursal.getNombre()}`);
  });
  
  let seleccion = parseInt(readlineSync.question("Ingrese el numero de la sucursal a seleccionar: ")) - 1;
  
  if (!isNaN(seleccion) && seleccion >= 0 && seleccion < sucursales.length){
    let sucursalSeleccionada = sucursales[seleccion];
    veterinaria.seleccionarSucursal(sucursalSeleccionada);
    console.log(`Sucursal "${sucursalSeleccionada.getNombre()}" seleccionada.`);
  } else{
    console.log("Numero de sucursal no valido.");
  }
}

function eliminarSucursal(veterinaria : Veterinaria){
  let sucursalSeleccionada = veterinaria.getSucursalSeleccionada();

  if (sucursalSeleccionada){
    veterinaria.eliminarSucursal(sucursalSeleccionada);
    console.log(`Sucursal "${sucursalSeleccionada.getNombre()}" eliminada con exito.`);
  } else{
    console.log("No hay sucursal seleccionada.");
  }
}

// CLIENTES
function gestionarClientes(sucursal: Sucursal) {
  let salir = false;

  while (!salir) {
    console.log("GESTIONAR CLIENTES");
    console.log("1. Agregar Cliente");
    console.log("2. Listar Clientes");
    console.log("3. Modificar Cliente");
    console.log("4. Eliminar Cliente");
    console.log("5. Incrementar Visitas");
    console.log("6. Verificar Cliente VIP");
    console.log("7. Seleccionar Paciente");
    console.log("8. Regresar a la Sucursal");

    let opcion = readlineSync.question("Ingrese una opcion: ");

    switch (opcion) {
      case "1":
        agregarCliente(sucursal, cliente1);
        break;
      case "2":
        listarClientes(sucursal);
        break;
      case "3":
        modificarCliente(sucursal);
        break;
      case "4":
        eliminarCliente(sucursal);
        break;
      case "5":
        incrementarVisitas(sucursal);
        break;
      case "6":
        verificarClienteVIP(sucursal);
        break;
      case "7":
        seleccionarPaciente(sucursal);
        break;
      case "8":
        salir = true;
        break;
      default:
        console.log("Opcion no valida.");
        break;
    }
  }
}

function agregarCliente(sucursal : Sucursal, cliente : Cliente){
  let nombre = readlineSync.question("Ingrese el nombre del cliente: ");
  let telefono = readlineSync.question("Ingrese el telefono del cliente: ");
  
  let nuevoCliente = new Cliente(nombre, telefono, []);
  sucursal.setCliente(nuevoCliente);

  let id = nuevoCliente.getObtenerIDUnico();

  console.log(`Cliente "${nombre}" agregado con ID único: ${id} a la sucursal.`);

}

function listarClientes(sucursal : Sucursal){
  let clientes = sucursal.getClientes();
  console.log("Clientes en la sucursal:");
  clientes.forEach((cliente) =>{
    console.log(`- ${cliente.getNombre()} (${cliente.getTelefono()})`);
  });
}

function modificarCliente(sucursal : Sucursal){
  listarClientes(sucursal);

  let clienteX = parseInt(readlineSync.question("Ingrese el numero del cliente a modificar: ")) - 1;
  let clientes = sucursal.getClientes();

  if (!isNaN(clienteX) && clienteX >= 0 && clienteX < clientes.length) {
    let cliente = clientes[clienteX];
    let nuevoNombre = readlineSync.question("Ingrese el nuevo nombre del cliente: ");
    let nuevoTelefono = readlineSync.question("Ingrese el nuevo telefono del cliente: ");

    cliente.setNombre(nuevoNombre);
    cliente.setTelefono(nuevoTelefono);

    console.log("Cliente modificado con exito.");
  } else {
    console.log("Número de cliente no valido.");
  }
}

function eliminarCliente(sucursal : Sucursal){
  listarClientes(sucursal);

  let clienteX = parseInt(readlineSync.question("Ingrese el numero del cliente a eliminar: ")) - 1;
  let clientes = sucursal.getClientes();

  if (!isNaN(clienteX) && clienteX >= 0 && clienteX < clientes.length){
    let cliente = clientes[clienteX];
    sucursal.eliminarCliente(cliente);

    console.log("Cliente eliminado con exito.");
  } else {
    console.log("Numero de cliente no valido.");
  }
}

function incrementarVisitas(sucursal: Sucursal) {
  listarClientes(sucursal);

  let clienteX = parseInt(readlineSync.question("Ingrese el numero del cliente al que desea incrementar las visitas: ")) - 1;
  let clientes = sucursal.getClientes();

  if (!isNaN(clienteX) && clienteX >= 0 && clienteX < clientes.length) {
    let cliente = clientes[clienteX];
    cliente.incrementarVisita();

    console.log("Visitas incrementadas con exito.");
  } else {
    console.log("Numero de cliente no valido.");
  }
}

function verificarClienteVIP(sucursal: Sucursal) {
  listarClientes(sucursal);

  let clienteX = parseInt(readlineSync.question("Ingrese el numero del cliente para verificar si es VIP: ")) - 1;
  let clientes = sucursal.getClientes();

  if (!isNaN(clienteX) && clienteX >= 0 && clienteX < clientes.length) {
    let cliente = clientes[clienteX];
    if (cliente.esClienteVIP()) {
      console.log("El cliente es VIP.");
    } else {
      console.log("El cliente no es VIP.");
    }
  } else {
    console.log("Numero de cliente no valido.");
  }
}

function seleccionarPaciente(sucursal: Sucursal) {
  listarClientes(sucursal);

  let clienteX = parseInt(readlineSync.question("Ingrese el número del cliente que seleccionará un paciente: ")) - 1;
  let clientes = sucursal.getClientes();

  if (!isNaN(clienteX) && clienteX >= 0 && clienteX < clientes.length) {
    let cliente = clientes[clienteX];

    let pacientes = cliente.getPacientes();
    console.log(`Pacientes de ${cliente.getNombre()}:`);
    pacientes.forEach((paciente, index) => {
      console.log(`${index + 1}. ${paciente.getNombre()} (${paciente.getEspecie()})`);
    });

    let pacienteSeleccionado = parseInt(readlineSync.question("Ingrese el numero del paciente a seleccionar: ")) - 1;
    
    if (!isNaN(pacienteSeleccionado) && pacienteSeleccionado >= 0 && pacienteSeleccionado < pacientes.length) {
      let paciente = pacientes[pacienteSeleccionado];
      cliente.seleccionarPaciente(paciente);
    } else {
      console.log("Numero de paciente no valido.");
    }
  } else {
    console.log("Numero de cliente no valido.");
  }
}

// PROVEEDORES
function gestionarProveedores(sucursal : Sucursal){
  let salir = false;
  
  while (!salir){
    console.log("GESTIONAR PROVEEDORES");
    console.log("1. Agregar Proveedor");
    console.log("2. Listar Proveedores");
    console.log("3. Modificar Proveedor");
    console.log("4. Eliminar Proveedor");
    console.log("5. Regresar a la Sucursal");
  
    let opcion = readlineSync.question("Ingrese una opcion: ");
  
    switch (opcion){
      case "1":
        agregarProveedor(sucursal);
        break;
      case "2":
        listarProveedores(sucursal);
        break;
      case "3":
        modificarProveedor(sucursal);
        break;
      case "4":
        eliminarProveedor(sucursal);
        break;
      case "5":
        salir = true;
        break;
      default:
        console.log("Opcion no valida.");
        break;
      }
    }
  }
  
function agregarProveedor(sucursal : Sucursal){
  let nombre = readlineSync.question("Ingrese el nombre del proveedor: ");
  let telefono = readlineSync.question("Ingrese el telefono del proveedor: ");
  
  let nuevoProveedor = new Proveedor(nombre, telefono, []);
  sucursal.setProveedor(nuevoProveedor);
  
  console.log(`Proveedor "${nombre}" agregado con exito a la sucursal.`);
}

function listarProveedores(sucursal : Sucursal){
  let proveedores = sucursal.getProveedores();
  console.log("Proveedores en la sucursal:");
  proveedores.forEach((proveedor) =>{
    console.log(`- ${proveedor.getNombre()} (${proveedor.getTelefono()})`);
  });
}
 
function modificarProveedor(sucursal : Sucursal){
  listarProveedores(sucursal);
  
  let proveedorX = parseInt(readlineSync.question("Ingrese el numero del proveedor a modificar: ")) - 1;
  let proveedores = sucursal.getProveedores();
  
  if (!isNaN(proveedorX) && proveedorX >= 0 && proveedorX < proveedores.length) {
    let proveedor = proveedores[proveedorX];
    let nuevoNombre = readlineSync.question("Ingrese el nuevo nombre del proveedor: ");
    let nuevoTelefono = readlineSync.question("Ingrese el nuevo telefono del proveedor: ");
  
    proveedor.setNombre(nuevoNombre);
    proveedor.setTelefono(nuevoTelefono);
  
    console.log("Proveedor modificado con exito.");
  } else{
    console.log("Numero de proveedor no valido.");
  }
}
  
function eliminarProveedor(sucursal : Sucursal){
  listarProveedores(sucursal);
  
  let proveedorX = parseInt(readlineSync.question("Ingrese el numero del proveedor a eliminar: ")) - 1;
  let proveedores = sucursal.getProveedores();
  
  if (!isNaN(proveedorX) && proveedorX >= 0 && proveedorX < proveedores.length) {
    let proveedor = proveedores[proveedorX];
    sucursal.eliminarProveedor(proveedor);
  
    console.log("Proveedor eliminado con exito.");
  } else {
    console.log("Numero de proveedor no valido.");
  }
}

// PACIENTES
function gestionarPacientes(sucursal : Sucursal, cliente : Cliente){
  let salir = false;
  
  while (!salir) {
    console.log("GESTIONAR PACIENTES");
    console.log("1. Agregar Paciente");
    console.log("2. Listar Pacientes");
    console.log("3. Modificar Paciente");
    console.log("4. Eliminar Paciente");
    console.log("5. Regresar a la Sucursal");
  
    const opcion = readlineSync.question("Ingrese una opcion: ");
  
    switch (opcion) {
      case "1":
        agregarPaciente();
        break;
      case "2":
        listarPacientes(cliente);
        break;
      case "3":
        modificarPaciente();
        break;
      case "4":
        eliminarPaciente(sucursal, cliente);
        break;
      case "5":
        salir = true;
        break;
      default:
        console.log("Opcion no valida.");
        break;
    }
  }
}
  
function agregarPaciente(){
  let nombre = readlineSync.question("Ingrese el nombre del paciente: ");
  let especie = readlineSync.question("Ingrese la especie del paciente: ");
  let paciente = new Paciente(nombre, especie, cliente1.getId());
  console.log(`Paciente "${nombre}" creado con exito.`);
}

function listarPacientes(cliente : Cliente){
  let pacientes = cliente.getPacientes();
  console.log("Pacientes del Cliente:");
  pacientes.forEach((paciente, index) =>{
    console.log(`${index + 1}. ${paciente.getNombre()}`);
  });
}

function modificarPaciente(){
  listarPacientes(cliente1);

  let pacienteX = parseInt(readlineSync.question("Ingrese el numero del paciente a modificar: ")) - 1;
  let pacientes = cliente1.getPacientes();

  if (pacienteX >= 0 && pacienteX < pacientes.length) {
    let paciente = pacientes[pacienteX];

    console.log("DATOS DEL PACIENTE A MODIFICAR");
    console.log("Nombre:", paciente.getNombre());
    console.log("Especie:", paciente.getEspecie());

    let nuevoNombre = readlineSync.question("Ingrese el nuevo nombre del paciente: ");
    let nuevaEspecie = readlineSync.question("Ingrese la nueva especie del paciente: ");

    paciente.setNombre(nuevoNombre);
    paciente.setEspecie(nuevaEspecie);

    console.log("Paciente modificado con exito.");
  } else {
    console.log("Numero de paciente no valido.");
  }
}

function eliminarPaciente(sucursal : Sucursal, cliente : Cliente){
  listarPacientes(cliente);
  
  let pacienteX = parseInt(readlineSync.question("Ingrese el numero del paciente a eliminar: ")) - 1;
  let pacientes = cliente.getPacientes();
  
  if (!isNaN(pacienteX) && pacienteX >= 0 && pacienteX < pacientes.length){
    let paciente = pacientes[pacienteX];
    sucursal.eliminarPaciente(paciente);
  
    console.log("Paciente eliminado con exito.");
  } else{
    console.log("Numero de paciente no valido.");
  }
}

// PRODUCTOS
function gestionarProductos(sucursal : Sucursal, proveedor : Proveedor){
  let salir = false;
  
  while (!salir) {
    console.log("GESTIONAR PRODUCTOS");
    console.log("1. Agregar Producto");
    console.log("2. Listar Productos");
    console.log("3. Modificar Producto");
    console.log("4. Eliminar Producto");
    console.log("5. Regresar a la Sucursal");
  
    let opcion = readlineSync.question("Ingrese una opcion: ");
  
    switch (opcion){
      case "1":
        agregarProducto(sucursal, proveedor);
        break;
      case "2":
        listarProductos(sucursal);
        break;
      case "3":
        modificarProducto(sucursal);
        break;
      case "4":
        eliminarProducto(sucursal);
        break;
      case "5":
        salir = true;
        break;
      default:
        console.log("Opcion no valida.");
        break;
    }
  }
}
 
function agregarProducto(sucursal : Sucursal, proveedor : Proveedor){
  let nombre = readlineSync.question("Ingrese el nombre del producto: ");
  let precio = parseFloat(readlineSync.question("Ingrese el precio del producto: "));
  
  let nuevoProducto = new Producto(0, nombre, precio, []);
  sucursal.setProducto(nuevoProducto, proveedor);
  console.log(`Producto "${nombre}" agregado con exito a la sucursal con el proveedor "${proveedor.getNombre()}".`);
}

function listarProductos(sucursal : Sucursal){
  let productos = sucursal.getProductos();
  console.log("Productos en la sucursal:");
  productos.forEach((producto) =>{
    console.log(`- ${producto.getNombre()} (Precio: ${producto.getPrecio()})`);
  });
}
  
function modificarProducto(sucursal : Sucursal){
  listarProductos(sucursal);
  
  let productoX = parseInt(readlineSync.question("Ingrese el numero del producto a modificar: ")) - 1;
  let productos = sucursal.getProductos();
  
  if (!isNaN(productoX) && productoX >= 0 && productoX < productos.length) {
    let producto = productos[productoX];
    let nuevoNombre = readlineSync.question("Ingrese el nuevo nombre del producto: ");
    let nuevoPrecio = parseFloat(readlineSync.question("Ingrese el nuevo precio del producto: "));
  
    producto.setNombre(nuevoNombre);
    producto.setPrecio(nuevoPrecio);
  
    console.log("Producto modificado con exito.");
  } else{
    console.log("Numero de producto no valido.");
  }
}

function eliminarProducto(sucursal : Sucursal){
  listarProductos(sucursal);
  
  let productoX = parseInt(readlineSync.question("Ingrese el numero del producto a eliminar: ")) - 1;
  let productos = sucursal.getProductos();
  
  if (!isNaN(productoX) && productoX >= 0 && productoX < productos.length) {
    let producto = productos[productoX];
    sucursal.eliminarProducto(producto);
  
    console.log("Producto eliminado con exito.");
  } else{
    console.log("Numero de producto no valido.");
  }
}

//PRINCIPAL
function menu(){
  console.log(`Bienvenido a ${veterinaria.getNombre()} - ${veterinaria.getDireccion()}`);
  veterinaria.seleccionarSucursal(sucursal1); 
  let sucursalSeleccionada = veterinaria.getSucursalSeleccionada();

  if (sucursalSeleccionada){
    gestionarSucursales(veterinaria);
    gestionarClientes(sucursalSeleccionada);
    gestionarPacientes(sucursalSeleccionada, cliente1);
    gestionarProveedores(sucursalSeleccionada);
    gestionarProductos(sucursalSeleccionada, proveedor1);
  } else{
    console.log("No se ha seleccionado una sucursal.");
  }
  console.log("¡Hasta luego!");
}

menu();