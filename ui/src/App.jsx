import React, { useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import _ from 'lodash'
import Clients from './pages/Clients';
import Information from './pages/Information';
import Consultation from './pages/Consultation';
import { AppContext } from './context/AppContext';

//  Fonts
import './assets/fonts/DIN_Alternate_Bold.ttf'
import './assets/fonts/Hero_Light.otf'
import './assets/fonts/Hero.otf'

function App() {
  const { login } = useContext(AppContext)
  return (
    <BrowserRouter basename="/app/clientinfo/ui">
      <div className="wrapper">
        <Navbar />
        <div className="main_container">
          <Routes>
            <Route path='/' exact       element={ <Clients /> } />
            <Route path='/information'  element={<Information/>} />
            <Route path='/consultation' element={<Consultation/>} />
          </Routes>
        </div>
      </div>
      </BrowserRouter>
  );
}

export default App;


//  <BrowserRouter basename="/app/clientinfo/ui">