// Función para el registro de un nuevo empleado
function agregarEmpleado() {
  const nombre = document.getElementById("inputNombre").value.trim();
  const trabajo = document.getElementById("inputTrabajo").value.trim();
  const sueldo = document.getElementById("inputSueldo").value.trim();

  if (!nombre || !trabajo || !sueldo || isNaN(Number(sueldo)) || Number(sueldo) <= 0) {
    mostrarMensajeError("Complete todos los campos correctamente antes de agregar un empleado.");
    return;
  }

  const nuevoEmpleado = {
    nombre: nombre,
    trabajo: trabajo,
    sueldo: sueldo
  };

  registrarEmpleado(nuevoEmpleado);
  almacenarEmpleadosEnLocalStorage();
  limpiarFormulario();
}

function mostrarMensajeError(mensaje) {
  console.error("Error:", mensaje);
  alert(mensaje);
}

function registrarEmpleado(empleado) {
  const listaEmpleados = document.getElementById("listaEmpleados");
  const nuevoElemento = document.createElement("li");

  // botón de eliminar
  nuevoElemento.innerHTML = `
    <span>Nombre: ${empleado.nombre}, Trabajo: ${empleado.trabajo}, Sueldo: $${empleado.sueldo}</span>
    <button class="btnEliminar" data-nombre="${empleado.nombre}">Eliminar</button>`;

  listaEmpleados.appendChild(nuevoElemento);

  // clic al botón de eliminar
  const btnEliminar = nuevoElemento.querySelector(".btnEliminar");
  btnEliminar.addEventListener("click", function () {
    eliminarEmpleado(empleado.nombre);
  });
}

function eliminarEmpleado(nombre) {
  const listaEmpleados = document.getElementById("listaEmpleados");
  const empleadosGuardados = JSON.parse(localStorage.getItem("listaEmpleados")) || [];

  // Filtrar la lista de empleados para excluir el empleado a eliminar
  const nuevaListaEmpleados = empleadosGuardados.filter(empleado => empleado.nombre !== nombre);

  // Actualizar la lista en localStorage y en el DOM
  localStorage.setItem("listaEmpleados", JSON.stringify(nuevaListaEmpleados));
  cargarEmpleadosDesdeLocalStorage();
}

function limpiarFormulario() {
  document.getElementById("inputNombre").value = "";
  document.getElementById("inputTrabajo").value = "";
  document.getElementById("inputSueldo").value = "";
}

function almacenarEmpleadosEnLocalStorage() {
  const empleadosGuardados = JSON.parse(localStorage.getItem("listaEmpleados")) || [];
  empleadosGuardados.push({
    nombre: document.getElementById("inputNombre").value,
    trabajo: document.getElementById("inputTrabajo").value,
    sueldo: document.getElementById("inputSueldo").value
  });
  localStorage.setItem("listaEmpleados", JSON.stringify(empleadosGuardados));
}

function cargarEmpleadosDesdeLocalStorage() {
  const empleadosGuardados = JSON.parse(localStorage.getItem("listaEmpleados")) || [];
  const listaEmpleados = document.getElementById("listaEmpleados");

  // Limpia la lista antes de cargar los empleados
  listaEmpleados.innerHTML = "";

  empleadosGuardados.forEach((empleado) => {
    if (empleado && typeof empleado === "object" && "nombre" in empleado) {
      registrarEmpleado(empleado);
    }
  });
}

cargarEmpleadosDesdeLocalStorage();

document.getElementById("btnAgregar").addEventListener("click", agregarEmpleado);