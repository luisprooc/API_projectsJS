import {criptomonedasSelect,formulario,objBusqueda,monedaSelect} from "./selectores.js";

const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas);
});


document.addEventListener("DOMContentLoaded",() =>{
    consultarCriptomonedasPopulares();
    formulario.addEventListener("submit",validarDatos);
    criptomonedasSelect.addEventListener("change",leerValor);
    monedaSelect.addEventListener("change",leerValor);
});

function consultarCriptomonedasPopulares(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

    fetch(url)
        .then(resultado => resultado.json())
        .then(resultado =>  obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}


function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach(cripto => {
        const {FullName,Name} = cripto.CoinInfo;

        const option = document.createElement("option");

        option.value = Name;
        option.textContent = FullName;

        criptomonedasSelect.appendChild(option);
    });
}


function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
}

function validarDatos(e){
    e.preventDefault();

    if(!objBusqueda.criptomoneda || !objBusqueda.moneda){
        mostrarError("Ambos campos son obligatorios");
        return;
    }
}


function mostrarError(mensaje){
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("error");

    divMensaje.innerHTML = `${mensaje}`;

    formulario.appendChild(divMensaje);

    setTimeout(() =>{
        divMensaje.remove();

    },3000);
}