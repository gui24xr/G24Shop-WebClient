import {create} from 'zustand';
import { apiClient } from '../config/apiclient.js';

const useProductsStore = create((set,get) => ({
  //state
  data: null,
  filteredData:null,
  loading: true,
  currentProduct: null,
  categoriesData: null,
  brandsData: null,
  //actions
  setCurrentProduct:(productId) => set({currentProduct:productId}),
  
  fetchDataProducts: async ({category,brand}) => {
    set({ loading: true })
    try {
      const response = await apiClient.get('/products',{
        params:{
          category: category,
          brand: brand
      }})
    
      console.log(response)
      set({ data: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
    finally{
      set({ loading: false });
    }},
  
  
  findProducts: async (query) => {
    set({ loading: true })
    try {
      const response = await apiClient.get('/products/find',{params:{query:query}})
      set({ data: response.data, loading: false })
    } catch (error) {
      set({ loading: false })
      console.error(error)
    }
    finally{
      set({ loading: false })
    }
  },
    
  fetchCategoriesData:async()=>{
    set({ loading: true })
    try{
      const response = await apiClient.get('/products/categories')
      console.log(response.data)
      set({ categoriesData: response.data, loading: false });
    }catch(error){
      set({ loading: false });
    console.error(error);
    }
    finally{
      set({ loading: false });
    }
  }
  ,
  fetchBrandsData:async()=>{
    set({ loading: true })
    try{
      const response = await apiClient.get('/products/brands')
      console.log(response.data)
      set({ brandsData: response.data, loading: false });
    }catch(error){
      set({ loading: false });
    console.error(error);
    }
    finally{
      set({ loading: false });
    }
  },
}))

export default useProductsStore;