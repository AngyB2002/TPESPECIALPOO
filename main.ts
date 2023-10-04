import Cliente from "./cliente";
import Proveedor from "./proveedor";
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
let paciente1A = new Paciente("Pepe", "Gato", cliente1.getId());
let paciente2 = new Paciente("Nano", "Gato", cliente2.getId());

let producto1 = new Producto("15 kg de alimento balanceado", 20500);
let producto2 = new Producto("Correa regulable",2300);


let sucursal1 = new Sucursal(1,"Sucursal Eva A", "Calle 456");
let sucursal2 = new Sucursal(2, "Sucursal Eva B", "Calle 789");


sucursal1.setCliente(cliente1);
sucursal1.setProveedor(proveedor1);
sucursal1.setPaciente(paciente1);

sucursal2.setCliente(cliente2);
sucursal2.setProveedor(proveedor2);
sucursal2.setPaciente(paciente2);

cliente1.setPaciente(paciente1);
cliente1.setPaciente(paciente1A);
cliente2.setPaciente(paciente2);

sucursal1.setProducto(producto1);
sucursal2.setProducto(producto2);

veterinaria.crearSucursal("Sucursal Eva A", "Calle 456");
veterinaria.crearSucursal("Sucursal Eva B", "Calle 789");

// SUCURSALES
function mostrarMenuSucursales(){
  console.log("GESTION DE SUCURSALES");
  console.log("1. Crear Sucursal");
  console.log("2. Seleccionar Sucursal");
  console.log("3. Listar Sucursales");
  console.log("4. Eliminar Sucursal");
  console.log("5. Salir");
}

