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

    consultarAPI();
}


function mostrarError(mensaje){
    const divMensaje = document.querySelector(".error");
    if(!divMensaje){
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("error");

        divMensaje.innerHTML = `${mensaje}`;

        formulario.appendChild(divMensaje);

        setTimeout(() =>{
            divMensaje.remove();

        },3000);
    }
}

function  consultarAPI(){
    const {criptomoneda,moneda} = objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
        .then(resultado => resultado.json())
        .then(resultado => {
            
            mostrarCotizacion(resultado.DISPLAY[criptomoneda][moneda])
        });
}

function mostrarCotizacion(cotizacion){
    limpiarHTML();

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR,LASTUPDATE} = cotizacion;

    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.innerHTML = `El precio es: <span> ${PRICE} </span>`;

    const precioAlto = document.createElement("p");
    precioAlto.innerHTML = `El precio mas alto del dia: <span> ${HIGHDAY} </span>`;

    const precioBajo = document.createElement("p");
    precioBajo.innerHTML = `El precio mas bajo del dia: <span> ${LOWDAY} </span>`;

    const actualizacionDia = document.createElement("p");
    actualizacionDia.innerHTML = `Ultima actualizacion del dia: <span> ${CHANGEPCT24HOUR}% </span>`;

    const actualizacion = document.createElement("p");
    actualizacion.innerHTML = `Ultima actualizacion: <span> ${LASTUPDATE} </span>`;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(actualizacionDia);
    resultado.appendChild(actualizacion);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}