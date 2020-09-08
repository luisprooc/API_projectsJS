(()=>{
    let DB;

    const nombreInput = document.querySelector("#nombre");
    document.addEventListener("DOMContentLoaded",()=>{
        conectarDB();
        // Obtener los valores pasados por la URL
        const parametrosURL = new URLSearchParams(window.location.search);

        // Mediante elmetodoget obtenemos el id
        const idCliente = parametrosURL.get("id");
        
        if(idCliente){
            setTimeout(() =>{
                obtenerCliente(idCliente);
            },1000);
        }
    });

    function obtenerCliente(id){
        const transaction = DB.transaction(["crm"],"readwrite");

        const objectStore = transaction.objectStore("crm");

        const cliente = objectStore.openCursor();

        cliente.onsuccess = (e) =>{
            const cursor = e.target.result;

            if(cursor){
                // Encontrar el id a editar
                if(cursor.value.id === Number(id)){
                    console.log(cursor.value);
                    llenarFormulario(cursor.value);
                }

                cursor.continue();
            }
        }

    }

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

    function llenarFormulario(datosCliente){
        // Destructuring
        const {nombre} = datosCliente;

        // LLenar los campos con el valor
        nombreInput.value = nombre;
    }
})();