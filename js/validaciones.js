export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        //parentElement, para seleccionar el padre del input (en este caso, el div).
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre:{
        valueMissing: "Debe agregar su nombre"
    },
    email:{
        valueMissing: "Debe agregar su correo electrónico",
        typeMismatch: "Ingrese un correo válido"
    },
    password:{
        valueMissing: "Debe ingresar una contraseña",
        patternMismatch: "Mínimo 6 caracteres, máximo 12, debe contener al menos una letra minúscula, una letra mayuscula, un número y no se aceptan caracteres especiales"
    },
    nacimiento:{
        valueMissing: "Debe ingresar su fecha de nacimiento",
        customError: "Debe tener al menos 18 años de edad"
    },
    numero:{
        valueMissing: "Debe agregar su número de télefono",
        patternMismatch: "Formato requerido XXX XXX XXXX, con 10 números"
    },
    direccion:{
        valueMissing: "Debe agregar una dirección",
        patternMismatch: "Debe contener entre 10 y 40 caracteres"
    },
    ciudad:{
        valueMissing: "Debe agregar una ciudad",
        patternMismatch: "Debe contener entre 4 y 40 caracteres"
    },
    estado:{
        valueMissing: "Debe agregar un estado",
        patternMismatch: "Debe contener entre 4 y 40 caracteres"
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            /* console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]); */
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    if(!mayorEdad(fechaCliente)){
        input.setCustomValidity("Debe tener al menos 18 años de edad para poder registrarse");
    }
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());

    return (diferenciaFechas <= fechaActual);
}