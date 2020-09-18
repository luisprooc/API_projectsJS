import * as UI from "./interfaz.js";

UI.formularioBuscar.addEventListener("submit",buscarCancion);

function buscarCancion(e){
    e.preventDefault();

    // Obtener datos
    const artista = document.getElementById("artista").value;
    const cancion = document.getElementById("cancion").value;

    // Validar formulario

    if(artista === "" || cancion === ""){
        mostrarError("Todos los campos son obligatorios")
        return;
    }
}



function mostrarError(mensaje){
    UI.divMensaje.textContent = mensaje;
    UI.divMensaje.classList.add("error");

    setTimeout(() =>{
        UI.divMensaje.textContent = "";
        UI.divMensaje.classList.remove("error");
    },3000)
}