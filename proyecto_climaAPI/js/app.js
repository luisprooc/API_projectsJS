// Variables

const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");


// Eventos
window.addEventListener("load", () =>{
    formulario.addEventListener("submit",buscarClima);
});


function buscarClima(e){
    e.preventDefault();

    console.log("Obtener clima");
    // Validar
}