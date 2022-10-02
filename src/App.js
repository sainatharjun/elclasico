import './App.css';
import BookingPreference from './components/BookingPreference/BookingPreference';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login'
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Success from './components/Success/Success';
import Failure from './components/Failure/Failure';
import Bookings from './components/Bookings/Bookings';
import $ from 'jquery'
import AllBookings from './components/AllBookings/AllBookings';

/* eslint-disable */
function App() {
  const logout = () => {
    sessionStorage.removeItem('user');
    window.location.href = "/";
  }
  if (sessionStorage['user']) {
    var user = JSON.parse(sessionStorage['user'])
  }
  else {
    var user = {
      email: ''
    }
  }
  return (
    <div style={{ height: '100%' }}>
      {sessionStorage['user'] ? <nav className='nav'>
        <a href='/'>
          <img className='navLogo' src={window.location.href!="http://localhost:3000/admin/allBookings"?"images/el_classico_logo.png":"../images/el_classico_logo.png"} />
        </a>
        <div className='linkDiv'>
          {user.email == 'elclasicoturf@gmail.com' ?
            <a href="/admin/allBookings">
              <span>All Bookings</span>
            </a>
            : ''}
          <a href="/viewBookings">
            <span>My Bookings</span>
          </a>
          <a onClick={() => { logout() }} href="javascript:void(0)">
            <span>Logout</span>
          </a>
        </div>
      </nav> : ''}
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {sessionStorage['user'] ? <Route index element={<LandingPage />} /> : <Route index element={<Login />} />}
            <Route path="bookingPreference" element={<BookingPreference />} />
            <Route path="success" element={<Success />} />
            <Route path="failure" element={<Failure />} />
            <Route path="viewBookings" element={<Bookings />} />
          </Route>

          <Route path="/admin">
            <Route path="allBookings" element={user.email == 'elclasiocturf@gmail.com' ? <AllBookings /> : <Navigate to="/" />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  )
}

export default App;