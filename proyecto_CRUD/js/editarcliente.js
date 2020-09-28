import {editarCliente, obtenerCliente} from "./API.js";
import {mostrarAlerta,validar} from "./funciones.js";
(function(){
    // Seleccionamos todos los campos del formulario
    const nombreInput = document.getElementById("nombre");
    const empresaInput = document.getElementById("empresa");
    const emailInput = document.getElementById("email");
    const telefonoInput = document.getElementById("telefono");
    const idInput = document.getElementById("id");

    document.addEventListener("DOMContentLoaded", async()=>{
        // Obtenemos el id del cliente desde la URL
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente = parametrosURL.get("id");

        // Obtenemos el cliente
        const cliente = await obtenerCliente(idCliente);

        mostrarCliente(cliente);

        // Submit al formulario

        const formulario = document.querySelector("#formulario");
        formulario.addEventListener("submit",validarCliente);
    });

    function mostrarCliente(cliente){
        const {nombre, empresa, email, telefono, id} = cliente;

        // LLenar los values de los campos con los datos del cliente seleccionado
        nombreInput.value = nombre;
        empresaInput.value = empresa;
        emailInput.value = email;
        telefonoInput.value = telefono;
        idInput.value = id;
    }

    function validarCliente(e){
        e.preventDefault();

        //Creamos un objeto con los datos del cliente a actualizar
        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt(idInput.value)
        };

        if(!validar(cliente)){
            mostrarAlerta("Todos los campos son obligatorios");
            return;
        }

        // Reescribe un cliente
        editarCliente(cliente)
    }

})();