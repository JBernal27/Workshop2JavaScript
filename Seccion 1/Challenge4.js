// Reto 4 - Administrador de eventos

// Variables Globales
let id = 0;
let events = [];

//Funciones de propsito general

const textInput = (input) => prompt(input).trim()

const numberInput = (msj, num = 0) => {
    while(true){
        num = Number(prompt(msj))
        if(typeof num === "number" && !Number.isNaN(num)){
            return num
        }else{
            alert("Por favor ingrese un valor numerico")
        }
    }
}

const impErr = (input) => alert(`Error!\n${input}`)

const impInf = (input) => alert(input)

//Funciones main

function addEvent(){
    let eventName = textInput("Ingrese el nombre del evento")
    let eventDate = textInput("Ingrese la fecha del evento")
    let eventdescription = textInput("Ingrese la descripcion del evento")

    id++
    const event = {
        id: id, // Identificador único
        eventName,// Nombre del Evento
        eventDate,// Fecha del Evento
        eventdescription // Descripción del Evento
    }

    events.push(event)
}

function showEvents(){
    let msg = "EVENTOS\n\n"

    events.forEach(evento => {
        msg += `${evento.eventName} ~ ${evento.eventDate}\n\n ${evento.eventdescription}\n----------------------//--------------------\n`
    });
    impInf(msg)
}

function searchEvents(){
    let foundEvent = []
    let search = textInput("Ingrese el nombre del  evento a buscar")
    
    events.forEach(evento => evento.eventName.startsWith(search) ?  foundEvent.push(evento) : null)

    if(foundEvent.length === 1){
        impInf(`${foundEvent[0].eventName} ~ ${foundEvent[0].eventDate}\n\n ${foundEvent[0].eventdescription}`)
        return(foundEvent[0])
    }
    else{
        impErr("No existe ningun evento con ese nombre")
        return null
    }
}

const editEvent = ()=>{
    let eventToEdit = searchEvents()    

    if(eventToEdit){

        const editName = () => eventToEdit.eventName = textInput("Ingrese el nuevo nombre del evento")
        const editDate = () => eventToEdit.eventDate = textInput("Ingrese la nueva fecha del evento")
        const editDescription = () => eventToEdit.eventdescription = textInput("Ingrese la nueva descripcion del evento")

        let op

        do {

            op = numberInput("MENU DE EDICION\n\n 1. Editar Nombre\n 2. Editar Fecha\n 3. Editar Descripcion\n 0. Salir del menu de edicion")

            switch (op) {
                case 1:
                    editName()
                    break;

                case 2:
                    editDate()
                    break;

                case 3:
                    editDescription()
                    break;

                case 0:
                    continue
                    break;

                default:
                    impErr("Ingrese un numero valido")
                    break;
            }
        } while (op!=0);

    }
}

const deleteEvent = () => {
    let eventToDelete = searchEvents()

    if(eventToDelete){
        if (confirm(`Estas Seguro que deseas eliminar el evento?\n ${eventToDelete.eventName}`)) {
            events = events.filter(evento => evento != eventToDelete)
            alert("El evento fue ELIMINADO con exito")
        } else {
            alert("El elemento NO fue eliminado")
        }
    }
}

function mainMenu(){
    let op = numberInput("MENU\n 1. Crear Evento\n 2. Ver Mis Eventos\n 3. Buscar Evento\n 4. Editar Evento\n 5. Eliminar Evento\n 6. Salir")

    switch (op) {
        case 1:
            addEvent()
        break;
        case 2:
            showEvents()            
        break;

        case 3:
            searchEvents()
        break;

        case 4:
            editEvent()
        break;

        case 5:
            deleteEvent()
        break;

        case 6:
            return false
        break;
    
        default:
            impErr("Ingrese un valor valido")
        break;
    }
    return true
}

while(mainMenu()){}