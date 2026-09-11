const formulario = document.querySelector("#formEstudiante");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Formulario enviado");
});