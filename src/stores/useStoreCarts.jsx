import { create } from "zustand";
import { apiClient } from "../config/apiclient";

const defaultCart = {
    id: "b28d",
    products: [
        {
            title: "Producto LocalStorage",  // Cambié el título
            brand: "Apple",
            price: 549,
            quantity: "1",
            subTotalAmount: 549
        }
    ],
    amount: 549, 
    productsQuantity: 1  
};

const useCartsStore = create ((set,get)=>({
    cartSourceFromLocalStorage: true,
    
    currentCart: null, //Por ahora empieza null, mas tarde usamos la logica del localStorage si no hay user logueado.
    cartData: null,
    loading: true,
    error: null,

    setCart: async (cartId) => {
      if (!cartId){
        set({currentCart: null})
        get().fetchCartDataFromLocalStorage()
      } 
      else{
        set({currentCart: cartId})
        get().fetchCartDataFromDB()    
      }   
    },

    fetchCartDataFromLocalStorage: ()=>{
        console.log('Usando carro de local storage...')
        return set({cartData: defaultCart
        })
    }
    ,
    fetchCartDataFromDB: async () => {
        try{
            const result = await apiClient.get('/carts',{params:{cartId:get().currentCart}})
            const searchedCart = result.data
            return set({cartData:{
                cartId: searchedCart.id,
                products: searchedCart.products,
                amount: searchedCart.amount,
                productsQuantity: searchedCart.productsQuantity
              }})
        }catch(error){
            //Importante aca que si se ubtuvo una respuesta de error se setea el error
            //Lado cliente nda de if not cart
            return set({error:error})
        }
    },

    clearCart: async() =>{
       if (!get().currentCart){
            get().clearCartFromLocalStarage()
        }
        else{
            get().clearCartFromDB()
        }
    },

    clearCartFromLocalStarage: ()=>{
        console.log('vaciaremos el carro de localstorage y actualizaremos cartData')  
    },

    clearCartFromDB : async () => {
        try{
            await apiClient.delete('/carts/products',{params:{cartId:get().currentCart}})
            await get().fetchCartDataFromDB()
        }catch(error){
            console.log(error)
            return set({error:error})
        }
    },

    //Accion para agregar prdpducto al carro:
    addProductToCart: async ({productId,quantity}) =>{
        if (!get().currentCart){
            get().addProductToCartInLocalStorage({productId,quantity})
        }
        else{
            get().addProductToCartInDb({productId,quantity})
        }     
    },

    addProductToCartInLocalStorage: ({productId,quantity}) => {
        console.log('Agregaremos el producto al carro de local storage')  
    },

    addProductToCartInDb: async({productId,quantity}) => {
        try{
            await apiClient.post(`/carts/products/${productId}`,{
                cartId:get().currentCart,
                quantity: quantity
            })
            //Ya que huvo cambio en La BD
            await get().fetchCartDataFromDB()
        }catch(error){
            console.log(error)
            return set({error:error})
        }
    },

    deleteProductToCart: async ({productId}) =>{
        if (!get().currentCart){
            get().deleteProductToCartInLocalStorage({productId})
        }
        else{
            get().deleteProductToCartInDb({productId})
        }         
    },

    deleteProductToCartInLocalStorage: ({productId}) =>{
        console.log('Eliminaremos el producto al carro de local storage')  
    },

    deleteProductToCartInDb: async ({productId}) => {
        
        try{
            await apiClient.delete(`/carts/products/${productId}`,{data:{
                cartId:get().currentCart
            }})
            //Ya que huvo cambio en La BD
            await get().fetchCartDataFromDB()
        }catch(error){
            console.log(error)
            return set({error:error})
        }
    },

    updateProductQuantityInCart: async ({productId,newQuantity}) =>{
        if (!get().currentCart){
            get().updateProductToCartInLocalStorage({productId,newQuantity})
        }
        else{
            get().updateProductToCartInDb({productId,newQuantity})
        }         
    },

    
    updateProductToCartInLocalStorage: ({productId,newQuantity}) =>{
        console.log('Actualizaremos el producto al carro de local storage')  
    },

    updateProductToCartInDb: async ({productId,newQuantity}) => {
        try{
            await apiClient.put(`/carts/products/${productId}`,{
                cartId:get().currentCart,
                newQuantity: newQuantity
            })
            //Ya que huvo cambio en La BD
            await get().fetchCartDataFromDB()
        }catch(error){
            console.log(error)
            return set({error:error})
        }
    },


   

}))



export default useCartsStore;