import {resultado,formulario} from "./selectores.js";

document.addEventListener("DOMContentLoaded", () =>{
    formulario.addEventListener("submit",validarFormulario);
});

function validarFormulario(e){
    e.preventDefault();

    const busqueda = document.getElementById("termino").value;

    if(!busqueda){
        mostrarError("Agrega un termino de busqueda");
        return;
    }

    buscarImagenes(busqueda);
}

function mostrarError(mensaje){
    const alerta = document.querySelector(".bg-red-100");
    if(!alerta){
        const alerta = document.createElement("p");
        alerta.classList.add("bg-red-100","border-red-400","text-red-700","px-4","py-3","rounded",
        "max-w-lg","mx-auto","mt-6","text-center");

        alerta.innerHTML = `
            <strong class = "font-bold"> Error </strong>
            <span class = "block sm-inline"> ${mensaje} </span>
        `;

        formulario.appendChild(alerta);

        setTimeout(() =>{
            alerta.remove();
        },3000);
    }
}

function buscarImagenes(busqueda){
    const key = "18386507-736d402e07fb46a9e06bf5f08";
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&total=${20}`;
    fetch(url)
        .then(resultado => resultado.json())
        .then(resultado => mostrarImagenes(resultado.hits));
}

function mostrarImagenes(imagenes){
    console.log(imagenes);
}