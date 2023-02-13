//  Variables globales
    
//#Formulario 'listaActividades' provienen de indexhtml
// cost declaradas vista hacia el usuario
    const formularioUI = document.querySelector('#formulario');
    const listaActividadesUI = document.getElementById('listaActividades')

//Parte vacio, para guardar la información
    let arrayActividades = [];

  

//  Funciones
//      Creando el Item, se pasa la actividad 
    const CrearItem = (actividad) => {

        let item = {
            actividad: actividad,
            estado: false 
        }
    
//guardar dentro del array
        arrayActividades.push(item);

        return item;

    }

//Guardar en localStorage
    const GuardarDB = () => {

        //local storage solo almacena strings, se usa JSON.stringify, queda en txt pero en formato JSON
        localStorage.setItem('rutina', JSON.stringify(arrayActividades ));

        //Con esto se visualiza en el cliente al hacer submit
        PintarDB();


    }

//Funcion para mandar inf. de lS a html, se ejecuta cuando carga el sitio

    const PintarDB = () =>{
        //Strng vacio, cuando carga el sitio web, se limpia el div
        listaActividadesUI.innerHTML = "";
        //Parsearlo a un array
        arrayActividades = JSON.parse(localStorage.getItem('rutina'));

        //Si no hay inf en lS se da la condicion
        if(arrayActividades === null){
            arrayActividades = []
        }else{

            //Recorrer el array, se ejecuta el foreach, se pinta por cada element del array
            arrayActividades.forEach(element => {
            listaActividadesUI.innerHTML += `  <div class="alert alert-danger" role="alert"><i class="material-symbols-outlined float-left m2-3">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><span class="material-symbols-outlined"> done </span><span class="material-symbols-outlined"> delete </span></span></div>`
            });
        }



    }



//  EventListener


//Formulario de la const

formularioUI.addEventListener('submit', (e) => {
    //Prevenir cualquier evento que exista en el sitio
    e.preventDefault();
    //Leer el input, value captura el valor que viene del input
    let actividadUI = document.querySelector('#actividad').value;


    
    //Recibe la actividad que viene del input
    CrearItem(actividadUI);
    //Manda llamar la fx GuardarDB para pintar en localStorage c/u de las act.
    GuardarDB();

    //Permite limpiar el formulario, una vez que se de submit para almacenar el dato
    formularioUI.reset();


});


//Pintar la inf. de localStorage en index.html vista cliente
//Uso del DOM, el evento se genera cuando el DOM esta cargado;

document.addEventListener('DOMContentLoaded', PintarDB);


listaActividadesUI.addEventListener('onsubmit', (e) => {

    e.preventDefault();
    console.log(e);

});