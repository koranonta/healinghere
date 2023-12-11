import React, { useState, forwardRef, useEffect, useReducer } from 'react';
import CanvasDraw from "react-canvas-draw";
import _ from 'lodash';
import AppStyles from '../../theme/AppStyles';

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
};      

const Drawing = forwardRef((props, ref) => {
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#0aFF02");

  const canvasRef = ref

  const canvasProps = {
    ...canvasProperties,
    ref: canvasRef,
    brushColor,
    catenaryColor: brushColor,
    brushRadius: brushSize,
    imgSrc: props.backgroundImage,
  };

  const classes = AppStyles()

  return (
    <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6'>
      <div className="row">
      <div className="d-flex justify-content-between">
        <div className={classes.toolSelection} onClick={() => canvasRef.current.eraseAll()}><p>✖️</p></div>
        <div className={classes.toolSelection} onClick={() => canvasRef.current.undo()}><p>↪️</p></div>
        <div className="d-flex justify-content-between">
        🎨<input type="color" 
          id="colorPicker" 
          value={brushColor}
          onChange={(event) => {
            setBrushColor(event.target.value);
           }}  />          
           
        </div>
        <div ><p>🖌️<input min="2" max="70" type="range"
             className={classes.toolSelection} 
             style={{width: 150}}
             value={brushSize}
             onChange={(event) => {
               //console.log(event.target.value);
               setBrushSize(parseInt(event.target.value));
             }} />
             </p>
          </div>
        <div>
        </div>
      </div >
      <div className='row mt-4'>
        <div className='col-12 d-flex justify-content-center'>
          <CanvasDraw { ...canvasProps } 
            ref={ref}
            saveData={JSON.stringify(props.savedData)  }
            />
        </div>
      </div>
    </div> 
    </div>   
   ) 
}
)

export default Drawing
