import {registrosPaginas,resultado,formulario,paginacionDiv,busqueda} from "./selectores.js";

let totalPaginas;
let iterador;
let paginaActual = 1;

document.addEventListener("DOMContentLoaded", () =>{
    formulario.addEventListener("submit",validarFormulario);
});

function validarFormulario(e){
    e.preventDefault();

    // Si no se agrega termino de busqueda
    if(!busqueda.value){
        mostrarError("Agrega un termino de busqueda");
        return;
    }

    // llamar la API
    buscarImagenes();
}

function mostrarError(mensaje){
    // Verificamos si existe una alerta
    const alerta = document.querySelector(".bg-red-100");

    // Si no existe la creamos
    if(!alerta){
        const alerta = document.createElement("p");
        alerta.classList.add("bg-red-100","border-red-400","text-red-700","px-4","py-3","rounded",
        "max-w-lg","mx-auto","mt-6","text-center");

        alerta.innerHTML = `
            <strong class = "font-bold"> Error </strong>
            <span class = "block sm-inline"> ${mensaje} </span>
        `;

        // Agregamos la alerta al formulario
        formulario.appendChild(alerta);

        setTimeout(() =>{
            alerta.remove();
        },3000);
    }
}

// Llamada a la API
function buscarImagenes(){

    // LLave que proporciona la API
    const key = "18386507-736d402e07fb46a9e06bf5f08";

    // Forma de pedir datos a la API
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda.value}&per_page=${registrosPaginas}&page=${paginaActual}`;

    // Extremos los datos con fetch
    fetch(url)
        .then(resultado => resultado.json())
        .then(resultado => {
            // Calculamos el numero de paginas que tendremos
            totalPaginas = calcularPaginas(resultado.totalHits);

            // Mostramos las imagenes en el HTML
            mostrarImagenes(resultado.hits);
        });
}

function mostrarImagenes(imagenes){
    // Limpiar HTML
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    // Recorremos el arreglo de imagenes para mostrar cada una
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

    // Imprimir la paginacion calculada
    imprimirPaginador();
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total/registrosPaginas));
}

// Creamos un iterador
function *crearPaginador(total){
    for(let i = 1; i<= total; i++){
        yield i;
    }
}

function imprimirPaginador(){
    iterador = crearPaginador(totalPaginas);

    // Limpiamos la paginacion
    paginacionDiv.innerHTML = ``;

    // Mientras iterador sea true crear botones
    while(true){
        const{value, done} = iterador.next();
        if(done){
            return;
        }

        // Crear boton si aun no se acaba

        const boton = document.createElement("a");
        boton.href = "#";
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add("siguiente","bg-yellow-400","px-4","py-1","mr-2","font-bold","mb-4","rounded");

        boton.onclick = () =>{
            paginaActual = value;

            //buscar imagenes
            buscarImagenes();
        }

        // Agregamos los botones al HTML
        paginacionDiv.appendChild(boton);

    }
}
