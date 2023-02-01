import React from 'react';
import 'antd/dist/reset.css';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms/Rooms';
import Profile from './pages/Profile';
import Login from './pages/Login';

import AdminTemplate from './Templates/AdminTemplate';
import RoomCreated from './pages/Rooms/RoomCreated/RoomCreated';
import RoomEdit from './pages/Rooms/RoomEdit/RoomEdit';
import Location from './pages/Locations/Location';
import LocationEdit from './pages/Locations/LocationEdit/LocationEdit';
import Users from './pages/Users/Users';
import UserEditDetail from './components/UserComponent/UserEditDetail/UserEditDetail';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<AdminTemplate />}>
          <Route path='dashboard' element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path='create-room' element={<RoomCreated />} />
          <Route path='rooms/:id' element={<RoomEdit />} />
          <Route path="profile" element={<Profile />} />
          <Route path='users' element={<Users />}>
            <Route path='search/:TenNguoiDung' element={<Users />} />
          </Route>
          <Route path='users/:id' element={<UserEditDetail />} />
          <Route path="locations" element={<Location />} >
            <Route path=':id' element={<LocationEdit />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App;
