import axios from "axios"
import AppConfig from '../config/AppConfig'
const hhApi = axios.create({
  baseURL: AppConfig.K_API_URL,
  headers: AppConfig.K_HEADER_CONFIG,
})

hhApi.interceptors.response.use(
  (response) => response,
  (error) =>  handleError(error))   

const handleError = (error) => {
  if(error.response === undefined) {
    console.log(error)
    return Promise.reject(error);
  }
  else {
    switch (error.response.status) {
      case 400:
      case 404:
        return {
          data: null
         ,hasError: true
         ,error: [error.response.data]
        }        
      case 401:
        // Handle Unauthorized calls here
        // Display an alert
        break
      case 500:
        // Handle 500 here
        // redirect
        break
      // and so on..
      default:
        break
    }
  }
  return Promise.reject(error);
}

const BaseApi = {
  hhApi,
}

export default BaseApi

