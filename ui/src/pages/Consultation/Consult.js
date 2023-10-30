import React, { useState, useEffect, useContext } from 'react';
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

  const classes = AppStyles()

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
                <img src={images.chakars} alt="chakras"/>
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
       
