import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Apple1 } from './apple/pages/Apple1';
import { Apple2 } from './apple/pages/Apple2';
import { Navbar } from './ui/components';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { UserProvider } from './context/UserProvider';


export const App = () => {
  
  return (
    <UserProvider>
      <Navbar />
      <div className='espacioTopContenedor1'>  
        <Routes>
          <Route path='/' element={ <Apple1/> } />
          <Route path='/apple2' element={ <Apple2/> } />
          <Route path='/*' element={<Navigate to={'/'} /> } />
        </Routes>
      </div>
    </UserProvider>
  )
}