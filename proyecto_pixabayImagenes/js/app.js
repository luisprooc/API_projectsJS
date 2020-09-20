import {registrosPaginas,resultado,formulario} from "./selectores.js";

let totalPaginas;
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
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=100`;
    fetch(url)
        .then(resultado => resultado.json())
        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);
            console.log(totalPaginas);
            mostrarImagenes(resultado.hits);
        });
}

function mostrarImagenes(imagenes){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    imagenes.forEach(imagen =>{
        const {previewURL,likes,views, largeImageURL} = imagen;

        resultado.innerHTML += `
            <div class = "w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class = "bg-white">
                    <img class = " w-full" src="${previewURL}">

                    <div class ="p-4">
                        <p> ${likes} <span class = "font-bold"> Me Gusta </span> </p>
                        <p> ${views} <span class = "font-bold"> Views </span> </p>
                        <a href = "${largeImageURL}" target ="_blank" rel= "noopener noreferrer"
                        class = "block w-full bg-pink-700 hover: bg-pink-500 text-white uppercase font-bold rounded mt-5 p-1">
                        Ver imagen </a>
                    </div>
                </div>
            </div>
        `;
    });
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total/registrosPaginas));
}