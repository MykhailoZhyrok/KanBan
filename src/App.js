import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Main} from './page/Main'
import { UserPage } from './page/UserPage';

function App() {

  
  return (
    <Router>
        <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/:name/:repos' element={<Main/>}/>
        <Route path='/user/:name' element={<UserPage/>}/>
        </Routes>
    </Router>

  )
}

export default App;