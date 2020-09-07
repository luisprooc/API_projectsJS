// Los IIFE sirven para que no puedas acceder a los metodos definidos aqui desde otro archivo
(()=>{
    let DB;


    document.addEventListener("DOMContentLoaded",()=>{
        crearDB();
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
})();