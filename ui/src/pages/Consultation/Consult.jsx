import React, { useState, useRef } from 'react';
import CanvasDraw from "react-canvas-draw";
import * as FaIcons from 'react-icons/fa';
import { IconButton } from '@material-ui/core';
import _ from 'lodash';
import usePagination from '../../hooks/usePagination';
import Pagination from '../../components/Pagination';
//import EmployeeDlg from './EmployeeDlg';
import Util from '../../util/Util'
//import ApiService from '../../services/ApiService'
//import AppConfig from '../../config/AppConfig';
import AppStyles from '../../theme/AppStyles';
import { commonStyles } from '../../theme/CommonStyles';
import { images } from '../../util/Images';
//import EmployeeFilterAndSearch from '../../components/EmployeeFilterAndSearch';
import { AppContext } from '../../context/AppContext';

import styles from './style.module.css'; 


const Consult = () => {
  const [sortByKey, setSortByKey] = useState('id')
  const [order, setOrder] = useState('asc')
  const [openDlg, setOpenDlg] = useState(false)
  const [selItem, setSelItem] = useState()
  const [searchText, setSearchText] = useState("")  
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#FF0000");  
  const [state, setState] = useState(
    {
        color: "#ffc600",
        width: 400,
        height: 800,
        brushRadius: 2,
        lazyRadius: 12,
        backgroundImg: "./chakras.png",
        imgs: [
          "https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg",
          "https://i.imgur.com/a0CGGVC.jpg"
        ]
      }
      )

      const canvasRef = useRef()

      const canvasProperties = {
        brushColor: "#ffc600",
        brushRadius: brushSize,
        saveData: null,
        ref: canvasRef,
        lazyRadius: 0.1,
        gridSizeX: 25,
        gridSizeY: 25,
        gridLineWidth: 1,
        hideGridX: false,
        hideGridY: false,
        enablePanAndZoom: true,
        canvasWidth: 500,
        canvasHeight: 500,
        onChange: null,
        cursor:'pointer'
      };      
    


  const classes = AppStyles()

    const drawImage = () => {
      return (
        <div>
        <div style={{display: 'flex', direction: 'row',
        
        justifyContent: 'space-between', width: 300, marginBottom: 10
        
        }}>
  
            <button
              onClick={() => {
                canvasRef.current.eraseAll();
              }}
            >
              Erase
            </button>
            <button
              onClick={() => {
                canvasRef.current.undo();
              }}
            >
              Undo
            </button>
            <button
              onClick={() => {
                console.log(canvasRef.current.getDataURL());
                alert("DataURL written to console")
              }}
            >
              GetDataURL
            </button>
{/*            
            <div>
              <label>Width:</label>
              <input
                type="number"
                value={state.width}
                onChange={e =>
                  setState({...state, width: parseInt(e.target.value, 10) })
                }
              />
            </div>
            <div>
              <label>Height:</label>
              <input
                type="number"
                value={state.height}
                onChange={e =>
                  setState({...state, height: parseInt(e.target.value, 10) })
                }
              />
            </div>
            <div>
              <label>Brush-Radius:</label>
              <input
                type="number"
                value={state.brushRadius}
                onChange={e =>
                  setState({...state, brushRadius: parseInt(e.target.value, 10) })
                }
              />
            </div>
            <div>
              <label>Lazy-Radius:</label>
              <input
                type="number"
                value={state.lazyRadius}
                onChange={e =>
                  setState({ lazyRadius: parseInt(e.target.value, 10) })
                }
              />
            </div>
*/}
          </div>
  
  
        <CanvasDraw
           {
            ...canvasProperties
           }


            ref={canvasRef}
            brushColor="rgba(155,12,60,0.3)"
            imgSrc={state.backgroundImg}
            enablePanAndZoom
            clampLinesToDocument
            gridColor="#ccc"          
            brushColor={state.color}
            brushRadius={state.brushRadius}
            lazyRadius={state.lazyRadius}
            canvasWidth={state.width}
            canvasHeight={state.height}  
            style={{width:300, height:600}}>
          </CanvasDraw>

      </div>        
      )
    }

    console.log(canvasRef.current)      

    return(      
      <>
        <div className={styles.row}>
          <div className="col-md-2">
            <h1 className={classes.title}>Consultation</h1>
          </div>
        </div>

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
                      <input type="text" name="input" placeholder="YYYY-MM-DD" required pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))" title="Enter a date in this format YYYY/MM/DD"/>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.col25}>
                      <label forHtml="lname">Issue</label>
                    </div>
                    <div className={styles.col75}>
                      <input type="text" id="issue" name="issue" placeholder="" />
                   </div>
                  </div>

        <div className={styles.row}>
          <div className={styles.col25}>
            <label forHtml="subject">Response</label>
          </div>
          <div className={styles.col75}>
            <textarea id="responsive" name="responsive" placeholder="" style={{height:350}}></textarea>
          </div>
        </div>
        <div className={styles.row}>
          <input type="submit" value="Submit" />
        </div>
      </form>

</div>
</div>


        </div>
      
     </>
    )
}

export default Consult
       
