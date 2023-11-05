import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import Consult from './Consult';
const Consultation = ({session, setOpen}) => {

  return (
    <div className="container px-1">
      <Consult session={session} setOpen={setOpen}/>
    </div>     
  )
}

export default Consultation