import {mostrarAlerta} from "./funciones.js";
import {nuevoCliente} from "./API.js";
(function(){
    const formulario = document.querySelector("#formulario");
    formulario.addEventListener("submit",validarCliente);


    function validarCliente(e){
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const empresa = document.getElementById("empresa").value;

        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        };

        if(!validar(cliente)){
            mostrarAlerta("Todos los campos son obligatorios");
            return;
        }

        nuevoCliente(cliente);
    }

    function validar(obj){
        return Object.values(obj).every(input => input != "");
    }
})();