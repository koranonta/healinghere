import React, { useState, useRef, forwardRef } from 'react';
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

const Drawing = forwardRef({backgroundImage, ref}) => {
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#0aFF02");
  const canvasRef = useRef()

  const props = {
    ...canvasProperties,
    ref: canvasRef,
    brushColor,
    catenaryColor: brushColor,
    brushRadius: brushSize,
    imgSrc: backgroundImage,
  };
  
  const classes = AppStyles()


  return (
    <div className='col-sm-12 col-md-6 col-lg-6'>
      <div style={{  
           display: 'grid',
           gridTemplateColumns: 'repeat(5, 1fr)',
           justifyItems: 'stretch',
           alignItems: 'stretch',
           columnGap: 10,
           rowGap: 10,
           cursor: 'pointer'        
        }}>
        <div className='grid-content-tool' onClick={() => canvasRef.current.eraseAll()}>✖️</div>
        <div className='grid-content-tool' onClick={() => canvasRef.current.undo()}>↪️</div>
        <label className='grid-content-tool'>🎨
        <input
        style={{  width: 0, height: 0 }}
        type="color"
        value={brushColor}
        onChange={(event) => {
          console.log(event.target.value);
          setBrushColor(event.target.value);
        }}/>
      </label>        
        <div className='grid-content-tool'>🖌️</div>
        <div className='grid-content-tool'>
          <input min="2" max="50" type="range"
             style={{width: 50}}
             onChange={(event) => {
               console.log(event.target.value);
               setBrushSize(event.target.value);
             }}
          />
        </div>
      </div >
      <div className='d-flex justify-content-center mt-5'>
        <div className='image-tool'>
          <CanvasDraw { ...props }  ref={canvasRef}  />
        </div>
      </div>
    </div>    
   ) 
}

export default Drawing
