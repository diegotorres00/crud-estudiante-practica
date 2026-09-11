let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
let estudianteEditando = null;
const formulario = document.querySelector("#formEstudiante");


formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const correo = document.querySelector("#correo").value;
    const programa = document.querySelector("#programa").value;

    const existe = estudiantes.find(
        estudiante =>
            estudiante.correo === correo &&
            estudiante.id !== estudianteEditando
    );

    if (existe) {
        alert("Ya existe un estudiante con ese correo.");
        return;
    }

    if (estudianteEditando === null) {
        const estudiante = {
            id: Date.now(),
            nombre,
            correo,
            programa
        };

        estudiantes.push(estudiante);
    } else {
        const estudiante = estudiantes.find(
            estudiante => estudiante.id === estudianteEditando
        );

        estudiante.nombre = nombre;
        estudiante.correo = correo;
        estudiante.programa = programa;
        estudianteEditando = null;
    }

    guardarEstudiantes();
    mostrarEstudiantes();
    formulario.reset();
    console.log("Formulario enviado");
});

function guardarEstudiantes() {

    localStorage.setItem(
        "estudiantes",
        JSON.stringify(estudiantes)
    );
}

function mostrarEstudiantes(lista = estudiantes) {

    const tabla = document.querySelector("#tablaEstudiantes");
    const totalEstudiantes = document.querySelector("#totalEstudiantes");

    tabla.innerHTML = "";
    totalEstudiantes.textContent = `Total estudiantes: ${estudiantes.length}`;

    lista.forEach(estudiante => {

        tabla.innerHTML += `
            <tr>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.correo}</td>
                <td>${estudiante.programa}</td>
                <td>
                    <button onclick="editarEstudiante(${estudiante.id})">Editar</button>
                    <button onclick="eliminarEstudiante(${estudiante.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

const buscador = document.querySelector("#buscar");

buscador.addEventListener("input", function() {

    const texto = buscador.value.toLowerCase();

    const resultado = estudiantes.filter(
        estudiante =>
            estudiante.nombre
                .toLowerCase()
                .includes(texto)
    );

    mostrarEstudiantes(resultado);
});

//Estas son las funciones para eliminar y editar estudiantes

function eliminarEstudiante(id) {

    const confirmar = confirm(
        "¿Desea eliminar este estudiante?"
    );

    if (!confirmar) {
        return;
    }

    estudiantes = estudiantes.filter(
        estudiante => estudiante.id !== id
    );

    guardarEstudiantes();
    mostrarEstudiantes();
}

function editarEstudiante(id) {

    const estudiante = estudiantes.find(
        estudiante => estudiante.id === id
    );

    document.querySelector("#nombre").value = estudiante.nombre;
    document.querySelector("#correo").value = estudiante.correo;
    document.querySelector("#programa").value = estudiante.programa;

    estudianteEditando = id;
}

mostrarEstudiantes();