import React from 'react';
import { Routes,Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; //for showing notification to the users
import { Home } from './pages/Home';

const App = () => {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={Home}/>
      </Routes>
 

    </div>
  )
}

export default App

