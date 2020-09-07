(() => {
    let DB;

    const formulario = document.querySelector("#formulario");

    document.addEventListener("DOMContentLoaded", () =>{
        conectarDB();

        formulario.addEventListener("click",validarCliente);
    });

    function conectarDB(){
        const abrirDB = window.indexedDB.open("crm",1);
        
        // Si ocurre un error
        abrirDB.onerror = () =>{
            console.error("Hubo un  error al conectar la DB");
        }

        abrirDB.onsuccess = () =>{
            // Asignar el resultado de la DB
            DB = abrirDB.result;
            console.log("Conexion establecida");
        }
    }

    function validarCliente(e){
        e.preventDefault();

        // Leer los inputs

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const empresa = document.getElementById("empresa").value;

        if(nombre === "" || email === "" || telefono === "" || empresa === ""){
            imprimirAlerta("Todos los campos son obligatorios","error")
        }
    }

    function imprimirAlerta(mensaje,tipo){

        const alerta = document.querySelector(".alerta");

        if(alerta === null){
            // crear alerta
            const divMensaje = document.createElement("div");
            divMensaje.classList.add("px-4","py-3","rounded","max-w-lg","mx-auto","mt-6","text-center","border","alerta");

            if(tipo === "error"){
                divMensaje.classList.add("bg-red-100","border-red-400","text-red-700");

            }
            
            else{
                divMensaje.classList.add("bg-green-100","border-green-400","text-green-700");
            }

            // Agregar mensaje
            divMensaje.textContent = mensaje;

            // Agregar al padre
            formulario.appendChild(divMensaje);

            setTimeout(() =>{
                divMensaje.remove();
            },3000);
            }
    }
})();