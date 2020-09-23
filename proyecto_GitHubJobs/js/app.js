import {resultado,formulario} from "./selectores.js";

document.addEventListener("DOMContentLoaded", ()=>{
    formulario.addEventListener("submit",validarBusqueda);
});

function validarBusqueda(e){
    e.preventDefault();

    const busqueda = document.querySelector("#busqueda").value;

    if(!busqueda) {
        mostrarMensaje("La informacion que proporcionaste no es valida");
        return;
    }
}

function mostrarMensaje(mensaje){
    const alerta = document.querySelector(".alerta");
    if(!alerta){
        const alerta = document.createElement("div");
        alerta.classList.add("bg-gray-100","p-3","text-center","mt-3","alerta");
        alerta.textContent = mensaje;

        formulario.appendChild(alerta);

        setTimeout(() =>{
            alerta.remove();
        },3000);
    }
}