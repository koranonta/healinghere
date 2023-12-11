const K_BASE_URL                   = "https://healinghere.co.uk/app/clientinfo/backend/"
//const K_BASE_URL               = "http://localhost:81/app/healinghere/backend/"
const K_API_URL                = K_BASE_URL + "api"
const K_SESSION_ARTIFACT_URL   = K_BASE_URL + "assets/sessions/"
const K_SESSION_IMAGE_URL      = K_SESSION_ARTIFACT_URL + "images/"
const K_SESSION_VOICE_RECS_URL = K_SESSION_ARTIFACT_URL + "voice_recordings/"

const K_HEADER_CONFIG = {
  "Content-type" : "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, PATCH, POST, DELETE, OPTIONS"    
}

const AppConfig = {
  K_BASE_URL,
  K_API_URL,
  K_SESSION_IMAGE_URL,
  K_SESSION_VOICE_RECS_URL,
  K_HEADER_CONFIG,
}

export default AppConfig
