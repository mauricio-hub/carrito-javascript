// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); 


// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     cursos.addEventListener('click', comprarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     // Al cargar el documento, mostrar LocalStorage

     document.addEventListener('DOMContentLoaded',leerLocalStorage)
   
}

// Función que añade el curso al carrito
function comprarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}
// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id')
     }

     insertarCarrito(infoCurso);

}

// Muestra el curso seleccionado en el Carrito
function insertarCarrito(curso) {
     const row = document.createElement('tr');
     row.innerHTML = `
          <td>  
          <img src="${curso.imagen}" width=100>
          </td>
          <td>${curso.titulo}</td>
          <td>${curso.precio}</td>
          <td>
          <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
          </td>
     `;
     listaCursos.appendChild(row);
     guardarCursoLocalStorage(curso);
}
// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();

     let curso, cursoId;
     
     if(e.target.classList.contains('borrar-curso') ) {
          e.target.parentElement.parentElement.remove();
          curso = e.target.parentElement.parentElement;
          cursoId = curso.querySelector('a').getAttribute('data-id');
          //console.log(cursoId)
     }
   eliminarCursoLocalStorage(cursoId);
}
// Elimina los cursos del carrito en el DOM
// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // listaCursos.innerHTML = '';
     // forma rapida (recomendada)
     while(listaCursos.firstChild) {
          listaCursos.removeChild(listaCursos.firstChild);
     }
     

     // Vaciar Local Storage
     vaciarLocalStorage();

     return false;
}

// Almacena cursos en el carrito a Local Storage

function guardarCursoLocalStorage(curso) {
    let cursos;
     // Toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();

    // el curso seleccionado se agrega al arreglo
    cursos.push(curso);
      //JSON.stringify funcion que pasa un arrelgo a string
     localStorage.setItem('cursos', JSON.stringify(cursos) );
}

// Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
     let cursosLS;

     // comprobamos si hay algo en localStorage
     if(localStorage.getItem('cursos') === null) {
          cursosLS = [];
     } else {
          cursosLS = JSON.parse( localStorage.getItem('cursos') );
     }
     return cursosLS;

}

//imprime los curso de local storage


function leerLocalStorage(){
  let cursosLS;

  cursosLS = obtenerCursosLocalStorage();

  //console.log(cursosLS);
  cursosLS.forEach( function(curso) {
        const row = document.createElement('tr');
     row.innerHTML = `
          <td>  
               <img src="${curso.imagen}" width=100>
          </td>
          <td>${curso.titulo}</td>
          <td>${curso.precio}</td>
          <td>
               <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
          </td>
     `;
      listaCursos.appendChild(row);
  });
}


//elimina de loacalStarage

 function eliminarCursoLocalStorage(curso){
 // console.log(curso)
 let cursosLS;
  //aqui obtenemos arreglo de curso
  cursosLS = obtenerCursosLocalStorage();
  //recorremos todo lo que contiene el localStorage
  cursosLS.forEach( function(cursoLS,index) {
    //comparamos el id 
     if (cursoLS.id=== curso) {
      //removemos 
      cursosLS.splice(index,1);
     }
  });
  //añadimos el arreglo actual al local storage
  localStorage.setItem('cursos',JSON.stringify(cursosLS))

 }


//elimina todos los curso de localStage
function vaciarLocalStorage() {
    localStorage.clear();
}







