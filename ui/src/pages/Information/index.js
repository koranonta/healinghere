import React, { useState, useEffect } from 'react';
import AppStyles from '../../theme/AppStyles';

const Information = () => {

  const classes = AppStyles()

  return (
    <div className="container px-1">
          <div className="col-md-2">
            <h1 className={classes.title}>Information</h1>
        </div>
    </div>     
  )
}

export default Information
