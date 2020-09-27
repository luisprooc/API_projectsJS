const url = "http://localhost:3000/clientes";

export const nuevoCliente = async cliente =>{
    try {
        await fetch(url,{
            method: "POST",
            body: JSON.stringify(cliente),
            headers:{
                "content-Type": "application/json"
            }
        });
        window.location.href = "index.html";
    } 
    catch (error) {
        console.log(error);
    }
}

export const obtenerClientes = async() => {
    try {
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
        await fetch(`${url}/${id}`,{
            method: "DELETE",

        });
        obtenerClientes();
    } 
    catch (error) {
        console.log(error);
    }
}