import axios from 'axios'
import useProfileStore from '../stores/useStoreProfile'


export const apiClient = axios.create({
    baseURL:  "http://localhost:8080/api",
    timeout: 5000,
    header: {
        'Content-Type' : 'application/json',
        
    }
})
 


apiClient.interceptors.request.use(
    (config)=>{
        const token = useProfileStore.getState().authToken
        console.log('Token de auth0 en interceptor: ',token)
        if (token){
           
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }

)
    