import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService'
import PageLoading from '../../components/PageLoading'
import ClientList from './ClientList'
import Constants from '../../util/Constants';
import Util from '../../util/Util';

const Clients = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState()
  const [clients, setClients] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)  

  useEffect(() => {
    console.log("Clients")
    const loadClients = async () => {
      setIsLoading(true)
      try {
        setLoadingMessage("Loading clients...")
        //  Load client list
        const resp = await ApiService.getClients()        
        if (resp.status === Constants.K_HTTP_OK) {
          console.log(resp)
          setClients(resp.data.response.data)
        }
      } catch (e) {
        setClients([])
        console.log(e)
      } finally {
        setIsLoading(false)
      }
      setIsLoading(false)
    }

    loadClients()
  },[])

  if (isLoading) return <PageLoading title={ loadingMessage }/>    

  return (
    <>
    <div className="container px-1">
        <ClientList
          data={clients}
          itemsPerPage={itemsPerPage} 
          setItemsPerPage={setItemsPerPage}
        />
    </div>  
    </>
  );
}

export default Clients
