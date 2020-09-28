import {obtenerCliente} from "./API.js";
(function(){
    const nombreInput = document.getElementById("nombre");
    const empresaInput = document.getElementById("empresa");
    const emailInput = document.getElementById("email");
    const telefonoInput = document.getElementById("telefono");
    const idInput = document.getElementById("id");

    document.addEventListener("DOMContentLoaded", async()=>{
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente = parametrosURL.get("id");
        const cliente = await obtenerCliente(idCliente);

        mostrarCliente(cliente);
    });

    function mostrarCliente(cliente){
        const {nombre, empresa, email, telefono, id} = cliente;

        nombreInput.value = nombre;
        empresaInput.value = empresa;
        emailInput.value = email;
        telefonoInput.value = telefono;
        idInput.value = id;
    }
})();