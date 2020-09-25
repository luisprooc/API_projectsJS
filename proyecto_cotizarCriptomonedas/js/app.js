import {criptomonedasSelect,formulario,objBusqueda,monedaSelect} from "./selectores.js";

// Promesa para las criptomonedas obtenidas
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas);
});


document.addEventListener("DOMContentLoaded",() =>{
    // Obtenemos las 10 criptomonedas mas populares
    consultarCriptomonedasPopulares();

    // Validamos el formulario
    formulario.addEventListener("submit",validarDatos);
    criptomonedasSelect.addEventListener("change",leerValor);
    monedaSelect.addEventListener("change",leerValor);
});

async function consultarCriptomonedasPopulares(){
    // Consultar y traer las criptomonedas mas populares
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const criptomonedas = await obtenerCriptomonedas(resultado.Data);
        selectCriptomonedas(criptomonedas);
        

    } 
    catch (error) {
        console.log(error);
    }
}


function selectCriptomonedas(criptomonedas){

    // LLenar el campo del select con los datos de la API
    criptomonedas.forEach(cripto => {
        const {FullName,Name} = cripto.CoinInfo;

        const option = document.createElement("option");

        option.value = Name;
        option.textContent = FullName;

        criptomonedasSelect.appendChild(option);
    });
}


function leerValor(e){
    // Llenamos el objeto de busqueda con el valor de los select
    objBusqueda[e.target.name] = e.target.value;
}

function validarDatos(e){
    e.preventDefault();

    // Mostramos un error si los campos estan vacios
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

async function  consultarAPI(){
    // Consultamos la API con los valores del objeto
    const {criptomoneda,moneda} = objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    cargarSpinner();

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        // Accedemos dinamicamente al objeto que nos manda la API
        mostrarCotizacion(resultado.DISPLAY[criptomoneda][moneda])
    } 
    catch (error) {
        console.log(error);
    }
}

function mostrarCotizacion(cotizacion){
    limpiarHTML();

    // destructuring al objeto de la API
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR,LASTUPDATE} = cotizacion;

    // Creamos parrafos para cada valor
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

    // Mandamos los valores al div resultado
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

function cargarSpinner(){
    // Creamos un spinner 
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");

    spinner.innerHTML = `
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    `;

    resultado.appendChild(spinner);

}

