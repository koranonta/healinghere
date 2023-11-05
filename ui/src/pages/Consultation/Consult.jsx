import React, { useState, useRef } from 'react';
import CanvasDraw from "react-canvas-draw";
import _ from 'lodash';
import AppStyles from '../../theme/AppStyles';
import { images } from '../../util/Images';
import styles from './style.module.css'; 
import OutlinedDiv from '../../components/controls/OutlinedDiv'
import VoiceRecorder from '../../components/VoiceRecorder';

const canvasProperties = {
  loadTimeOffset: 5,
  lazyRadius: 0,
  //catenaryColor: "#0a0302",
  gridColor: "rgba(150,150,150,0.17)",
  hideGrid: true,
  canvasWidth: 330,
  canvasHeight: 610,
  disabled: false,
  saveData: "",
  immediateLoading: false,
  hideInterface: false,
  imgSrc: images.chakars01,
};      

const Consult = ({session, setOpen}) => {
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#0a0302");  
  const [showColor, setShowColor] = useState(false)
  const [buf, setBuf] = useState({
    sessionDate: session?.sessiondate ? session?.sessiondate : ""
   ,issue: session?.issue ? session?.issue : ""
   ,response: session?.response ? session?.response : ""
  })

  const canvasRef = useRef()

  const props = {
    ...canvasProperties,
    ref: canvasRef,
    brushColor,
    catenaryColor: brushColor,
    brushRadius: brushSize,
  };

  const classes = AppStyles()


  const drawImageMenu = () => (
    <div style={{display: 'flex', direction: 'row', justifyContent: 'space-between', width: 300, marginBottom: 10 }}>  
    <label style={{width: 20}} onClick={() => canvasRef.current.eraseAll()}>✖️</label>
    <label style={{width: 20}} onClick={() => canvasRef.current.undo()}>↪️</label>
    <label style={{width: 20}}>🎨
      <input
        style={{  width: 0, height: 0 }}
        type="color"
        value={brushColor}
        onChange={(event) => {
          console.log(event.target.value);
          setBrushColor(event.target.value);
        }}>
      </input>
    </label>

    <button style={{width: 20, height: 30}}
            className="palette"
            onClick={() => {
              setShowColor((s) => !s);
            }}
          >
            🖌️
          </button>
          {showColor && (
            <input
    min="2"
    max="50"
    type="range"
    style={{width: 50}}
    onChange={(event) => {
      console.log(event.target.value);
      setBrushSize(event.target.value);
    }}
    />
   )}
{/*
    <button onClick={() => {
       console.log(canvasRef.current.getDataURL());
       alert("DataURL written to console") }} >GetDataURL</button>
*/}       
    </div>
  )

  const drawImage = () => {
    return (
      <div>
        { drawImageMenu() }
        <CanvasDraw { ...props }  ref={canvasRef}  />
      </div>        
      )
    }

    const handleChange = (e) => {
      const temp = {...buf, [e.target.name]: e.target.value}
      setBuf(temp)
    }

    const handleOk = (e) => {
      e.preventDefault()
      setOpen(false)
    }

    const handleCancel = (e) => {
      e.preventDefault()
      setOpen(false)
    }

    return(      
      <>
{/*
        <div className={styles.row}>
          <div className="col-md-2">
            <h1 className={classes.title}>Consultation</h1>
          </div>
        </div>
*/}
        <div className={styles.grid}>
           <div className={styles.item}>
             <div className={styles.imageContent}>
                
               {drawImage()} 
               {/* <img src={images.chakars} alt="chakras"/> */ }
             </div>
            </div>

            <div className={styles.item}>
              <div className={styles.inputContent}>
                <form>
                  <div className={styles.row}>
                    <div className={styles.col25}>
                      <label forHtml="date">Date</label>
                    </div>
                    <div className={styles.col75}>
                      {/*
                      <input type="text" name="input" placeholder="YYYY-MM-DD" required pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))" title="Enter a date in this format YYYY/MM/DD"/>
                      */}

                      <input type="date" 
                           style={{width: '50%'}}
                           placeholder="dd-mm-yyyy"
                           value={_.isEmpty(buf) ? "" : buf.sessionDate }
                           onChange={handleChange} 
                           required                      
                           name="sessionDate"
                           id="sessionDate"/>

                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.col25}>
                      <label forHtml="lname">Issue</label>
                    </div>
                    <div className={styles.col75}>
                      <input type="text" id="issue" name="issue" placeholder="" 
                           value={_.isEmpty(buf) ? "" : buf.issue }
                           autoCapitalize={false} 
                           onChange={handleChange} 
                           required                      
                      />
                   </div>
                  </div>

        <div className={styles.row}>
          <div className={styles.col25}>
            <label forHtml="subject">Response</label>
          </div>
          <div className={styles.col75}>
            <textarea 
              id="response" 
              name="response" 
              placeholder="" 
              style={{height:350, padding: 5}}
              value={_.isEmpty(buf) ? "" : buf.response }
              onChange={handleChange} 
              >
              
            </textarea>
          </div>
        </div>

        <br/>
        <OutlinedDiv label="Recorder" width={"500px"}> 
        <VoiceRecorder />

        </OutlinedDiv>



        <div className={styles.row}>
           <button onClick={e => handleOk(e)} 
                  className={`ml-3 ${classes.pillButton}`} style={{width: '60px'}}>OK</button> 
                <button onClick={e => { handleCancel(e) }}
                  className={`${classes.pillButton}`} style={{width: '60px'}}>Cancel</button>


        </div>
      </form>

</div>
</div>


        </div>
      
     </>
    )
}

export default Consult
       
/*
          <VoiceRecorder />

//  <div className={styles.row}>      
      const getToolBar = () => (
      <div className={styles.toolTab} id="toolbox">
      <div className={styles.topnavbarTab} >
        <div className="nome-tab"></div>
        <div className={styles.topLeftMenuTab}>
          <div>
            <svg id="close-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path></svg>
          </div>
        </div>
      </div>
      <div style={{padding: '5px 5px'}}>
        <i className="fa fa-car"></i>
        <i className="fa fa-bell"></i>
        <i className="fa fa-graduation-cap"></i>
        <i className="fa fa-laptop"></i>
        <i className="fa fa-bug"></i>
        <i className="fa fa-folder-open"></i>
      </div>
    </div>

      )


  <div>
          <button
            className="palette"
            onClick={() => {
              setShowColor((s) => !s);
            }}
          >
            <span role="img" aria-label="">
              🎨
            </span>{" "}
            color
          </button>
          {showColor && (
    <input
    style={{ background: { brushColor } }}
    type="color"
    value={brushColor}
    onChange={(event) => {
      console.log(event.target.value);
      setBrushColor(event.target.value);
    }}
  />
          )}
        </div>

          const changeBrushSize = () => {
    console.log("In changeBrushSize")
    return (<input
    min="2"
    max="50"
    type="range"
    onChange={(event) => {
      console.log(event.target.value);
      setThick(event.target.value);
    }}
  />)
  }


*/      