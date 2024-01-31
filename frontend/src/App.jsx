import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreatePerson from './pages/CreatePerson'
import DeletePerson from './pages/DeletePerson'
import EditPerson from './pages/EditPerson'
import ShowPerson from './pages/ShowPerson'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/people/create' element={<CreatePerson />} />
        <Route path='/people/delete/:id' element={<DeletePerson />} />
        <Route path='/people/edit/:id' element={<EditPerson />} />
        <Route path='/people/details/:id' element={<ShowPerson />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
  )
}

export default App