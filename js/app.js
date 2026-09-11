let estudiantes = [];
const formulario = document.querySelector("#formEstudiante");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Formulario enviado");
});

const nombre = document.querySelector("#nombre").value;
const correo = document.querySelector("#correo").value;
const programa = document.querySelector("#programa").value;

const estudiante = {
    nombre,
    correo,
    programa
};

estudiantes.push(estudiante);