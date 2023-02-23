//  Variables globales

//#Formulario 'listaActividades' provienen de indexhtml
// cost declaradas vista hacia el usuario
const formularioUI = document.querySelector("#formulario");
const listaActividadesUI = document.getElementById("listaActividades");
const actividadUI = document.getElementById("actividad");


//Parte vacio, para guardar la información
let arrayActividades = [];

//      Funciones
//      Creando el Item, se pasa la actividad
const CrearItem = (actividad) => {
  let item = {
    actividad: actividad,
    estado: false,
  };

  //guardar dentro del array
  arrayActividades.push(item);

  return item;
};

//Guardar en localStorage
const GuardarDB = () => {
  //local storage solo almacena strings, se usa JSON.stringify,|Obj-Strng| queda en txt(string) pero en formato JSON
  //rutina: key de ls | arrayActividades: value de ls
  localStorage.setItem("rutina", JSON.stringify(arrayActividades));

  //Con esto se visualiza en el cliente al hacer submit
  PintarDB();

  

};

//Funcion para mandar inf. de lS a html, se ejecuta cuando carga el sitio

const PintarDB = () => {
  //Strng vacio, cuando carga el sitio web, se limpia el div
  listaActividadesUI.innerHTML = "";
  //Parsearlo a un array
  arrayActividades = JSON.parse(localStorage.getItem("rutina"));

  //Si no hay inf en lS se da la condicion
  if (arrayActividades === null) {
    arrayActividades = [];
  } else {
    //Recorrer el array, se ejecuta el foreach, se pinta por cada element del array
    arrayActividades.forEach((element, index) => {
      //Se aplicó cambio ,  index
      listaActividadesUI.innerHTML += `<div class="alert alert-danger" role="alert"><span class="material-symbols-outlined float-left m2-3">accessibility</span><b>${
        element.actividad 
      }</b> - ${
        element.estado ? "Completado" : "Sin completar" }<span class="float-right"><span class="material-symbols-outlined">done</span><span class="material-symbols-outlined" onclick=EliminarDB(${index})>delete</span><span class="material-symbols-outlined" onclick=EditarDB(${index},'${element.actividad}')>edit
      </span></span></div>`;
    });

    // Arrriba cambios para mandar a input informacion editada

    //Agregó  despues de .estado seccion completado - sin completar
    // / ? if , : else

  }
};

const EliminarDB = (i) => {
  // Se cambio de actividad a i, items, tambien cambio en splice
  arrayActividades.splice(i, 1);

  /*let indexArray;
        arrayActividades.forEach(( elemento , index ) => {
            //comparacion elemento html con la DB
            //Flujo:
                //Presionar papelera ejecuta fx EliminarDB viajando el texto
                //const EliminaDB recorriendo el Array de la DB
                //Comparacion 
            if(elemento.actividad === actividad){
                indexArray=index;
            }
        })

        //Se debe mandar al LS, por que ya no tiene un elemento
        arrayActividades.splice(indexArray,1);*/
  GuardarDB();

};


const EditarDB = (index, item) => {

    actividadUI.value = item;


    //arrayActividades.splice(i,1,item);

    const add_button = document.querySelector("#add");

    add_button.style.display= "none";


    const update_button = document.createElement("button");
    update_button.innerHTML = "Actualizar";
    update_button.className ="btn btn-primary";

    formularioUI.appendChild(update_button);


  update_button.addEventListener("click", e => {
      e.preventDefault();
    arrayActividades.splice(index,1,{
      ...arrayActividades[index],  
    "actividad":actividadUI.value
  })

  localStorage.setItem("rutina", JSON.stringify(arrayActividades));

  PintarDB();


  update_button.hidden = true;

  add_button.style.display= "block";
  
  formularioUI.reset()

})



}



//  EventListener

//Formulario de la const Formulario

//Arrow Function
formularioUI.addEventListener("submit", (e) => {
  //Prevenir cualquier evento que exista en el sitio, no refresca...
  e.preventDefault();
  //Leer el input, value captura el valor que viene del input
 

  //Recibe la actividad que viene del input
  CrearItem(actividadUI.value);
  //Manda llamar la fx GuardarDB para pintar en localStorage c/u de las act.
  GuardarDB();

  //Permite limpiar el formulario, una vez que se de submit para almacenar el dato
  formularioUI.reset();
});

//Pintar la inf. de localStorage en index.html vista cliente
//Uso del DOM, el evento se genera cuando el DOM esta cargado;

document.addEventListener("DOMContentLoaded", PintarDB);

/*listaActividadesUI.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
            let texto = e.target.innerHTML;
                if(e.target.innerHTML === 'delete'){
                    //  Accion de eliminar
                    EliminarDB(texto);
                }
                if(e.target.innerHTML === 'done'){
            }
            }
        });*/
