import {mostrarAlerta,validar} from "./funciones.js";
import {nuevoCliente} from "./API.js";
(function(){
    const formulario = document.querySelector("#formulario");
    formulario.addEventListener("submit",validarCliente);


    function validarCliente(e){
        e.preventDefault();

        // Obtenemos los valores de los inputs
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const empresa = document.getElementById("empresa").value;

        // Creamos un objeto para validarlo
        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        };

        // Si un campo esta vacio
        if(!validar(cliente)){
            mostrarAlerta("Todos los campos son obligatorios");
            return;
        }

        // Agregamos un cliente a la API
        nuevoCliente(cliente);
    }
})();