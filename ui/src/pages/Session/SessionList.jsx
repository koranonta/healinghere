import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import { IconButton } from '@material-ui/core';
import _ from 'lodash';
import usePagination from '../../hooks/usePagination';
import Pagination from '../../components/Pagination';
import Util from '../../util/Util'
//import ApiService from '../../services/ApiService'
//import AppConfig from '../../config/AppConfig';
import AppStyles from '../../theme/AppStyles';
import { commonStyles } from '../../theme/CommonStyles';
import { images } from '../../util/Images';
import { AppContext } from '../../context/AppContext';
import Popup from '../../components/Popup'
import Consultation from '../Consultation';

const columns = [
  { label: 'Session date', sortKey: 'sessiondate', align: 'left', width: '15%' },
  { label: 'Issues', sortKey: 'issue', align: 'left', width: '30%' },
  { label: 'Response', sortKey: 'response', align: 'left', width: '40%' },
  { label: 'Action', sortKey: '', align: 'center', width: '10%' },
];

const SessionList = ({ data, client, itemsPerPage, setItemsPerPage, startFrom }) => {
  const [sortByKey, setSortByKey] = useState('id')
  const [order, setOrder] = useState('asc')
  const [open, setOpen] = useState(false)
  const [dlgTitle, setDlgTitle] = useState()
  const [selSession, setSelSession] = useState()
  const [searchText, setSearchText] = useState("")

  const { login } = useContext(AppContext)

  useEffect(() => {
    console.log(client)
  }, [])

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

  useEffect(() => {
    const copyOfFilteredData = [...filteredData];
    const sortFiltered = copyOfFilteredData;
    setFilteredData(sortFiltered);
  }, [itemsPerPage])

  const sortHandler = (sortBy, orderBy) => {
    if (sortByKey !== sortBy) {
      setSortByKey(sortBy);
    }
    if (order !== orderBy) {
      setOrder(orderBy);
    }
    const copyOfFilteredData = [...filteredData];
    const filtered = Util.sortData(copyOfFilteredData, sortBy, orderBy);
    setFilteredData(filtered);
  }

  const onSearch = (e, searchText) => {
    e.preventDefault()
    console.log("In onSearch")
    const copiedData = [...data];
    const filteredList = copiedData.filter(elem => {
      return (elem.issue.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        elem.response.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
        ? elem : null
    })
    setFilteredData(filteredList)
    setCurrentPage(1)
  }

  const openSessionDlg = (mode, session) => {
    if (mode === 'edit') setDlgTitle(`Edit session [ ${client.clientname} ]`)
    else if (mode === 'add') setDlgTitle(`New session [ ${client.clientname} ]`)
    else if (mode === 'delete') setDlgTitle(`Delete session [ ${client.clientname} ]`)
    setSelSession(session)
    console.log(session)
    setOpen(true)
  }


  return (
    <>
      {/* <div className="row">
          <div className="col-md-2">
            <h1 className={classes.title}>Sessions</h1>
            <span style={{...commonStyles.tableRow, padding: 2, marginLeft: 50}}>Name :</span>
            <span style={{...commonStyles.tableRow, border: '1px solid green', padding: 2, marginRight: 30, marginLeft: 5}}>{client.clientname}</span>
            <span style={{...commonStyles.tableRow, padding: 2}}>Email :</span>
            <span style={{...commonStyles.tableRow, border: '1px solid green', padding: 2, marginLeft: 5}}>{client.emailaddress}</span>
          </div>

          <form className="col-md-3 mb-3">
            <div className="mt-3 mb-3 is-flex" style={{justifyContent: 'center', verticalAlign: 'middle'}}>
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
                <button onClick={e => { e.preventDefault(); openSessionDlg('add', {}) }}
                  className={`${classes.pillButtonGreen}`} style={{marginLeft: 150, width: '60px'}}><FaIcons.FaPlusCircle title="New Session"/>
                  {" "} New</button>
            </div>
          </form>  
        </div> */}

      <div className='mb-3'>
        <h1 className={classes.title} >Sessions</h1>
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
      <div className='row mt-3'>
        <div className='col-4'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <p>{client.clientname}</p>
          </div>
        </div>
        <div className='col-4'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <p>{client.emailaddress}</p>
          </div>
        </div>
        <div className='col-4'>
          <div className="mb-3 d-flex justify-content-end align-items-center">
            <button className={`btn mr-2 ${classes.pillButtonGreen}`} onClick={e => { e.preventDefault(); openSessionDlg('add', {}) }}> <i className="fas fa-plus"></i> New</button>
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
                  <tr key={index} style={{ paddingBottom: '1rem' }}>
                    <td style={{ ...commonStyles.tableRow, textAlign: 'left', width: '15%' }}>{Util.toDMY(item.sessiondate)}</td>
                    <td style={{ ...commonStyles.tableRow, width: '30%' }}>{Util.truncateText(item.issue, 40)}</td>
                    <td style={{ ...commonStyles.tableRow, width: '40%' }}>{Util.truncateText(item.response, 50)}</td>
                    <td style={{ ...commonStyles.tableRow, whiteSpace: 'nowrap' }}>
                      <IconButton onClick={() => openSessionDlg('edit', item)}>
                        <img src={images.editIcon} width="30px" alt={item.title} />
                      </IconButton>
                      <IconButton onClick={() => openSessionDlg('delete', item)}>
                        <img src={images.deleteIcon} width="30px" alt={item.title} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br />

            {pages > 1 &&
              <div className={classes.rightJustifyContainer}>
                <Pagination
                  prevPage={prevPage}
                  nextPage={nextPage}
                  pagination={pagination}
                  changePage={changePage}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage} />
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


      <Popup title={dlgTitle}
        open={open}
        setOpen={setOpen}
        showCloseIcon={true}
        width={'700px'}
      >
        <Consultation
          session={selSession}
          setOpen={setOpen} />
      </Popup>


    </>
  );
}

export default SessionList

