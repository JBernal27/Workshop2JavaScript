//const productNamesList = []
let productNamesList = [
    'Manzana',
    'Arroz',
    'Pollo',
    'Pan',
    'Queso'
];

//productsList = []
let productsList = [
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
      description: 'Pollo fresco y tierno. badword'
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

const blacklistedProducts = [];
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
    productNamesList.forEach(productName => {
        let semiMatch = ""
        for (let i = 0; i < productName.length; i++) {
            semiMatch = semiMatch + productName[i];
            if (semiMatch === mainproductName) {
                counter++
            }
        }
    })

    if (counter) {    
        mainproductName += " copy"
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
    let product = searchProducts()

    contId++
    if (product) {
        const newProduct = {...product,
        productName : isDuplicated(product.productName),
        id : contId
        }
        productsList.push(newProduct)
        productNamesList.push(newProduct.productName)
        impInf("Producto duplicado correctamente")
    }
}

const showProducts = (showProductsList = productsList) =>{
    let msg = "ARTICULOS\n"

    showProductsList = badWordsFilter(showProductsList)

    showProductsList.forEach(article => {
        msg += ` #${article.id} ~ ${article.productName} ~ ${article.price}$\n\n Cantidad: ${article.quantity}\n Descripcion: ${article.description}\n----------------------//--------------------\n`
    });
    console.log(msg)
    impInf(msg)
}

const searchProducts = () =>{
    let search = textInput("Ingrese el nombre del articulo a buscar")
    
    let foundProduct = productsList.find(article => article.productName == search)

    if(foundProduct){
        impInf(` #${foundProduct.id} ~ ${foundProduct.productName} ~ ${foundProduct.price}$\n\n Cantidad: ${foundProduct.quantity}\n Descripcion: ${foundProduct.description}`)
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

    productsList.forEach((article)=>{
        if(article.price >= searchMin && article.price <= searchMax){
            foundProduct.push(article)
        }
    })

    if(foundProduct.length > 0){
        showProducts(foundProduct)
    }
    else{
        impErr("No existe ningun articulo en ese rango")
    }
}

const editProduct = ()=>{
    let productToEdit = searchProducts()    

    if(productToEdit){

        const editName = () => {
            let newProductName = isDuplicated(textInput("Ingrese el nuevo nombre de l articulo"))
            productNamesList = productNamesList.map(productName => productName == productToEdit.productName ? newProductName : productName)
            productToEdit.productName  = newProductName
        }
        const editPrice = () => productToEdit.price = numberInput("Ingrese el nuevo precio del articulo")
        const editQuantity = () => productToEdit.quantity = numberInput("Ingrese la nueva cantidad del articulo")
        const editDescription = () => productToEdit.description = textInput("Ingrese la nueva descripcion del articulo")

        let op

        do {

            op = numberInput("MENU DE EDICION\n\n 1. Editar Nombre\n 2. Editar Precio\n 3. Editar Descripcion\n 4. Editar Cantidad\n 0. Salir del menu de edicion")

            switch (op) {
                case 1:
                    editName()
                    break;

                case 2:
                    editPrice()
                    break;

                case 3:
                    editDescription()
                    break;

                case 4:
                    editQuantity()
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

const deleteProduct = () => {
    let productToDelete = searchProducts()

    if(productToDelete){
        if (confirm(`Estas Seguro que deseas eliminar el producto?\n ${productToDelete.productName}`)) {
            productNamesList = productNamesList.filter(productName => productName != productToDelete.productName)
            productsList = productsList.filter(product => product != productToDelete)
            alert("El producto fue ELIMINADO con exito")
        } else {
            alert("El producto NO fue eliminado")
        }
    }
}

const verifyExistence = () => {
    let productToVerify = searchProducts()

    if(productToVerify){
        let quantityToSell = numberInput("Ingrese la cantidad que desea vender")

        if(productToVerify.quantity >= quantityToSell){
            confirm(`Extisten ${productToVerify.quantity} unidades de este producto en inventario ¿Desea realizar la venta?` ? sell(productToVerify) : null)
        }
        else if( 0 < productToVerify.quantity < quantityToSell){
            confirm(`Extisten apenas ${productToVerify.quantity} unidades de este producto en inventario ¿Desea comprar nuevas unidades?`) ? buy(productToVerify) : null
        }else{
            confirm(`_No extisten unidades de este producto en inventario ¿Desea comprar nuevas unidades?`) ? buy(productToVerify) : null
        }

    }
}

const sell = (product = searchProducts()) =>{
    if(product){
        let quantityToSell = numberInput(`Ingrese la catidad de '${product.productName}' a Vender`)
        if(product.quantity >= quantityToSell){
            product.quantity -= quantityToSell
            impInf("Venta realizada  exitosamente");
        }
        else{
            impErr("No existe la cantidad solicitada para este producto")
        }
    }
}

const buy = (product = searchProducts()) => {
    if(product){
        product.quantity += numberInput(`¿Cuantos '${product.productName}' desea comprar?`)
    }
}

const inventaryValue = () => {
    let value = 0
    productsList.forEach((element) => value += element.price * element.quantity);
    impInf(`El inventario actual tiene un valor total por ${value}$`)
    return value
}

const orderInventary = () => {
    const newProductList = productsList

    let op = numberInput("Como desea ordenar la lista:\n\t 1. Por precio ascendente\n\t 2. Por precio descendente\n\t 3. Por cantidad ascendente\n\t 4. Por precio descendente")

    switch (op) {
        case 1:
            newProductList.sort((a,b) => a.price - b.price)
        break;

        case 2:
            newProductList.sort((a,b) => b.price - a.price)
        break;

        case 3:
            newProductList.sort((a,b) => a.quantity - b.quantity)
        break;
        
        case 4:
            newProductList.sort((a,b) => b.quantity - a.quantity)
        break;

        default:
            impErr("Ingrese un valor valido")
            return orderInventary()
        break;
    }

    showProducts(newProductList)

}

const badWordsFilter = (productsListToFilter = productsList) => {
    const badWords = [ 'badword' , 'badword1', 'badword2', 'badword3']
    const newListedProducts = []
    let description
    productsListToFilter.forEach(product => {
        badWords.forEach(word => {
            if (product.description.toLowerCase().includes(word)) {
                description = (product.description.split(' ')).map(element => badWords.includes(element) ? '*'*element.length : element)       
            }
            else{
                description = product.description
            }
        });
        const newProduct = {
            ...product,
            description : description
        }         
        blacklistedProducts.push(newProduct)
        newListedProducts.push(newProduct)
    });

    return newListedProducts
}

const generalReport = () => {
    const totalProducts = productsList.length;
    const totalInventoryValue = inventaryValue();
    const mostExpensiveProduct = productsList.reduce((max, product) => (product.price > max.price ? product : max), productsList[0]);
    const mostCheapestProduct = productsList.reduce((min, product) => (product.price < min.price ? product : min), productsList[0]);
    const productWithMostQuantity = productsList.reduce((max, product) => (product.quantity > max.quantity ? product : max), productsList[0]);
    const productWithLeastQuantity = productsList.reduce((min, product) => (product.quantity < min.quantity ? product : min), productsList[0]);
    const productsWithBadWordsCount = blacklistedProducts.length;
    impInf(`REPORTE GENERAL\n\nCantidad total de productos: ${totalProducts}\nValor total del inventario: ${totalInventoryValue}$\nProducto más caro: ${mostExpensiveProduct.productName} (${mostExpensiveProduct.price}$)\nProducto más barato: ${mostCheapestProduct.productName} (${mostCheapestProduct.price}$)\nProducto con mayor cantidad disponible: ${productWithMostQuantity.productName} (${productWithMostQuantity.quantity} unidades)\nProducto con menor cantidad disponible: ${productWithLeastQuantity.productName} (${productWithLeastQuantity.quantity} unidades)\nCantidad de productos con posibles malas palabras en la descripción: ${productsWithBadWordsCount}`);    
}

const menu = () =>{
    let op = numberInput("Ingrese una Opcion: \n\t 1. Agregar un nuevo producto\n\t 2. Dupicar producto\n\t 3. Ver Inventario\n\t 4. Buscar por nombre\n\t 5. Filtrar por precio\n\t 6. Editar articulo\n\t 7. Eliminar Producto\n\t 8. Verificar existencia\n\t 9. Vender producto\n\t 10. Comprar Producto\n\t 11. Calcular Valor del inventaro\n\t 12. Ordenar Productos\n\t 13. Reporte General\n\t 0. Salir  ")

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
        case 6:
            editProduct()
        break;
        case 7:
            deleteProduct()
        break;
        case 8:
            verifyExistence()
        break;
        case 9: 
            sell()
        break;
        case 10:
            buy()
        break;
        case 11:
            inventaryValue()
        break;
        case 12:
            orderInventary()
        break;
        case 13:
            generalReport()
        break;
        case 0:
            return false
        break;
        default:
            impErr(`Ingrese un valor valido para el menu`)
        break;

    }
    return true
}

while(menu()){
    console.log(productNamesList)
}
//Ejecucion del programa//