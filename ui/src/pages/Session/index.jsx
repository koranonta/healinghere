import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import ApiService from '../../services/ApiService'
import PageLoading from '../../components/PageLoading'
import Constants from '../../util/Constants';
import SessionList from './SessionList'; 

const Session = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState()
  const [sessions, setSessions] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selClient, setSelClient] = useState()

  const location = useLocation();

  useEffect(() => {
    //console.log("Session")
    setSelClient(location.state.client)
    const loadSessions = async () => {
      setIsLoading(true)
      try {
        setLoadingMessage("Loading sessions...")
        //  Load client list
        const clientid = location.state.client.clientid
        //console.log("clientid", clientid)

        const resp = await ApiService.getSessionByClientId(clientid)        
        if (resp.status === Constants.K_HTTP_OK) {
          //console.log(resp)
          setSessions(resp.data.response.data)
        }
      } catch (e) {
        setSessions([])
        console.log(e)
      } finally {
        setIsLoading(false)
      }
      setIsLoading(false)
    }

    loadSessions()
  },[location])

  if (isLoading) return <PageLoading title={ loadingMessage }/>    

  return (
    <div className="container px-1">
      <SessionList 
        data={sessions}
        client={selClient}
        itemPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        />        
    </div>     
  )
}

export default Session