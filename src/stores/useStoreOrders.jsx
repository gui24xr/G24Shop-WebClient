import { create } from "zustand";
import useCartsStore from "./useStoreCarts";
import useProfileStore from "./useStoreProfile";
import { apiClient } from "../config/apiclient";

export const useOrdersStore = create ((set,get)=>({
    currentOrder:null,
    paymentsMethodsList:null,
    paymentMethod:null,
    shippingPointsList: null,
    loading: true,
    error: null,


    setCurrentOrder: async(orderId) => {
        //Pide la order Id y la Setea la info de la orden con la cual trabajaremos.
        try{
        
            const searchedOrder = await apiClient.get(`/orders/${orderId}`,)

            return set({currentOrder: searchedOrder.data})
        }catch(error){
            console.log(error)
            return set({error:error})
        }

    },

    createOrder:async ()=>{
        //Crea la order, vacia el carro y la setea
        const currentUser = useProfileStore.getState().currentUser
        const currentCart = useCartsStore.getState().currentCart // Usando get() para acceder a currentCart

        if (!currentUser){
            //Si no hay user logurado actuamos con localstorage
            return
        }
        //Pido el cambio en la BD
        try{
            const createdOrder = await apiClient.post('/orders',{userEmail:currentUser.email})
            //Actualizo el carro en el front xq si salio todo bien se vacio x la compra
            useCartsStore.getState().setCart(currentCart.cartId)
                //Debo setear la currentOrder para que el componente redirija para coordinar pago y envio
            const setOrderAction = get().setCurrentOrder
            setOrderAction(createdOrder.data.orderId)
        }catch(error){
            console.log(error)
            throw error
        }
        
    },

    setPaymentsMethodsList:async()=>{
        //Setea los metodos de pago disponibles
        try{
            console.log('Seteano payme')
            const methods = paymentMethods
            return set({paymentsMethodsList:methods})
        }catch(error){
            console.log(error)
            set({error:error})
        }
    },

    setPaymenthMethod:({paymentMethod})=>{
        //Setea el metodo de pago de la currentOrder
        return set({paymentMethod:paymentMethod})
    }

}))



const paymentMethods = [
    {
      id: "1",
      name: "Efectivo",
      description: "Pagos con dinero en efectivo en domicilio."
    },
    {
      id: "2",
      name: "Transferencia bancaria",
      description: "Pagos con transferencias desde cualquier banco."
    },
    {
      id: "3",
      name: "Mercado pago",
      description: "Paga con mercado pago en cuotas sin intereses."
    }
  ];