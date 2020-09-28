export function mostrarAlerta(mensaje){
    const alerta = document.querySelector(".bg-red-100");

    if(!alerta){
        // Creamos una alerta de error
        const alerta = document.createElement("p");

        alerta.classList.add("bg-red-100","border-red-400","text-red-700",
        "px-4","py-3","rounded","max-w-lg","mx-auto","mt-6","text-center");

        alerta.innerHTML = `
            <strong class = "font-bold"> ERROR </strong>
            <span class = "block sm-inline"> ${mensaje} </span>
        `;

        // La agregamos al formulario
        document.querySelector("#formulario").appendChild(alerta);

        setTimeout(() =>{
            alerta.remove();
        },3000);
    }
}

export function validar(obj){
    // Verificamos si todos los campos del objeto estan llenos
    return Object.values(obj).every(input => input != "");
}