import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Detail from './Pages/Detail/Detail'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Profile from './Pages/Profile/Profile'
import Search from './Pages/Search/Search'
import SignUp from './Pages/SignUp/SignUp'
import HomeTemplate from './Templates/HomeTemplate/HomeTemplate'
import MainTemplate from './Templates/MainTemplate/MainTemplate'
type Props = {}

const App = (props: Props) => {
  return (
    <Routes>
      <Route path='' element={<HomeTemplate />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='' element={<MainTemplate />}>
        <Route path='/search' element={<Search />}>
          <Route path=':id' />
        </Route>
        <Route path='/detail' element={<Detail />}>
          <Route path=':id' />
        </Route>
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/profile' element={<Profile />} />

    </Routes>
  )
}

export default App