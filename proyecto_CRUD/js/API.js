// Url de la API
const url = "http://localhost:3000/clientes";

export const nuevoCliente = async cliente =>{
    try {
        // Agregamos un  cliente a la API
        await fetch(url,{
            method: "POST",
            body: JSON.stringify(cliente),
            headers:{
                "content-Type": "application/json"
            }
        });
        // Mandarme a la pagina principal luego de completarse
        window.location.href = "index.html";
    } 
    catch (error) {
        console.log(error);
    }
}

export const obtenerClientes = async() => {
    try {
        // Obtener todos los clientes de la API
        const resultado = await fetch(url);
        const clientes = await resultado.json();
        return clientes;
    } 
    catch (error) {
        console.log(error);
    }
}

export const eliminarCliente = async (id) =>{
    try {
        // Eliminar un cliente de la API
        await fetch(`${url}/${id}`,{
            method: "DELETE",

        });
        // Mostrar los clientes luego de eliminar
        obtenerClientes();
    } 
    catch (error) {
        console.log(error);
    }
}

export const obtenerCliente = async (id) =>{
    try {
        // Obtener el cliente deseado desde la API
        const respuesta = await fetch(`${url}/${id}`);
        const cliente = await respuesta.json();
        return cliente;
    } 

    catch (error) {
        console.log(error);
    }
}

export const editarCliente = async (cliente) =>{
    try {
        // Actualizar el cliente
        await fetch(`${url}/${cliente.id}`,{
            method: "PUT",
            body: JSON.stringify(cliente),
            headers:{
                "Content-Type": "application/json"
            }
        });
        window.location.href = "index.html";
        
    } 
    catch (error) {
        console.log(error);
    }
}