import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AppStyles from '../../theme/AppStyles';
import { images } from '../../util/Images';
import Constants from '../../util/Constants';
import Drawing from './Drawing'
import Util from '../../util/Util'
import ApiService from '../../services/ApiService';
import RecordVoice from './RecordVoice';

const Consultation = ({session, setOpen, actionHandler}) => {
  const [buf, setBuf] = useState({
    sessiondate: session?.sessiondate ? new Date(session?.sessiondate) : new Date()
   ,issue: session?.issue ? session?.issue : ""
   ,response: session?.response ? session?.response : ""
   ,mode: session.mode
  })
  const [voice, setVoice] = useState(null)
  const [imageData, setImageData] = useState({lines:[]})
  const [newRecording, setNewRecording] = useState(null)

  //useEffect(() => {
  //  console.log("image", imageData)
  //  console.log("voice", voice)
  //}, [voice, imageData])

  const getSessionArtifacts = async (sessionid) => {
    setVoice(null)
    const resp = await ApiService.getSessionArtifacts(sessionid)
    if (resp.status = Constants.K_HTTP_OK) {
      console.log(resp)
      const artifactList = resp.data.response.data
      artifactList.forEach(elem => {
        if (+elem.propertytypeid === Constants.K_IMAGE) {
          //const imgData = JSON.parse(elem.propertyvalue)
          //console.log(imgData)
          setImageData(JSON.parse(elem.propertyvalue))
        }
        else if (+elem.propertytypeid === Constants.K_VOICE)
          setVoice(elem.propertyvalue)
        //console.log(elem.propertyvalue)
      })
    }
    return resp
  }

  useEffect(() => {
    //console.log(session)
    if (session.sessionid !== -1) {
      const resp = getSessionArtifacts(session.sessionid)
    }
  }, [session])

  const canvasRef = useRef(null)

  const classes = AppStyles()

  const handleChange = (e) => {
    const temp = {...buf, [e.target.name]: e.target.value}
    setBuf(temp)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setOpen(false)
  }

  const handleOk = (e) => {
    e.preventDefault()

    const drawingData = canvasRef.current.getSaveData()
    //console.log(drawingData)
    //console.log('Size of sample is: ' + drawingData.length);
    //const compressed = Util.compressLZW(drawingData)
    //console.log('Size of compressed sample is: ' + compressed.length);
    //console.log(compressed);
    //const str = Util.decompressLZW(compressed)
    //console.log(str)

    let temp = {
      ...session, ...buf, image: drawingData }
    if (newRecording !== undefined) 
      temp = {...temp, 'voice': newRecording}
    //console.log(temp)
    setOpen(false)
    actionHandler(temp)
  }

  const handleDate = ( date ) => {
    //console.log( date )
    const temp = {...buf, 'sessiondate': new Date( date )}
    //console.log(temp)
    setBuf( temp )
  }

  const endRecording = (e) => {
    if (e !== null) {
      //console.log(e)
      const reader = new FileReader(); 
      reader.readAsDataURL(e); 
      reader.onloadend = () => setNewRecording(reader.result)
      setVoice(null)
    }
  }

  const startRecording = (e) => {
    setVoice(null)
  }

  return (
    <div className="container px-1">
      <div className='row'>
        <Drawing 
          backgroundImage={images.chakars}  
          ref={canvasRef} 
          savedData={imageData}
          />
        <div className='col-sm-12 col-md-6 col-lg-6'>
          <div className='mt-5' style={{ paddingTop: '40px' }}>
            <div className="mb-3">
              <label className="form-label">Date</label>
              {" "}
              <DatePicker 
                id="sessiondate" 
                name="sessiondate"
                className="form-control"
                dateFormat="dd/MM/yyyy"
                selected={_.isEmpty(buf) ? "" : buf.sessiondate} 
                onChange={(date) => handleDate(date) } />
            </div>
            <div className="mb-3">
              <label className="form-label">Issue</label>
              <input type="text" 
                 id="issue" 
                 name="issue" 
                 placeholder="" 
                 style={{marginTop: -5}}
                 className="form-control"
                 value={_.isEmpty(buf) ? "" : buf.issue }
                 onChange={handleChange} 
                 required />
            </div>
            <div className="mb-3">
              <label className="form-label">Response</label>
              <textarea                 
                className="form-control" 
                id="response" 
                name="response" 
                placeholder="" 
                style={{height:250, padding: 5, marginTop: -5}}
                value={_.isEmpty(buf) ? "" : buf.response }
                onChange={handleChange} />
            </div>

            { voice !== null && 
            <div className='mb-1'>      
             <audio controls>
               <source src={voice} type="audio/webm" />
              </audio>
            </div>     
            } 
            <div className='mb-4'>
              <RecordVoice 
                startRecording={startRecording}
                endRecording={endRecording} />
            </div>
          </div>
        </div>
        <div className="mt-2 mb-3 d-flex justify-content-center align-items-center">
           <button onClick={e => handleOk(e)} 
              className={`ml-3 ${classes.pillButton}`} style={{width: '100px'}}>OK</button> 
           <button onClick={e => { handleCancel(e) }}
              className={`${classes.pillButton}`} style={{width: '100px', marginLeft: 10}}>Cancel</button>
              </div>
        </div>
    </div>     
  )
}

export default Consultation


