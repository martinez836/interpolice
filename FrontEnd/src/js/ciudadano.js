import * as bootstrap from 'bootstrap';

import Swal from 'sweetalert2';

import QRCode from 'qrcode';

const tabla = document.querySelector('#miTabla');
const url = 'http://localhost:4100/ciudadano/';
const modalCiudadano = new bootstrap.Modal(document.querySelector('#modalCiudadano'));
const frmCiudadano = document.querySelector('#frmCiudadano');
const btnCrear = document.querySelector('#btnCrear');
let idCiudadano;
var opcion = "";

//datos del formulario
let nombre = document.querySelector("#nombre")
let apellidos = document.querySelector("#apellidos")
let apodo = document.querySelector("#apodo")
let fechaNacimiento = document.querySelector("#fechaNacimiento")
let planetaOrigen = document.querySelector("#planetaOrigen")
let planetaResidencia = document.querySelector("#planetaResidencia")
let foto = document.querySelector("#foto")
let estado = document.querySelector("#estado")


document.addEventListener('DOMContentLoaded', cargarCiudadanos);

function llenarTabla(data){
    data.data.forEach(ciudadano => {
        let fila = document.createElement('tr');

        let columnaCodigo = document.createElement('td');
        columnaCodigo.textContent = ciudadano.codigo;

        let columnaNombre = document.createElement('td');
        columnaNombre.textContent = ciudadano.nombre;

        let columnaApellidos = document.createElement('td');
        columnaApellidos.textContent = ciudadano.apellidos;

        let columnaApodo = document.createElement('td');
        columnaApodo.textContent = ciudadano.apodo;

        let columnaFechaNacimiento = document.createElement('td');
        const fecha = new Date(ciudadano.fechaNacimiento);
        columnaFechaNacimiento.textContent = fecha.toISOString().split('T')[0];

        let planetaOrigen = document.createElement('td');
        planetaOrigen.textContent = ciudadano.planetaOrigen;

        let planetaResidencia = document.createElement('td');
        planetaResidencia.textContent = ciudadano.planetaResidencia;

        let columnaCodigoQR = document.createElement('td');
        let imgQR = document.createElement('img');
        imgQR.src = `http://localhost:4100${ciudadano.codigoQR}`;
        imgQR.style.width = "80px";
        imgQR.style.height = "80px";
        columnaCodigoQR.appendChild(imgQR);

        let estado = document.createElement('td');
        switch (ciudadano.estado)
        {
            case 1:
                estado.textContent = "Vivo";
                break;
            case 2:
                estado.textContent = "Muerto";
                break;
            case 3:
                estado.textContent = "Congelado";
                break;
        }

        let columnaAcciones = document.createElement('td'); 
        let btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-warning', 'btn-sm',"btn-ms", 'btnEditar');
        btnEditar.innerHTML = '<i class="bi bi-pencil-square">';

        let btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm',"btn-ms", 'btnEliminar');
        btnEliminar.innerHTML = '<i class="bi bi-trash">';

        fila.appendChild(columnaCodigo);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaApellidos);
        fila.appendChild(columnaApodo);
        fila.appendChild(columnaFechaNacimiento);
        fila.appendChild(planetaOrigen);
        fila.appendChild(planetaResidencia);
        fila.appendChild(columnaCodigoQR);
        fila.appendChild(estado);
        columnaAcciones.appendChild(btnEditar);
        columnaAcciones.appendChild(btnEliminar);
        fila.appendChild(columnaAcciones);
        tabla.appendChild(fila);
    });
    
}

function cargarCiudadanos(){
    fetch('http://localhost:4100/ciudadano/listarTodos')
      .then(response => {
        if (!response.ok) throw new Error('No se pudo obtener la lista de ciudadanos');
        return response.json();
      })
      .then(data => {
        console.log(data)
        llenarTabla(data);
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      });

//insertar ciudadanos
btnCrear.addEventListener('click', ()=>{
  opcion = "crear";
  modalCiudadano.show();
})

tabla.addEventListener('click', (e)=>{
  if(e.target.closest(".btnEditar")){
    const botonEditar = e.target.closest(".btnEditar");
    const fila = botonEditar.closest("tr");

    idCiudadano = fila.children[0].textContent;

    nombre.value = fila.children[1].textContent;

    apellidos.value = fila.children[2].textContent;

    apodo.value = fila.children[3].textContent;

    fechaNacimiento.value = fila.children[4].textContent;

    planetaOrigen.value = fila.children[5].textContent;

    planetaResidencia.value = fila.children[6].textContent

    foto.value = "";


    opcion = "editar";
    modalCiudadano.show();
  }
  else if(e.target.closest(".btnEliminar")){
    const botonEliminar = e.target.closest(".btnEliminar");
    const fila = botonEliminar.closest("tr");

    idCiudadano = fila.children[0].textContent;
    Swal.fire({
      title: "Seguro de eliminar el registro " + idCiudadano + "?",
      text: "Si lo borras no se puede recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      fetch(url + "eliminar/" + idCiudadano, {
        method: "PUT",
      })
        .then((response) => response.json())
        .then((response) => {
          Swal.fire("registro eliminado !");
        });

      location.reload();
    });
  }
})

frmCiudadano.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(opcion === "crear"){
    await fetch(url+"crear",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        nombre:nombre.value,
        apellidos:apellidos.value,
        apodo:apodo.value,
        fechaNacimiento:fechaNacimiento.value,
        planetaOrigen:planetaOrigen.value,
        planetaResidencia:planetaResidencia.value,
        foto:foto.value,
        estado:1
      })
    })
    .then((response) => response.json())
    .then((response) => {
      location.reload();
      console.log(response)
    })
  }
  else if(opcion === "editar"){
    fetch(url+"actualizar/"+idCiudadano,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
        nombre:nombre.value,
        apellidos:apellidos.value,
        apodo:apodo.value,
        fechaNacimiento:fechaNacimiento.value,
        planetaOrigen:planetaOrigen.value,
        planetaResidencia:planetaResidencia.value,
        foto:foto.value,
        estado:estado.value
      }),
    })
    .then((response)=> response.json())
    .then((response)=>{
      Swal.fire(response.status,"actualizado").then((value) => {
          // swal(`The returned value is: ${value}`);
          location.reload();
        });
    })
  }
})
}

