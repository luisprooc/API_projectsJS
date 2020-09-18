import * as UI from "./interfaz.js";
import {mostrarError} from "./app.js";
class API{
    constructor(artista,cancion){
        this.artista = artista;
        this.cancion = cancion;
    }

    consultarAPI(){
        // COnsultamos la API
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

        fetch(url)
            .then(resultado => resultado.json())
            .then(resultado => {
                    UI.formularioBuscar.reset();
                    if(resultado.lyrics){
                        UI.divResultado.textContent = resultado.lyrics;
                        UI.headingResultado.textContent = `Letra de la cancion: ${this.cancion} de ${this.artista}`;
                    }

                    else{
                        UI.divResultado.textContent = "";
                        UI.headingResultado.textContent = "";
                        mostrarError("La cancion no existe");
                    }
                });
        

    }
}

export default API;