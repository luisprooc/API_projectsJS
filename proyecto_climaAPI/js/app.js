import {formulario,ciudad, pais, container, resultado} from "./variables.js";

// Eventos
window.addEventListener("load", () =>{
    formulario.addEventListener("submit",buscarClima);
});


function buscarClima(e){
    e.preventDefault();

    // Validar
    if(ciudad.value === "" || pais.value === ""){
        // Hubo un error
        mostrarError("Ambos campos son obligatorios");
        return;
    }

    consultarAPI(ciudad.value,pais.value);
}

function mostrarError(mensaje){

    const alerta = document.querySelector(".bg-red-100");
    if(!alerta){
        // crear alerta
        const alerta = document.createElement("div");

        alerta.classList.add("bg-red-100","border-red-400","text-red-700","px-4","py-3",
        "rounded","max-w-md","mx-auto","mt-6","text-center");

        alerta.innerHTML = `
            <strong class = "font-bold"> ERROR </strong>
            <span class = "block"> ${mensaje} </span>
        `;
        container.appendChild(alerta);

        // Eliminar alerta
        
        setTimeout(() =>{
            alerta.remove()
        },3000);
    }
}

function consultarAPI(ciudad,pais){
    const appId = "3d9f03203b4666cd8b2452c01b98cd92";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            // Limpiamos el html y reseteamos el formulario
            limpiarHtml();
            formulario.reset();

            if(resultado.cod === "404"){
                mostrarError("Los datos que introduciste no son validos");
            }

            else{
                // Mostras datos de la respuesta
                mostrarClima(resultado);
            }
        })
}

function mostrarClima(datos){
    const {main: {temp,temp_max,temp_min}} = datos;

    // Convertir de kelvin a centigrados
    const centigrados = temp - 273.15;
    const actual = document.createElement("p");

    // Agregar la temperatura al elemento
    actual.innerHTML = `${parseInt(centigrados)}&#8451;`;
    actual.classList.add("font-bold","text-6xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center","text-white");
    resultadoDiv.appendChild(actual);

    // Agregarle el div con la informacion al elemento
    resultado.appendChild(resultadoDiv);


}

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}