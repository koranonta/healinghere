import BaseApi from "./BaseApi"
const api = BaseApi.hhApi

//  Clients
const getClients             = ()     =>  api.get(`/clients.php`)     
const getClientByName        = (name) =>  api.get(`/clients.php?name=${name}`) 
const getClientById          = (clientid) => api.get(`/clients.php/${clientid}`)

//  Sessions
const getSessionByClientId   = (clientid) => api.get(`/sessionsbyclientid.php/${clientid}`)
const getSessionById         = (sessionid) => api.get(`/sessions.php/${sessionid}`)
const addSession             = (body) => api.post(`/sessions.php`, JSON.stringify(body))
const deleteSession          = (sessionid, loginid) => api.delete(`/sessions.php/${sessionid}/${loginid}`)
const updateSession          = (sessionid, body) => api.put(`/sessions.php/${sessionid}`, JSON.stringify(body))

//  Session artifacts
const getSessionArtifacts    = (sessionid) => api.get(`/sessionproperties.php/${sessionid}`)
const processSessionArtifact = (formData) => api.post("/sessionartifacts.php", formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      transformRequest: formData => formData,
    })

const ApiService = {
  getClients,
  getClientByName,
  getClientById,
  getSessionByClientId,
  addSession,
  deleteSession,
  updateSession,
  processSessionArtifact,
  getSessionById,
  getSessionArtifacts,
}

export default ApiService
