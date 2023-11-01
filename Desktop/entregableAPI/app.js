// Definir una interfaz para los datos del empleado
const apiUrl = 'https://6398b453fe03352a94dbe15d.mockapi.io/api/empleados';
const employeeTable = document.getElementById('employee-table');
const employeeDetails = document.getElementById('employee-details');
const employeeForm = document.getElementById('employee-form');
const tbody = employeeTable.querySelector('tbody');
const nameInput = document.getElementById('nombre');
const areaInput = document.getElementById('area');
const domicilioInput = document.getElementById('domicilio');
const identificacionInput = document.getElementById('identificacion');
const apellidoInput = document.getElementById('apellido');

// URL para obtener imágenes aleatorias de picsum.photos
const randomImageApiUrl = 'https://picsum.photos/200/300';

// Función para mostrar detalles completos del empleado
function showEmployeeDetails(employee) {
    const detailsList = document.createElement('ul');
    detailsList.innerHTML = `
        <h2>Detalles del Empleado</h2>
        <li><strong>Nombre:</strong> ${employee.nombre || 'Nombre Desconocido'}</li>
        <li><strong>Apellido:</strong> ${employee.apellido || 'Apellido Desconocido'}</li>
        <li><strong>Área:</strong> ${employee.area || 'Área Desconocida'}</li>
        <li><strong>Domicilio:</strong> ${employee.domicilio || 'Domicilio Desconocido'}</li>
        <li><strong>Identificación:</strong> ${employee.id || 'Identificación Desconocida'}</li>
    `;
    if (employee.foto) {
        const image = document.createElement('img');
        image.src = employee.foto;
        image.alt = 'Foto del empleado';
        detailsList.appendChild(image);
    }
    employeeDetails.innerHTML = '';
    employeeDetails.appendChild(detailsList);
    employeeDetails.classList.remove('hidden');
}

// Función para eliminar un empleado
async function deleteEmployee(id) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar a este empleado?');
    if (confirmDelete) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Recargar la lista de empleados después de eliminar uno
                loadEmployees();
            }
        } catch (error) {
            console.error('Error al eliminar el empleado:', error);
        }
    }
}

// Función para cargar y mostrar datos de empleados desde la API
async function loadEmployees() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const employees = await response.json();

            tbody.innerHTML = '';
            employees.forEach((employee, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${employee.nombre}</td>
                    <td>${employee.area}</td>
                    <td>
                        <button data-id="${employee.id}" class="view-button">Ver</button>
                        <button data-id="${employee.id}" class="delete-button">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Agregar evento click a los botones "Ver"
            const viewButtons = document.querySelectorAll('.view-button');
            viewButtons.forEach((button) => {
                button.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    const selectedEmployee = employees.find((emp) => emp.id === id);
                    if (selectedEmployee) {
                        showEmployeeDetails(selectedEmployee);
                    }
                });
            });

            // Agregar evento click a los botones "Eliminar"
            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach((button) => {
                button.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    deleteEmployee(id);
                });
            });
        }
    } catch (error) {
        console.error('Error al cargar los empleados:', error);
    }
}

// Función para crear un nuevo empleado
async function createEmployee() {
    const nuevoEmpleado = {
        nombre: nameInput.value,
        apellido: apellidoInput.value,
        area: areaInput.value,
        domicilio: domicilioInput.value,
        identificacion: identificacionInput.value,
        foto: randomImageApiUrl,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoEmpleado),
        });

        if (response.ok) {
            // Limpiar los campos del formulario
            nameInput.value = '';
            apellidoInput.value = '';
            areaInput.value = '';
            domicilioInput.value = '';
            identificacionInput.value = '';

            // Recargar la lista de empleados después de agregar uno nuevo
            loadEmployees();
        }
    } catch (error) {
        console.error('Error al crear un empleado:', error);
    }
}

// Agregar evento submit al formulario para crear un empleado
employeeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    createEmployee();
});

// Cargar los empleados al cargar la página
loadEmployees();
