import { create } from "zustand";
import useCartsStore from "./useStoreCarts";
import { apiClient } from "../config/apiclient";

const useProfileStore = create ((set,get)=>({
    //state
    currentUser: null,
    loading: true,
    error: null,
    authToken: null,
    //actions
    openSesionInClient: async (user) => {
      try{
          //provisorio mando datos x body
          /*IMPORTANTE: en la request va el token de auth0 de ahi leera que user inicio sesion en auth0*/
          const result = await apiClient.post('/users',{user:user}) //Inicio sesion en el server para que valide el user y me devuelva los datos....
          const loggedUser = result.data
          console.log('Nuevo logged User: ', result.data)
          console.log('Logged: ',loggedUser)
          set({currentUser:{
            userId:loggedUser.id,
            email: loggedUser.email,
            userName: loggedUser.userName,
            firstName: loggedUser.profile.firstName,
            lastName:loggedUser.profile.lastName,
            profilePicture: loggedUser.profile.profilePicture
          }})
          useCartsStore.getState().setCart(loggedUser.cartId)    
      }catch(err){
        console.error(err)
        throw err
      }
    },

    closeSesionInClient: ()=>{
      useCartsStore.getState().setCart(null) 
      return ({authToken:null, currentUser:null, loading:false})
    },

    setProfile: async (user,tokenPromise) => {   
      set({loading:true})    
      if(!user) return get().closeSesionInClient()
      try{    
        const authToken = await tokenPromise()
        console.log('EL token extraido de promesa es: ', authToken)
        set({authToken:authToken}) //Seteo el token en el store para que sea tomado x el apiClient
        get().openSesionInClient(user)
        return set({loading:false})
      } catch(error){
        //Si hubo algun error sea un token invalido o fallo la validacion entonces tmb hay que poner todo a estado de sesion cerrado 
        console.error(error)
        useCartsStore.getState().setCart(null) 
        return set({error:error})
      }
  }
}))




export default useProfileStore;
