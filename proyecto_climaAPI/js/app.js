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
            if(resultado.cod === "404"){
                console.log("Ciudad no encontrada");
            }

            else{
                console.log(resultado);
            }
        })
}