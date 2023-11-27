import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AppStyles from '../../theme/AppStyles';
import { images } from '../../util/Images';
import styles from './style.module.css'; 
import AudioRecorder from '../../components/AudioRecorder';
import Drawing from './Drawing';
import Util from '../../util/Util';

const Consult = ({session, setOpen}) => {
  const [buf, setBuf] = useState({
    sessionDate: session?.sessiondate ? session?.sessiondate : Util.toDMY(new Date())
   ,issue: session?.issue ? session?.issue : ""
   ,response: session?.response ? session?.response : ""
  })

  const canvasRef = useRef(null)

  const classes = AppStyles()
  const handleChange = (e) => {
    const temp = {...buf, [e.target.name]: e.target.value}
    setBuf(temp)
  }

  const handleOk = (e) => {
    //<button
    //onClick={() => {
    //  console.log(canvasRef.current.getDataURL());
    //  alert("DataURL written to console")
    //}}

    console.log(canvasRef.current.getDataURL())
    e.preventDefault()
    setOpen(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setOpen(false)
  }

    return (
      <div className='row'>
        <Drawing backgroundImage={images.chakars01}  ref={canvasRef} />


        <div className='col-sm-12 col-md-6 col-lg-6'>
          <div className='mt-5' style={{ paddingTop: '40px' }}>
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="DD/MM/YYYY" />
            </div>
            <div className="mb-3">
              <label className="form-label">Issue</label>
              <input type="text" id="issue" name="issue" placeholder="" 
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
                style={{height:250, padding: 5}}
                value={_.isEmpty(buf) ? "" : buf.response }
                onChange={handleChange} />
            </div>
            <div className='mb-4'>
              <label className='form-lable'>AudioRecorder</label>
              <AudioRecorder />
            </div>
          </div>
        </div>
        <div className={styles.row}>
        <div className="mb-3 d-flex justify-content-center align-items-center">
           <button onClick={e => handleOk(e)} 
              className={`ml-3 ${classes.pillButton}`} style={{width: '100px'}}>OK</button> 
           <button onClick={e => { handleCancel(e) }}
              className={`${classes.pillButton}`} style={{width: '100px', marginLeft: 10}}>Cancel</button>
              </div>
        </div>
      </div>
    )
}

export default Consult
