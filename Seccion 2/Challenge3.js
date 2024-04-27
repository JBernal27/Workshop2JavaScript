// Funciones de proposito general
const textInput = (input) => prompt(input).trim()

const numberInput = (msj, num = 0) => {
    while(true){
        num = Number(prompt(msj))
        if(typeof num === "number" && !Number.isNaN(num)){
            return num
        }else{
            impErr("Por favor ingrese un valor numerico")
        }
    }
}

const impErr = (input) => alert(`Error!\n${input}`)

const impInf = (input) => alert(input)

//Funciones de proposito general

//Ejecucion del programa//



//Ejecucion del programa//