function gestionarSucursales(veterinaria : Veterinaria){
  let salir = false;

  while (!salir){
    mostrarMenuSucursales();

    let opcion = readlineSync.question("Ingrese una opcion: ");

    switch (opcion){
      case "1":
        crearSucursal(veterinaria);
        break;
      case "2":
        seleccionarSucursal(veterinaria);
        break;
      case "3":
        listarSucursales(veterinaria)
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

function crearSucursal(veterinaria : Veterinaria){
  let nombre = readlineSync.question("Ingrese el nombre de la nueva sucursal: ");
  let direccion = readlineSync.question("Ingrese la direccion de la nueva sucursal: ");

  veterinaria.crearSucursal(nombre, direccion); 
  console.log(`Sucursal "${nombre}" creada con exito.`);
}

function listarSucursales(veterinaria : Veterinaria){
  let sucursales = veterinaria.getSucursales();
  console.log("SUCURSALES DISPONIBLES");
  sucursales.forEach((sucursal) =>{
    console.log(`Nombre: ${sucursal.getNombre()}, Direccion: ${sucursal.getDireccion()}, ID: ${sucursal.getId()}`);
  });
}

function seleccionarSucursal(veterinaria : Veterinaria){
  let sucursales = veterinaria.getSucursales();

  if (sucursales.length === 0){
    console.log("No hay sucursales disponibles.");
    return;
  }

  console.log("SUCURSALES DISPONIBLES:");
  sucursales.forEach((sucursal, index) =>{
    console.log(`${index + 1}. Nombre: ${sucursal.getNombre()}, Direccion: ${sucursal.getDireccion()}, ID: ${sucursal.getId()}`);
  });

  let numeroASeleccionar = readlineSync.questionInt("Ingrese el numero de la sucursal a seleccionar: ") - 1;

  if (numeroASeleccionar >= 0 && numeroASeleccionar < sucursales.length){
    let sucursalSeleccionada = sucursales[numeroASeleccionar];
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

//CLIENTES
function gestionarClientes(sucursal : Sucursal, cliente : Cliente){
  let salir = false;

  while (!salir) {
    console.log("GESTIONAR CLIENTES");
    console.log("1. Agregar Cliente");
    console.log("2. Listar Clientes");
    console.log("3. Modificar Cliente");
    console.log("4. Eliminar Cliente");
    console.log("5. Gestionar Visitas");
    console.log("6. Seleccionar Paciente");
    console.log("7. Regresar a la Sucursal");

    let opcion = readlineSync.question("Ingrese una opcion: ");

    switch (opcion){
      case "1":
        agregarCliente(sucursal);
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
        gestionarVisitas(sucursal);
        break;
      case "6":
        listarClientesYPacientes(sucursal);
        break;
      case "7":
        salir = true;
        break;
      default:
        console.log("Opcion no valida.");
        break;
    }
  }
}

function listarClientesYPacientes(sucursal : Sucursal){
  listarClientes(sucursal);

  let numClienteSeleccionPaciente = readlineSync.questionInt("Ingrese el numero del cliente que seleccionara un paciente: ") - 1;
  let clientes = sucursal.getClientes();

  if (numClienteSeleccionPaciente >= 0 && numClienteSeleccionPaciente < clientes.length){
    let cliente = clientes[numClienteSeleccionPaciente];

    listarPacientes(cliente);

    let pacienteSeleccionado = readlineSync.questionInt("Ingrese el numero del paciente a seleccionar: ") - 1;

    if (pacienteSeleccionado >= 0 && pacienteSeleccionado < cliente.getPacientes().length){
      let paciente = cliente.getPacientes()[pacienteSeleccionado];
      cliente.seleccionarPaciente(paciente);
    } else{
      console.log("Numero de paciente no valido.");
    }
  } else{
    console.log("Numero de cliente no valido.");
  }
}

function agregarCliente(sucursal : Sucursal){
  let nombre = readlineSync.question("Ingrese el nombre del cliente: ");
  let telefono = readlineSync.question("Ingrese el telefono del cliente: ");

  let nuevoCliente = new Cliente(nombre, telefono, []);
  sucursal.setCliente(nuevoCliente);

  let id = nuevoCliente.getObtenerIDUnico();

  console.log(`Cliente "${nombre}" agregado con ID unico: ${id} a la sucursal.`);
}

function agregarPaciente(sucursalSeleccionada : Sucursal){
  let nombreCliente = readlineSync.question("Ingrese el nombre del dueno del paciente: ");
  let clienteEncontrado = buscarClientePorNombre(nombreCliente, sucursalSeleccionada);

  if (!clienteEncontrado){
    console.log("Cliente no encontrado.");
    return;
  }

  let nombre = readlineSync.question("Ingrese el nombre del paciente: ");
  let especie = readlineSync.question("Ingrese la especie del paciente: ");

  let paciente = new Paciente(nombre, especie, clienteEncontrado.getId());
  clienteEncontrado.seleccionarPaciente(paciente);

  console.log(`Paciente "${nombre}" registrado con exito para el cliente "${clienteEncontrado.getNombre()}".`);
}

function buscarClientePorNombre(nombreCliente : string, sucursal : Sucursal) : Cliente | undefined{
  let listaClientes = sucursal.getClientes();

  for (let i = 0; i < listaClientes.length; i++){
    if (listaClientes[i].getNombre() === nombreCliente){
      return listaClientes[i];
    }
  }
  return undefined;
}

function listarClientes(sucursal : Sucursal){
  let clientes = sucursal.getClientes();
  console.log("Clientes:");
  clientes.forEach((cliente, index) =>{
    console.log(`${index + 1}. Nombre: ${cliente.getNombre()}, Telefono: ${cliente.getTelefono()}, ID: ${cliente.getId()}`);
  });
}

function modificarCliente(sucursal : Sucursal){
  listarClientes(sucursal);

  let numClienteAModificar = readlineSync.questionInt("Ingrese el numero del cliente a modificar: ") - 1;
  let clientes = sucursal.getClientes();

  if (numClienteAModificar >= 0 && numClienteAModificar < clientes.length){
    let cliente = clientes[numClienteAModificar];
    let nuevoNombre = readlineSync.question("Ingrese el nuevo nombre del cliente: ");
    let nuevoTelefono = readlineSync.question("Ingrese el nuevo telefono del cliente: ");

    cliente.setNombre(nuevoNombre);
    cliente.setTelefono(nuevoTelefono);

    console.log("Cliente modificado con exito.");
  } else{
    console.log("Numero de cliente no valido.");
  }
}

function eliminarCliente(sucursal : Sucursal){
  listarClientes(sucursal);

  let numClienteAEliminar = readlineSync.questionInt("Ingrese el numero del cliente a eliminar: ") - 1;
  let clientes = sucursal.getClientes();

  if (numClienteAEliminar >= 0 && numClienteAEliminar < clientes.length){
    let cliente = clientes[numClienteAEliminar];
    sucursal.eliminarCliente(cliente);

    console.log("Cliente eliminado con exito.");
  } else {
    console.log("Numero de cliente no valido.");
  }
}

function gestionarVisitas(sucursal : Sucursal){
  listarClientes(sucursal);

  let numClienteSeleccionado = readlineSync.questionInt("Ingrese el numero del cliente: ") - 1;
  let clientes = sucursal.getClientes();

  if (numClienteSeleccionado >= 0 && numClienteSeleccionado < clientes.length){
    let cliente = clientes[numClienteSeleccionado];
    
    cliente.incrementarVisita();
    
    if (cliente.getNumVisitas() >= 5){
      console.log("Visitas incrementadas con exito. El cliente es VIP.");
    } else {
      console.log("Visitas incrementadas con exito. El cliente no es VIP.");
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

function listarProveedores(sucursal: Sucursal){
  let proveedores = sucursal.getProveedores();
  console.log("Proveedores en la sucursal:");
  proveedores.forEach((proveedor, index) => {
    console.log(`${index + 1}. Nombre: ${proveedor.getNombre()}, Telefono: ${proveedor.getTelefono()}, ID: ${proveedor.getId()}`);
  });
}
 
function modificarProveedor(sucursal : Sucursal){
  listarProveedores(sucursal);
  
  let proveedorAModificar = readlineSync.questionInt("Ingrese el numero del proveedor a modificar: ") - 1;
  let proveedores = sucursal.getProveedores();
  
  if (proveedorAModificar >= 0 && proveedorAModificar < proveedores.length){
    let proveedor = proveedores[proveedorAModificar];
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

  let proveedorAEliminar = readlineSync.questionInt("Ingrese el numero del proveedor a eliminar: ") - 1;
  let proveedores = sucursal.getProveedores();

  if (proveedorAEliminar >= 0 && proveedorAEliminar < proveedores.length){
    let proveedor = proveedores[proveedorAEliminar];
    sucursal.eliminarProveedor(proveedor);

    console.log("Proveedor eliminado con exito.");
  } else{
    console.log("Numero de proveedor no valido.");
  }
}

// PACIENTES
function gestionarPacientes(cliente : Cliente, sucursal : Sucursal){
  let salir = false;
  
  while (!salir) {
    console.log("GESTIONAR PACIENTES");
    console.log("1. Agregar Paciente");
    console.log("2. Modificar Paciente");
    console.log("3. Eliminar Paciente");
    console.log("4. Regresar a la Sucursal");
  
    let opcion = readlineSync.question("Ingrese una opcion: ");
  
    switch (opcion){
      case "1":
        agregarPaciente(sucursal);
        break;
      case "2":
        modificarPaciente(cliente);
        break;
      case "3":
        eliminarPaciente(cliente);
        break;
      case "4":
        salir = true;
        break;
      default:
        console.log("Opcion no valida.");
        break;
    }
  }
}

function listarPacientes(cliente : Cliente){
  let pacientes = cliente.getPacientes();
  console.log(`Pacientes de ${cliente.getNombre()}:`);
  pacientes.forEach((paciente, index) =>{
    console.log(`${index + 1}. ${paciente.getNombre()} (${paciente.getEspecie()}), ID del Dueño: ${cliente.getId()}`);
  });
}

function modificarPaciente(cliente : Cliente){
  listarPacientes(cliente);

  let pacienteAModificar = parseInt(readlineSync.question("Ingrese el numero del paciente a modificar: ")) - 1;
  let pacientes = cliente1.getPacientes();

  if (pacienteAModificar >= 0 && pacienteAModificar < pacientes.length){
    let paciente = pacientes[pacienteAModificar];

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

function eliminarPaciente(cliente : Cliente){
  listarPacientes(cliente);

  let pacienteAEliminar = readlineSync.questionInt("Ingrese el numero del paciente a eliminar: ") - 1;
  let pacientes = cliente.getPacientes();

  if (pacienteAEliminar >= 0 && pacienteAEliminar < pacientes.length){
    let paciente = pacientes[pacienteAEliminar];

    cliente.eliminarPaciente(paciente);

    console.log("Paciente eliminado con exito.");
  } else {
    console.log("Numero de paciente no valido.");
  }
}

// PRODUCTOS
function gestionarProductos(sucursal : Sucursal){
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
        agregarProducto(sucursal);
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
 
function agregarProducto(sucursal : Sucursal){
  let nombre = readlineSync.question("Ingrese el nombre del producto: ");
  let precio = parseFloat(readlineSync.question("Ingrese el precio del producto: "));
  
  let nuevoProducto = new Producto(nombre, precio);

  sucursal.setProducto(nuevoProducto);
  console.log(`Producto "${nombre}" agregado con exito.`);
}

function listarProductos(sucursal : Sucursal){
  let productos = sucursal.getProductos();
  console.log("Productos en la sucursal:");
  productos.forEach((producto, index) =>{
    console.log(`${index + 1}. Nombre: ${producto.getNombre()}, Precio: ${producto.getPrecio()}, ID: ${producto.getId()}`);
  });
}

function modificarProducto(sucursal : Sucursal){
  listarProductos(sucursal);

  let productoAModificar = readlineSync.questionInt("Ingrese el numero del producto a modificar: ") - 1;
  let productos = sucursal.getProductos();

  if (productoAModificar >= 0 && productoAModificar < productos.length){
    let producto = productos[productoAModificar];
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

  let productoAEliminar = readlineSync.questionInt("Ingrese el numero del producto a eliminar: ") - 1;
  let productos = sucursal.getProductos();

  if (productoAEliminar >= 0 && productoAEliminar < productos.length){
    let producto = productos[productoAEliminar];

    sucursal.eliminarProducto(producto);

    console.log("Producto eliminado con exito.");
  } else{
    console.log("Numero de producto no valido.");
  }
}

function menu(sucursal, veterinaria, cliente){
  console.log(`Bienvenido a ${veterinaria.getNombre()} - ${veterinaria.getDireccion()}`);
  let sucursalSeleccionada = sucursal;

  if (sucursalSeleccionada){
    gestionarSucursales(veterinaria);

    let clienteSeleccionado = cliente || sucursalSeleccionada.getClientes()[0];
   
    gestionarClientes(sucursalSeleccionada, clienteSeleccionado);
    gestionarPacientes(clienteSeleccionado, sucursalSeleccionada);
    gestionarProveedores(sucursalSeleccionada);
    gestionarProductos(sucursalSeleccionada);
  } else{
    console.log("No se ha seleccionado una sucursal.");
  }
  console.log("¡Hasta luego!");
}

menu(sucursal1, veterinaria, cliente1);