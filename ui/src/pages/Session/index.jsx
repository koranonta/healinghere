import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom"
import _ from 'lodash'
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
  const params = useParams()
  const paramClientId = _.isEmpty(params) ? null : params.clientid

  useEffect(() => {
    //console.log("Session")
    //setSelClient(location.state.client)
    const loadSessions = async () => {
      setIsLoading(true)
      try {
        setLoadingMessage("Loading sessions...")
        //  Load client list
        let clientid = _.isEmpty(location.state) ? -1 : location.state.client.clientid
        if (clientid === -1 && paramClientId !== null)
          clientid = paramClientId
        //console.log("clientid", clientid)
        setSelClient(clientid)          
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