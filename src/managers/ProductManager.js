
import {promises as fs} from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//configuracion __dirname en modulos

const __filename = fileURLToPath(import.meta.url) //este convierte urls en rutas de archivo

const __dirname = path.dirname(__filename) //convierte la ruta de archivo en una ruta normal

class ProductManager {
    constructor(filePath){

    //usamos path.resolve para que las rutas sean absolutas
    this.path = path.resolve(__dirname, '..', filePath)
}

async getProducts(){
    try{
        const data = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(data)
    }catch{
        return []
    }
}

async getProductsById(id){
    const products = await this.getProducts() //this.getproducts devuelve todo los porductos almacenados
    return products.find( p => p.id === id) //find como metodo de array busca el primero que cumpla con una condicion
        //la funcion flecha deberia devolver un producto id similar
}

async addProduct(productData){
    const products = await this.getProducts()

    //esta linea de condigo genera un id autoincremental, products.at(-1) => accede al ultimo elemento del array
    const newId = products.length > 0 ? products.at(-1).id + 1 : 1;
    
    const newProduct = {
        id: newId,
        
        title: productData.title,

        description: productData.description,

        code: productData.code,

        price: productData.price,

        status: productData.status ?? true,

        stock: productData.stock,

        category: productData.category,

        thumbnails: productData.thumbnails 
    }
    products.push(newProduct)
    await fs.writeFile(this.path,JSON.stringify(products,null,2))
    return newProduct
}

async updateProduct(id,updates){
    const products = await this.getProducts()
    const index = products.findIndex(p => id === id)
    if(indes === -1) return {error: 'no se encontro producto'}

    delete updates.id; //elimine el campo id, del objeto updatepor seguridad
    products[index] = {...products [index], ...updates}
    await fs.writeFile(this.path, JSON.stringify(products, null, 2))
    return products[index]



}

async deleteProduct(id){
    const products= await this.getProducts()
    const update = products.filter( p => p.id != id);
    await fs.writeFile(this.path, JSON.stringify(update,null, 2))
    return {message: `producto  ${id} eliminado`}
}


}

export default ProductManager;