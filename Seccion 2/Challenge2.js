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

const maxGrade = (grades.reduce((maxnumber,num) => maxnumber < num ? num : maxnumber , 0))

const minGrade = (grades.reduce((minnumber,num) => minnumber > num ? num : minnumber , grades[0]))

let numAprove = 0 
grades.forEach(item => item >= 3.5 ? numAprove++ : numAprove+=0)

let numDisaprove = 0 
grades.forEach(item => item < 3.5 ? numDisaprove++ : numDisaprove+=0)

let sortGrades = [...grades]
sortGrades.sort((a,b) => b - a)
impInf("Las notas son: " + grades + "\nEl promedio final es: " + finalGrades + "\nNumero mayor: " + maxGrade + "\nNumero menor: " + minGrade + "\nNotas ordenadas: " + sortGrades) 

//Ejecucion del programa//