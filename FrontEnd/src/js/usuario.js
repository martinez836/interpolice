import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

const tablaUsuarios = document.querySelector('#tablaUsuarios');
const url = 'http://localhost:4100/usuario/';
const modalUsuario = new bootstrap.Modal(document.querySelector('#modalUsuario'));
const frmUsuario = document.querySelector('#frmUsuario');
const btnCrearUsuario = document.querySelector('#btnCrearUsuario');
let idUsuario;
let opcion = "";

// Inputs del formulario
let nombreUsuario = document.querySelector("#nombreUsuario");
let emailUsuario = document.querySelector("#emailUsuario");
let passwordUsuario = document.querySelector("#passwordUsuario");
let rolUsuario = document.querySelector("#rolUsuario");
let telefonoUsuario = document.querySelector("#telefonoUsuario");
let estadoUsuario = document.querySelector("#estadoUsuario");

document.addEventListener('DOMContentLoaded', cargarUsuarios);

function llenarTablaUsuarios(data) {
    tablaUsuarios.innerHTML = "";
    data.data.forEach(usuario => {
        let fila = document.createElement('tr');

        let columnaId = document.createElement('td');
        columnaId.textContent = usuario.id_usuarios;

        let columnaNombre = document.createElement('td');
        columnaNombre.textContent = usuario.nombre;

        let columnaEmail = document.createElement('td');
        columnaEmail.textContent = usuario.email;

        let columnaTelefono = document.createElement('td');
        columnaTelefono.textContent = usuario.telefono;

        let columnaRol = document.createElement('td');
        columnaRol.textContent = usuario.rol;

        let columnaEstado = document.createElement('td');
        columnaEstado.textContent = usuario.estado;

        let columnaAcciones = document.createElement('td');
        let btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-warning', 'btn-sm', 'btnEditarUsuario');
        btnEditar.innerHTML = '<i class="bi bi-pencil-square"></i>';

        let btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'btnEliminarUsuario');
        btnEliminar.innerHTML = '<i class="bi bi-trash"></i>';

        columnaAcciones.appendChild(btnEditar);
        columnaAcciones.appendChild(btnEliminar);

        fila.appendChild(columnaId);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaEmail);
        fila.appendChild(columnaTelefono);
        fila.appendChild(columnaRol);
        fila.appendChild(columnaEstado);
        fila.appendChild(columnaAcciones);

        tablaUsuarios.appendChild(fila);
    });
}

function cargarUsuarios() {
    fetch(url + 'listarTodos')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo obtener la lista de usuarios');
            return response.json();
        })
        .then(data => {
            llenarTablaUsuarios(data);
        })
        .catch(error => {
            Swal.fire('Error', error.message, 'error');
        });

    // Crear usuario
    btnCrearUsuario.addEventListener('click', () => {
        opcion = "crear";
        frmUsuario.reset();
        passwordUsuario.disabled = false;
        modalUsuario.show();
    });

    // Editar y eliminar usuario
    tablaUsuarios.addEventListener('click', (e) => {
        if (e.target.closest(".btnEditarUsuario")) {
            const fila = e.target.closest("tr");
            idUsuario = fila.children[0].textContent;
            nombreUsuario.value = fila.children[1].textContent;
            emailUsuario.value = fila.children[2].textContent;
            telefonoUsuario.value = fila.children[3].textContent;
            rolUsuario.value = fila.children[4].textContent;
            estadoUsuario.value = fila.children[5].textContent;
            passwordUsuario.value = "";
            passwordUsuario.disabled = true; // No editar contraseña aquí
            opcion = "editar";
            modalUsuario.show();
        } else if (e.target.closest(".btnEliminarUsuario")) {
            const fila = e.target.closest("tr");
            idUsuario = fila.children[0].textContent;
            Swal.fire({
                title: "¿Seguro de eliminar el usuario " + idUsuario + "?",
                text: "¡No se puede recuperar!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(url + "borrar/" + idUsuario, {
                        method: "DELETE",
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
                            cargarUsuarios();
                        });
                }
            });
        }
    });

    // Crear o editar usuario
    frmUsuario.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (opcion === "crear") {
            await fetch(url + "crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombreUsuario.value,
                    email: emailUsuario.value,
                    telefono: telefonoUsuario.value,
                    password: passwordUsuario.value,
                    rol: rolUsuario.value,
                    estado: estadoUsuario.value
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    Swal.fire("Creado", "Usuario creado correctamente", "success");
                    cargarUsuarios();
                    modalUsuario.hide();
                });
        } else if (opcion === "editar") {
            fetch(url + "actualizar/" + idUsuario, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombreUsuario.value,
                    email: emailUsuario.value,
                    telefono: telefonoUsuario.value,
                    rol: rolUsuario.value,
                    estado: estadoUsuario.value
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
                    cargarUsuarios();
                    modalUsuario.hide();
                });
        }
    });
}