import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { IconButton } from '@material-ui/core';
import { sideBarData } from './SidebarData';
import './Navbar.css';
import {images} from '../../util/Images';
import _ from 'lodash';

const Navbar = () => {
  const [curMenu, setCurMenu] = useState(sideBarData[0].title)
  const [open, setOpen] = useState(true)

  return (
    <div className="side_bar" style={open ? {width: '170px', transition: 'width 0.3s ease-in-out'} : {width: '70px', transition: 'width 0.3s ease-in-out'}}  >

     <IconButton onClick={() =>setOpen(!open)}>
       { open ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
     </IconButton>

      
	    <div className="side_bar_top">
	      <div className="profile_pic">
		      { open && <img src={images.logo}/> }
		    </div>
	    </div>
	    <div className="side_bar_bottom">
	      <ul> 
		    {
          sideBarData.map((item, index) => {
             //console.log(item)
            return (
            <li key={index} className={ 
              _.isEmpty(item.title) ? "" : item.title === curMenu && 'active'
              }>
              <Link to={item.path} onClick={() => setCurMenu(item.title)}>
                <span className="top_curve"></span>
                    <span className="icon">
                      <img src={item?.title === curMenu ? item.activeIcon : item.icon} 
					              width="15px" alt={item.title}/>
                    </span>
                    { open && <span className="item">{item.title}</span> }
                <span className="bottom_curve"></span>
              </Link>
          </li>              
          )})
        }
	      </ul>
	    </div>
  	</div>    
  )
}

export default Navbar


/*
<div className="side_bar" >
*/