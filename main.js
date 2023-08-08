import {promises as fs} from "fs"


class ProductManager{
    constructor (){
        this.path = "./productos.txt"
    }


// Método Add Product

        async addProduct (product){
            const dataFromFile = await fs.readFile (this.path, "utf-8")
            const products = JSON.parse(dataFromFile)

            if (products.find(producto => producto.id === product.id)){
                return console.log ("Producto ya agregado")
            } else {
                products.push(product)  
            }
        
            await fs.writeFile(this.path, JSON.stringify(products))

        }

// Método Get Product

        async getProducts () {
            const products= JSON.parse(await fs.readFile (this.path, "utf-8"))
            console.log (products)
        }


//Método Get product by ID

       async getProductsByID(id){
            const products= JSON.parse(await fs.readFile (this.path, "utf-8"))
            const productoBuscado = products.find(producto => producto.id ===id)
            if (productoBuscado){
                console.log (productoBuscado)
            } else {
                console.log ("Not found")
            }
        }


// Método Update Product
    async updateProduct (id, { title }) {
        const products= JSON.parse(await fs.readFile (this.path, "utf-8"))    
        const indice = products.findIndex(prod => prod.id ===id)

        if (indice != -1){
            products [indice].title = title
            await fs.writeFile (this.path, JSON.stringify(products))
        } else {
            console.log ("Producto no encontrado")
        }
        }

// Método Delete Product

    async deleteProduct(id) {
        const products= JSON.parse(await fs.readFile (this.path, "utf-8"))
        const prods = products.filter(prod => prod.id !=id)
        await fs.writeFile("./productos.txt", JSON.stringify(prods))
        }

        
        
 }
    
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.incrementarID()
    }

    static incrementarID(){
        if(this.idIncrement){
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

}


// Inicio de Product Manager y agregar producto

const productManager = new ProductManager
const product1 = new Product("Laptop", "Laptop Asus", 2000, "Sin imagen", "LAP123", 25)
const product2 = new Product("Mouse", "Mouse Logitec", 220, "Sin imagen", "MOU124", 20)
productManager.getProducts();
productManager.addProduct(product1)
productManager.addProduct(product2)
console.log(productManager.getProductsById(2))
