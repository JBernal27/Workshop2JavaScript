const usernames = []
const usersBD = []

do{
    let fullName = prompt("Ingresa tu primer nombre y primer apellido")

    //Pasar a minusculas
    fullName = fullName.toLowerCase()

    //Dividir nombre y apellido
    let divideName = fullName.split(" ");
    console.log(divideName.length)

    if(divideName.length != 2){
        alert('Error, por favor ingrese un nombre y un apellido')
        continue;
    }

    //Primeras 3 letras del nombre y del apellido
    let nameLetters = divideName[0].slice(0,3)
    let lastnameLetters = divideName[1].slice(0,3)

    console.log(nameLetters)
    console.log(lastnameLetters)

    //Generar usuario
    let user = nameLetters + lastnameLetters

    // usernames.forEach(element => {
    //     if(element == user){
    //         user = user + "1"
    //     }
    // });

    while(usernames.includes(user)){
        if(usernames.includes(user)){
            user = user + "1"
        }
    }

    usernames.push(user)

    //Concatena el nombre de usuario con el dominio myDomain.com para formar el correo electrónico
    let email = user + "@myDomain.com";
    console.log("Your email is: " + email);
    console.log(usernames)

    //Creador de passwords

    const password = prompt('Ingrese una contraseña');
    
        if (password.length < 8) {
            alert('Contraseña insegura: la contraseña debe tener al menos 8 caracteres');
            continue
        } else if (!/\d/.test(password)) {
            alert('Contraseña insegura: la contraseña debe contener al menos un número');
            continue
        } else if (!/[a-zA-Z]/.test(password)) {
            alert('Contraseña insegura: la contraseña debe contener al menos una letra');
            continue
        } else if (!/[!@#$%^&*()_+\-=\[\]{}|;':"<>.,?/~`]/.test(password)) {
            alert('Contraseña insegura: la contraseña debe contener al menos un caracter especial');
            continue
        } else {
        alert('Contraseña segura');
        }

    // Almacenar en un objeto global    

    const users = {
        [fullName] : email,
        password
    }

    usersBD.push(users)

    usersBD.forEach(item=>{
        console.log( `Usuario: ${Object.keys(users)[0]}\nEmail:  ${item[fullName]}\nPassword: ${item.password}`)
    })

}while(confirm("¿Quieres agregar otro usuario?"))

