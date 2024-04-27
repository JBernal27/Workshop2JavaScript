// Funciones de proposito general
const textInput = (input) => prompt(input).trim()

const verifyNumberInput = (numbers = []) => {
    numbers = (textInput("Ingresa tus notas separadas por comas")).split(",").map(item => parseFloat(item));

    if(numbers.every(num => typeof  num === 'number' && !Number.isNaN(num))) {
        return numbers; 
    }else{
        impErr("Por favor ingresa un valor numerico")
        return verifyNumberInput();
    }
}

const impErr = (input) => alert(`Error!\n${input}`)

const impInf = (input) => alert(input)

//Funciones de proposito general

//Ejecucion del programa//

const grades = verifyNumberInput()
let notas = grades.length;

const finalGrades = (grades.reduce((sumResult,num) => sumResult + num, 0))/notas

impInf("Tus notas son: " + grades + "\nTu calificacion final es: " + finalGrades)

//Ejecucion del programa//