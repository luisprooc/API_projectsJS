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

    consultarAPI(busqueda);
}

function mostrarMensaje(mensaje){
    const alerta = document.querySelector(".alerta");
    if(!alerta){
        resultado.innerHTML = ``;
        const alerta = document.createElement("div");
        alerta.classList.add("bg-gray-100","p-3","text-center","mt-3","alerta");
        alerta.textContent = mensaje;

        formulario.appendChild(alerta);

        setTimeout(() =>{
            alerta.remove();
        },3000);
    }
}

function consultarAPI(busqueda){
    const gitHubUrl = `https://jobs.github.com/positions.json?search=${busqueda}`;
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(gitHubUrl)}`;
    mostrarSpinner();
    axios.get(url)
        .then(respuesta => mostrarVacantes(JSON.parse(respuesta.data.contents)))
}

function mostrarVacantes(vacantes){
    formulario.reset();
    formulario.removeChild(formulario.lastChild);
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    if(vacantes.length > 0){
        resultado.classList.add("grid");

        vacantes.forEach(vacante =>{
            const {company,title,type,url} = vacante;

            resultado.innerHTML += `
                
            <div class="shadow bg-white p-6 rounded">
                <h2 class="text-2xl font-light mb-4">${title}</h2>
                <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
            </div>
            `;
        });
    }

    else{
        const noResultado = document.createElement("p");
        noResultado.classList.add("text-center","mt-10","text-gray-600","w-full","font-bold");
        noResultado.textContent = "No hay vacantes que mostrar";

        resultado.appendChild(noResultado);
    }
}

function mostrarSpinner(){
    console.log("mostrando")
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");

    spinner.innerHTML = `
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    `;

    formulario.appendChild(spinner);
}