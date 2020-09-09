
(() => {

    const formulario = document.querySelector("#formulario");

    document.addEventListener("DOMContentLoaded", () =>{
        conectarDB();

        formulario.addEventListener("submit",validarCliente);
    });


    function validarCliente(e){
        e.preventDefault();

        // Leer los inputs

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const empresa = document.getElementById("empresa").value;

        if(nombre === "" || email === "" || telefono === "" || empresa === ""){
            imprimirAlerta("Todos los campos son obligatorios","error");
            return; 
        }

        // crear un ojeto con la informacion

        const cliente = {
            // No se coloca llave y valor porque son lo mismo
            nombre,
            email,
            telefono,
            empresa,
            id : Date.now()
        }

        crearCliente(cliente);
    }

    function crearCliente(cliente){
        // Crear transaccion
        const transaction = DB.transaction(["crm"],"readwrite");

        // Definir el ObjectStore
        const objectStore = transaction.objectStore("crm");

        objectStore.add(cliente);

        // Si ocurre un error mostrar alerta
        transaction.onerror = () =>{
            imprimirAlerta("Hubo un error en la transaccion","error");
        }

        // Si se completa mostrar alerta
        transaction.oncomplete = () =>{
            imprimirAlerta("Cliente agregado","success");

            // Luego de 3 segundos mandar a la localizacion de la pagina principal
            setTimeout(() => {
                window.location.href = "index.html";
            },3000);
        }
    }
})();