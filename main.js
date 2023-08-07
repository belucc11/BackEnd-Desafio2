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
            const prod = this.path.find(producto => producto ===id)
            if (prod){
                console.log (prod)
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

new Product ({title:"arroz", price: "20", id: "5" })

