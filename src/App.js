import React from 'react'
import {Routes, Route } from 'react-router-dom';
import {Main} from './page/Main'
import { UserPage } from './page/UserPage';
import { ErrorPage } from './page/ErrorPage';

function App() {
  return (

        <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/:name/:repos' element={<Main/>}/>
        <Route path='/user/:name' element={<UserPage/>}/>
        <Route path='/*' element={<ErrorPage/>}/>

        </Routes>
 

  )
}

export default App;