
(()=>{
    let idCliente;
    const nombreInput = document.querySelector("#nombre");
    const emailInput = document.querySelector("#email");
    const telefonoInput = document.querySelector("#telefono");
    const empresaInput = document.querySelector("#empresa");

    const formulario = document.querySelector("#formulario");

    document.addEventListener("DOMContentLoaded",()=>{
        conectarDB();

        formulario.addEventListener("submit",actualizarCliente);
        // Obtener los valores pasados por la URL
        const parametrosURL = new URLSearchParams(window.location.search);

        // Mediante elmetodoget obtenemos el id
        idCliente = parametrosURL.get("id");
        
        if(idCliente){
            setTimeout(() =>{
                obtenerCliente(idCliente);
            },300);
        }
    });

    function obtenerCliente(id){
        const transaction = DB.transaction(["crm"],"readonly");

        const objectStore = transaction.objectStore("crm");

        const cliente = objectStore.openCursor();

        cliente.onsuccess = (e) =>{
            const cursor = e.target.result;

            if(cursor){
                // Encontrar el id a editar
                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value);
                }

                cursor.continue();
            }
        }

    }


    function llenarFormulario(datosCliente){
        // Destructuring
        const {nombre,email,telefono,empresa} = datosCliente;

        // LLenar los campos con el valor
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }

    function actualizarCliente(e){
        e.preventDefault();

        if(nombreInput.value === "" || emailInput.value === "" || telefonoInput === "" || empresaInput === ""){
            imprimirAlerta("Todos los campos son obligatorios","error");

            return;
        }

        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa : empresaInput.value,
            id: Number(idCliente)
        }

        const transaction = DB.transaction(["crm"],"readwrite")
        const objectStore = transaction.objectStore("crm");

        objectStore.put(clienteActualizado);

        transaction.oncomplete = () =>{
            imprimirAlerta("Cliente editado correctamente","success");

            setTimeout(()=>{
                window.location.href = "index.html";
            },3000);
        }

        transaction.onerror = () =>{
            console.info(transaction);
            imprimirAlerta("Hubo un error al editar el cliente","error");
        }
    }
})();