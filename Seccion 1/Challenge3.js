//Reto3 Validador de Correos Electronicos

alert("Envia tu primer email")

do {
    let sendEmail = prompt("Ingresa el correo electronico del destinatario:");

    if (/^\S+@\S+\.\S+$/.test(sendEmail) && ///^\S+@\S+\.com\b$/
    sendEmail.indexOf('@') === sendEmail.lastIndexOf('@') &&
    sendEmail.indexOf('@') < sendEmail.lastIndexOf('.') && 
    sendEmail.indexOf('@') > 0 && sendEmail.lastIndexOf('.') < sendEmail.length - 1) {

        alert("Correo electrónico enviado correctamente");
    }
    else{
        alert("Correo electrónico inválido, no se pudo enviar el email");
    }

} while (confirm("Quieres enviar otro correo"));