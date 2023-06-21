const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners() {

    //cuando agregamos un curos presionando "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso)

    //eliminar curso

    carrito.addEventListener('click', eliminarCurso)

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML()

    })



}

//funciones

function agregarCurso(e) {

    e.preventDefault()

    if (e.target.classList.contains("agregar-carrito")) {

        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

//elimnar datos curso

function eliminarCurso(e) {

    if (e.target.classList.contains("borrar-curso")) {

        const cursoId = e.target.getAttribute("data-id");

        //elimina del array el articuloCarrito por el data-id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }

}

function leerDatosCurso(curso) {
    //console.log(curso)

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span ").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //Revisa si el elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso
            } else {
                return curso
            }
        })
        articulosCarrito = [...cursos]

    } else {
        //Agregar elementos al array carrito

        articulosCarrito = [...articulosCarrito, infoCurso]


    }

    console.log(articulosCarrito)

    carritoHTML();
}


function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();


    //recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {

        const { imagen, titulo, precio, cantidad } = curso


        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td> 
        <td> <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a> </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)


    })
}

function limpiarHTML() {

    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }



}