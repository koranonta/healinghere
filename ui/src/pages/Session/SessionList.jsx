import React, { useState, useEffect, useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import { IconButton } from '@material-ui/core';
import _ from 'lodash';

import usePagination from '../../hooks/usePagination';
import Pagination from '../../components/Pagination';
import Util from '../../util/Util'
import AppStyles from '../../theme/AppStyles';
import Popup from '../../components/Popup'
import Consultation from '../Consultation';
import ApiService from '../../services/ApiService'
import { commonStyles } from '../../theme/CommonStyles';
import { images } from '../../util/Images';
import { AppContext } from '../../context/AppContext';
import Constants from '../../util/Constants';

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
/*    
    if (mode === 'edit') setDlgTitle(`Edit session [ ${client.clientname} - ${session.sessionid} ]`)
    else if (mode === 'add') setDlgTitle(`New session [ ${client.clientname} - ${session.sessionid} ]`)
    else if (mode === 'delete') setDlgTitle(`Delete session [ ${client.clientname} - ${session.sessionid} ]`)
*/    
   if (mode === 'edit') setDlgTitle(`Edit session [ ${client.clientname} ]`)
   else if (mode === 'add') setDlgTitle(`New session [ ${client.clientname} ]`)
   else if (mode === 'delete') setDlgTitle(`Delete session [ ${client.clientname} ]`)

    setSelSession({...session, mode })
    //console.log(session)
    setOpen(true)
  }

  const sessionHandler = async (buf) => {
    console.log(buf)

    const sessionBody = {
      'clientid': buf.clientid
     ,'sessiondate': buf.sessiondate
     ,'issue': buf.issue
     ,'response': buf.response
     ,'loginid': -1
    }

    let session
    if (buf.mode === 'add')
      session = await ApiService.addSession(sessionBody)
    else if (buf.mode === 'edit')
      session = await ApiService.updateSession(buf.sessionid, sessionBody)
    else if (buf.mode === 'delete')
      session = await ApiService.deleteSession(buf.sessionid, -1)    

    console.log(session)      
    //console.log(session.data.response.session[0])
    //console.log(session.data.response.session[0].sessionid)

    const targetSessionId = buf.mode === 'add' ? session.data.response.session[0].sessionid : buf.sessionid
    let copiedData = [...filteredData ];
    const filteredList = copiedData.filter(elem => (elem.sessionid !== targetSessionId) ? elem : null)
    if (buf.mode !== 'delete') {
      const updatedSession = session.data.response.session[0]
      copiedData = [...filteredList, updatedSession]
      const filtered = Util.sortData(copiedData, 'sessiondate', 'desc');
      setFilteredData(filtered);
    }
    else setFilteredData(filteredList);

    //console.log("newSessionId", targetSessionId)
    const formData = new FormData()
    formData.append('mode', buf.mode)
    formData.append('clientid', buf.clientid)
    formData.append('sessionid', targetSessionId)
    formData.append('image', buf.image)
    formData.append('voice', buf.voice === undefined ? "" : buf.voice)
    formData.append('loginid', -1)
    ApiService.processSessionArtifact(formData)
      .then(resp => (resp.status === Constants.K_HTTP_OK) 
             ? console.log("Session artifact successfully saved.")
             : console.log("Fail to save session artifact.")
        //console.log(resp.data)
      )
      .catch(e => console.log(e))    
  }

  return (
    <>
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
            <button className={`btn mr-2 ${classes.pillButtonGreen}`} 
                    onClick={e => { e.preventDefault(); openSessionDlg('add', {'clientid': client.clientid, 'sessionid': -1}) }}> 
              <i className="fas fa-plus"></i> New
            </button>
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
        width={'700px'}>
        <Consultation
          session={selSession}
          setOpen={setOpen} 
          actionHandler={sessionHandler} />
      </Popup>
    </>
  );
}

export default SessionList
