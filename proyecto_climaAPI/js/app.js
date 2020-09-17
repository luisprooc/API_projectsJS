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
    const {name,main: {temp,temp_max,temp_min}} = datos;

    // Convertir de kelvin a centigrados
    const centigrados = kelvinCentigrados(temp);
    const max = kelvinCentigrados(temp_max);
    const min = kelvinCentigrados(temp_min);

    // Agregar la ciudad
    const ciudad = document.createElement("p");
    ciudad.innerText = `Ciudad: ${name}`;
    ciudad.classList.add("font-bold","text-2xl");

    // Agregar la temperatura al elemento
    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados}&#8451;`;
    actual.classList.add("font-bold","text-6xl");

    // Agregar la temperatura maxima
    const tempMax = document.createElement("p");
    tempMax.innerHTML = `Max: ${max}&#8451;`;
    tempMax.classList.add("text-xl");

    // Agregar la temperatura minima
    const tempMin = document.createElement("p");
    tempMin.innerHTML = `Min: ${min}&#8451;`;
    tempMin.classList.add("text-xl");

    // Div que contendra esos elementos
    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center","text-white");
    resultadoDiv.appendChild(ciudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    // Agregarle el div con la informacion al elemento
    resultado.appendChild(resultadoDiv);


}

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

const kelvinCentigrados = grados => parseInt(grados- 273.15);