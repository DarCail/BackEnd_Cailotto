import {promises as fs} from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


//configuracion __dirname en modulos

const __filename = fileURLToPath(import.meta.url) //este convierte urls en rutas de archivo

const __dirname = path.dirname(__filename) //convierte la ruta de archivo en una ruta normal


class cartManager{
    constructor(filepath){
        this.path = path.resolve(__dirname,'...',__filename)
    }

    //metodo para obtener todos los carritos del archivo

    async getCarts(){
        try{
            const data = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        }catch{
            return[]
        }
    }



//creamos un carrito
async createCart(){
    const carts = await this.getCarts()
    const newId = carts.length > 0 ? carts.at(-1).id + 1 : 1

    const newCart ={
        id: newId,
        products: []  //vacio si no hay productos
    }
    
    carts.push(newCart)
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2))
    return newCart
}

//buscar carrito por id

async getCartById(id){
    const carts = await this.getCarts()
    return carts.find(c => c.id === id)

}


//agregar producto al carrito
async addProductToCart(cartId, productId){
    const carts = await this.getCarts()
    const cart = carts.find(c => c.id === cartId)
    
    if(!cart) return {error:'carrito no encontrado'}

    //deberiasbuscar si el producto ya existe en el carrito
    const existingProduct = cart.products.find (p => p.product === productId)

    if(existingProduct){
        existingProduct.quantity +=1;
    } else {
        cart.products.push({product:productId, quantity: 1});
    }

    //guardamos lo actualizado
    await fs.writeFile(this.path, JSON.stringify(carts,null,2))
    return cart;
}

}

export default cartManager;