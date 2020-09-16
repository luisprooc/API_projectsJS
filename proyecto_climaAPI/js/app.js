import {formulario,ciudad, pais, container} from "./variables.js";

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

    else{
        console.log(pais,ciudad)
    }
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