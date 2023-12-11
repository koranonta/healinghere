import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
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

const columns = [
  { label: 'Id',          sortKey: 'clientid',     align: 'left', width: '5%' },
  { label: 'Name',        sortKey: 'clientname',   align: 'left', width: '15%' },
//  { label: 'User name',   sortKey: 'username',     align: 'left', width:'15%' },
  { label: 'Email',       sortKey: 'emailaddress', width:'15%' },
//  { label: 'Last active', sortKey: 'lastactive',   width:'8%' },
//  { label: 'Signup',      sortKey: 'signup',       width:'8%' },
  { label: 'City',        sortKey: 'city',         width:'10%' },
  { label: 'Region',      sortKey: 'region',       align: 'right', width:'10%' },
  { label: 'Post code',   sortKey: 'postcode',     align: 'center', width:'5%' },  
  { label: 'Action',      sortKey: '',             align: 'center', width:'10%' },
];

const ClientList = ({ data, itemsPerPage, setItemsPerPage, startFrom }) => {
  const [sortByKey, setSortByKey] = useState('id')
  const [order, setOrder] = useState('asc')
  const [openDlg, setOpenDlg] = useState(false)
  const [selItem, setSelItem] = useState()
  const [searchText, setSearchText] = useState("")  

  const { selMenu, setSelMenu } = useContext(AppContext)

  const { 
    slicedData, 
    pagination, 
    prevPage, 
    nextPage, 
    changePage, 
    setCurrentPage,
    pages,    
    setFilteredData, 
    filteredData } = usePagination({ itemsPerPage, data, startFrom });

    const classes = AppStyles()

    const navigate = useNavigate();

    //useEffect(()=> {
    //  console.log(selMenu)
    //},[data])

    useEffect(() => {
      const copyOfFilteredData = [...filteredData];
      const sortFiltered = copyOfFilteredData;
      setFilteredData(sortFiltered);
    }, [itemsPerPage])      

    const sortHandler = (sortBy, orderBy) => {
      if(sortByKey !== sortBy) {
        setSortByKey(sortBy);
      }
      if(order !== orderBy) {
        setOrder(orderBy);
      }
      const copyOfFilteredData = [...filteredData];
      const filtered = Util.sortData(copyOfFilteredData, sortBy, orderBy);
      setFilteredData(filtered);
    }    

    const openPopup = (item, mode) => {
      setSelItem(item)
      setOpenDlg(true)
    }

    const onSearch = (e, searchText) => {
      e.preventDefault()
      const copiedData = [...data];
      const filteredList = copiedData.filter( elem => {
        let name = elem.clientname
        return (elem.clientname.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || 
                elem.emailaddress.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
          ? elem : null
      })
      setFilteredData(filteredList)
      setCurrentPage(1)
    }

    const goToConsultation = (client) => {
      //console.log(client)
      setSelMenu("consultation")
      navigate("/session/", {
        state: {
          client
        }
      });
    }

    return(      
      <>

        <div className='mb-3'>
          <h1 className={classes.title} >Clients</h1>
        </div>

        <div className="row mb-2">
        <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8'>
          <div className='d-flex justify-content-start align-items-center'>
            <div className='mr-2'> <h4 className=''>Search :</h4> </div>
            <div> <input type="text" className={classes.inputText} value={searchText} onChange={(e) => setSearchText(e.target.value)} name="search" id="search" placeholder="Search..." /> </div>
            <div className='ml-3'><button className='btn btn-info mr-2' onClick={e => onSearch(e, searchText)}> Go</button>
              <button className='btn btn-info' onClick={e => { setSearchText(""); onSearch(e, "") }} > Clear</button></div>
          </div>
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4'>
          <div className='d-flex justify-content-end align-items-center'>
            <div className='ml-3'>

            </div>
          </div>
        </div>
      </div>



      {slicedData.length > 0 ? <>
        <div className="row">
          <div className="col-md-12" >
            <table width="100%">
              <thead>
                <tr>
                {columns.map((col, index) => (
                  <th style={{
                    ...commonStyles.tableHeader,                       
                    textAlign: _.isEmpty(col.align) ? 'left' : col.align,
                    width: !_.isEmpty(col.width) && col.width     
                  }}
                  key={index}
                  onClick={() => 
                  col.sortKey !== '' 
                    ? sortHandler(col.sortKey, sortByKey === col.sortKey ? order === 'asc' ? 'desc' : 'asc' : 'asc')
                    : ""}>
                    {col.label}
                    {sortByKey === col.sortKey &&
                    <span className="icon">
                      {order === 'asc'
                        ? <FaIcons.FaSortUp />
                        : <FaIcons.FaSortDown />
                      }
                    </span>
                  }
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slicedData.map((item, index) => (
                <tr key={index} style={{ paddingBottom: '1rem'}}>
                  <td style={{...commonStyles.tableRow, textAlign: 'left', width: '5%'}}>{Util.zeroPad(item.clientid, 3)}</td>
                  <td style={{...commonStyles.tableRow, width: '15%'}}>{item.clientname}</td>
                  <td style={{...commonStyles.tableRow, width: '15%'}}>{item.emailaddress}</td>
                  <td style={{...commonStyles.tableRow}}>{item.city}</td>
                  <td style={{...commonStyles.tableRow}}>{item.region}</td>
                  <td style={{...commonStyles.tableRow}}>{item.postcode}</td>
                  <td style={{...commonStyles.tableRow, whiteSpace: 'nowrap'}}>
                    <IconButton onClick={() =>goToConsultation(item)}>
                      <img src={images.editIcon} width="30px" alt={item.title}/>
                    </IconButton>
                    <IconButton onClick={() =>openPopup(item, 'delete')}>
                      <img src={images.deleteIcon} width="30px" alt={item.title}/>
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <br/>
          
        { pages > 1 &&
         <div className={classes.rightJustifyContainer}>
           <Pagination
             prevPage = {prevPage}
             nextPage = {nextPage}
             pagination = {pagination}
             changePage = {changePage}
             itemsPerPage = {itemsPerPage}
             setItemsPerPage = {setItemsPerPage} />
          </div>
        }
          </div>
        </div>

        </>
        :
        <div className="message is-link">
          <div className="message-body has-text-centered">No results</div>
        </div>
      }

      
     </>
    );    
}

export default ClientList
       
/*

       <EmployeeDlg 
         item={selItem}
         employeeTypes={employeeTypes}
         genderTypes={genderTypes}
         mode={mode}
         width={'500px'}
         open={openDlg}
         setOpen={setOpenDlg}
         actionHandler={employeeHandler}
       />   

                <tr key={index} style={{ paddingBottom: '1rem'}}>
                  <td style={{...commonStyles.tableRow, textAlign: 'left', width: '5%'}}>{Util.zeroPad(item.clientid, 3)}</td>
                  <td style={{...commonStyles.tableRow, width: '15%'}}>{item.clientname}</td>
                  <td style={{...commonStyles.tableRow, width: '15%'}}>{item.userame}</td>
                  <td style={{...commonStyles.tableRow, width: '15%'}}>{item.emailaddress}</td>
                  <td style={{...commonStyles.tableRow}}>{item.lastactive === "0000-00-00" ? "" : Util.toDMY(item.lastactive)}</td>
                  <td style={{...commonStyles.tableRow}}>{item.signup     === "0000-00-00" ? "" : Util.toDMY(item.signup)}</td>
                  <td style={{...commonStyles.tableRow}}>{item.city}</td>
                  <td style={{...commonStyles.tableRow}}>{item.region}</td>
                  <td style={{...commonStyles.tableRow}}>{item.postcode}</td>
                  <td style={{...commonStyles.tableRow, whiteSpace: 'nowrap'}}>
                    <IconButton onClick={() =>openPopup(item, 'edit')}>
                      <img src={images.editIcon} width="30px" alt={item.title}/>
                    </IconButton>
                    <IconButton onClick={() =>openPopup(item, 'delete')}>
                      <img src={images.deleteIcon} width="30px" alt={item.title}/>
                    </IconButton>
                  </td>
                </tr>

*/


/*

        <div className="row">
          <div className="col-md-2">
            <h1 className={classes.title}>Clients</h1>
          </div>
    
          <div className="col-md-3 mb-3">
            <form className="mt-3 mb-3 is-flex" style={{justifyContent: 'center', verticalAlign: 'middle'}}>
              <div className={`${classes.filterLabel}`} style={{marginLeft: '20%'}}>Search :</div>
                <div className={`ml-2`}>
                  <input type="text" 
                         value={searchText}
                         className={classes.inputText}
                         onChange={(e) => setSearchText(e.target.value)} 
                         name="search"
                         id="search"/>
                </div> 

                <button onClick={e => onSearch(e, searchText)} 
                  className={`ml-3 ${classes.pillButton}`} style={{width: '60px'}}>Go</button> 
                <button onClick={e => { setSearchText(""); onSearch(e, "") }}
                  className={`${classes.pillButton}`} style={{width: '60px'}}>Clear</button>               
            </form>
          </div>  
        </div>

*/        