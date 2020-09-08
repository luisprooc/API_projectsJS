// Los IIFE sirven para que no puedas acceder a los metodos definidos aqui desde otro archivo
(()=>{
    let DB;


    document.addEventListener("DOMContentLoaded",()=>{
        crearDB();

        if(window.indexedDB.open("crm",1)){
            obtenerClientes();
        }
    });

    // crear base de datos

    function crearDB(){
        const db = window.indexedDB.open("crm",1);
        
        // Si ocurre un error
        db.onerror = () =>{
            console.error("Hubo un  error al crearse la DB");
        }

        db.onsuccess = () =>{
            // Asignar el resultado de la DB
            DB = db.result;
        }

        // Configuracion
        db.onupgradeneeded = (e) =>{
            const crearDb = e.target.result;
            
            // Definir ObjectStore
            const objectStore = crearDb.createObjectStore("crm",
            {
                keypath: "id",
                autoIncrement: true
            });

            // Crear campos

            objectStore.createIndex("nombre","nombre",{unique: false});
            objectStore.createIndex("email","email",{unique: true});
            objectStore.createIndex("telefono","telefono",{unique: false});
            objectStore.createIndex("empresa","empresa",{unique: false});
            objectStore.createIndex("id","id",{unique: true});
            
            console.log("Base de datos lista");
        }
    }

    function obtenerClientes(){
        const abrirConexion = window.indexedDB.open("crm",1);

        abrirConexion.onerror = () =>{
            console.error("No se pudo abrir la DB");
        }

        abrirConexion.onsuccess = () =>{
            DB = abrirConexion.result;

            const objectStore = DB.transaction("crm").objectStore("crm");

            objectStore.openCursor().onsuccess = (e) =>{
                const cursor = e.target.result;

                if(cursor){
                    const {nombre, empresa, email, telefono, id} = cursor.value;

                    const listadoClientes = document.querySelector("#listado-clientes");
                    listadoClientes.innerHTML += `
                    <tr>
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
                            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                        </td>
                    </tr>
                    `;
                    cursor.continue();
                }

                else{
                    console.log("No hay mas registror");
                }
            }
        }
    }
})();