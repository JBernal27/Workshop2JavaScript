//const productNamesList = []
const productNamesList = [
    'Manzana',
    'Arroz',
    'Pollo',
    'Pan',
    'Queso'
];

//productsList = []
const productsList = [
    {
      id: 1,
      productName: 'Manzana',
      price: 1.99,
      quantity: 10,
      description: 'Manzanas frescas y jugosas.'
    },
    {
      id: 2,
      productName: 'Arroz',
      price: 2.49,
      quantity: 8,
      description: 'Arroz blanco de grano largo.'
    },
    {
      id: 3,
      productName: 'Pollo',
      price: 5.99,
      quantity: 6,
      description: 'Pollo fresco y tierno.'
    },
    {
      id: 4,
      productName: 'Pan',
      price: 3.49,
      quantity: 15,
      description: 'Pan recién horneado.'
    },
    {
      id: 5,
      productName: 'Queso',
      price: 4.99,
      quantity: 7,
      description: 'Queso cheddar en lonchas.'
    }
  ];
contId = 5

// Funciones de proposito general
const textInput = (input) => {
    const userInput = prompt(input).trim()
    return userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase()
}

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

//Otras Funciones

const isDuplicated = (mainproductName) =>{
    let counter = 0
    productNamesList.forEach(pproductName => {
        let semiMatch = ""
        for (let i = 0; i < pproductName.length; i++) {
            semiMatch = semiMatch + pproductName[i];
            if (semiMatch === mainproductName) {
                counter++
            }
        }
    })

    if (counter) {    
        mainproductName += " Copy"
        if(counter > 1){
            mainproductName += " " + counter
        }
    }

    return mainproductName
}

//Otras Funciones

//Ejecucion del programa//

impInf('Gestion de inventarios')

const addProduct = () => {

    contId++
    let productName = textInput("Ingrese el nombre del producto: ")
    let price  = numberInput("Ingrese el precio del producto: ")
    let quantity = numberInput("Ingrese la catidad disponible de este producto: ")
    let description = textInput("Ingrese la descripcion del producto")

    productName = isDuplicated(productName)
    productNamesList.push(productName)

    const product = {
        id : contId,
        productName,
        price,
        quantity,
        description
    }

    productsList.push(product)
}

const duplicateProduct = () => {
    let op = textInput("Ingrese el nombre del producto a duplicar: ")

    const product = productsList.find(product => product.productName === op)

    if (product) {
        const newProduct = {...product,
        productName : isDuplicated(product.productName) }  
        newProduct.id = contId++
        productsList.push(newProduct)
        productNamesList.push(newProduct.productName)
    } else {
        impErr("El nombre ingresado no existe")
    }
}

const showProducts = () =>{
    let msg = "ARTICULOS\n"

    productsList.forEach(article => {
        msg += ` #${article.id} ~ ${article.productName} ~ ${article.price}$\n\n Cantidad: ${article.quantity}\n Descripcion: ${article.description}\n----------------------//--------------------\n`
    });
    console.log(msg)
    impInf(msg)
}

const searchProducts = () =>{
    let search = textInput("Ingrese el nombre del articulo a buscar")
    
    let foundProduct = productsList.find(article => article.productName === search)

    if(foundProduct){
        impInf(` #${foundProduct.id} ~ ${foundProduct.productName} ~ ${foundProduct.price}$\n\n Cantidad: ${foundProduct.quantity}\n Descripcion:${foundProduct.description}`)
        return(foundProduct)
    }
    else{
        impErr("No existe ningun articulo con ese nombre")
        return null
    }
}

const searchProductsPrice = () => {
    let foundProduct = []
    let searchMin = numberInput("Ingrese el precio minimo del articulo a buscar")
    let searchMax = numberInput("Ingrese el precio maximo del articulo a buscar")
    
    foundProduct = productsList.filter(article =>  searchMin <= article.price && article.price <=searchMax)

    if(foundProduct.length > 0){
        impInf(` #${foundProduct.id} ~ ${foundProduct.productName} ~ ${foundProduct.price}$\n\n Cantidad: ${foundProduct.quantity}\n Descripcion:${foundProduct.description}`)
        return(foundProduct)
    }
    else{
        impErr("No existe ningun articulo con ese nombre")
        return null
    }
}

const menu = () =>{
    let op = numberInput("Ingrese una Opcion: \n\t 1. Agregar un nuevo producto\n\t 2. Dupicar producto\n\t 3. Ver Inventario\n\t 4. Buscar por nombre\n\t 5. Filtrar por precio\n\t 0. Salir  ")

    switch(op)
    {
        case 1:
            addProduct()
        break;
        case 2:
            duplicateProduct()
        break;
        case 3: 
            showProducts()
        break
        case 4:
            searchProducts()
        break;
        case 5:
            searchProductsPrice()
        break;
        case 0:
            return false
        break
    }
    return true
}

while(menu()){
    console.log(productNamesList)
    console.log(productsList)
}

//Ejecucion del programa//