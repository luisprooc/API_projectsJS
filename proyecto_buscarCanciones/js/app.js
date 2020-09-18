import * as UI from "./interfaz.js";
import API from "./api.js";

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
    // Instanciamos un objeto
    const busqueda = new API(artista,cancion);
    busqueda.consultarAPI();
}


// Si el formulario no esta lleno
export function mostrarError(mensaje){
    UI.divMensaje.textContent = mensaje;
    UI.divMensaje.classList.add("error");

    setTimeout(() =>{
        UI.divMensaje.textContent = "";
        UI.divMensaje.classList.remove("error");
    },3000)
}