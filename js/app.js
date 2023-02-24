import { valida } from "./validaciones.js";

//QuerySelectorAll regresa un arreglo.
const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});