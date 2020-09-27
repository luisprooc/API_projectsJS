(function(){
    const formulario = document.querySelector("#formulario");
    formulario.addEventListener("submit",validarCliente);


    function validarCliente(e){
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const empresa = document.getElementById("empresa").value;

        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        };

        if(!validar(cliente)){
            console.log("No")
            return;
        }

        console.log("Se paso la validacion");
    }

    function validar(obj){
        return Object.values(obj).every(input => input != "");
    }
})();