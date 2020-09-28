import {obtenerClientes,eliminarCliente} from "./API.js";
(function(){
    const listado = document.querySelector("#listado-clientes");
    listado.addEventListener("click",confirmarEliminar);

    // Cuando cargye el documento mostramos los clientes
    document.addEventListener("DOMContentLoaded",mostrarClientes);

    async function mostrarClientes(){

        // Obtenemos todos los clientes de la API
        const clientes = await obtenerClientes();
        
        clientes.forEach(cliente => {

            // Creamos tablas para mostrar los clientes
            const row = document.createElement("tr");
            const {nombre, email, telefono, empresa, id} = cliente;

            row.innerHTML += `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${telefono}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${empresa}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
        `;

        // Lo agregamos al listado
        listado.appendChild(row);
    });
    }

    function confirmarEliminar(e){

        // Delegation para eliminar el cliente
        if(e.target.classList.contains("eliminar")){

            // Obtenemos el id del cliente
            const clienteID = e.target.dataset.cliente;
            if(confirm("¿Deseas eliminar este cliente?")){

                // Eliminamos el cliente de la API
                eliminarCliente(clienteID);
            }
        }
    }
})();