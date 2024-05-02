import "./App.css";
import BookingPreference from "./components/BookingPreference/BookingPreference";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Success from "./components/Success/Success";
import Failure from "./components/Failure/Failure";
import Bookings from "./components/Bookings/Bookings";
import $ from "jquery";
import AllBookings from "./components/AllBookings/AllBookings";
import VenuePage from "./components/VenuePage";

/* eslint-disable */
function App() {
  const getCookie = function (cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  const logout = () => {
    sessionStorage.removeItem("user");
    document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };
  let user = getCookie("user");
  if (user) {
    sessionStorage["user"] = user;
    user = JSON.parse(user);
  } else {
    user = {
      email: "",
    };
  }
  return (
    <div style={{ height: "100%" }}>
      <BrowserRouter>
        {sessionStorage["user"] ? (
          <nav className="nav">
            <a href="/">
              <img
                className="navLogo"
                src={
                  window.location.href !=
                  "https://elclasicoturf.in/admin/allBookings"
                    ? "images/el_classico_logo.png"
                    : "../images/el_classico_logo.png"
                }
              />
            </a>
            <div className="linkDiv">
              {user.email == "elclasicoturf@gmail.com" ? (
                <Link to="/admin/allBookings">
                  <span>All Bookings</span>
                </Link>
              ) : (
                ""
              )}
              {user.email != "elclasicoturf@gmail.com" ? (
                <Link to="/viewBookings">
                  <span>My Bookings</span>
                </Link>
              ) : (
                ""
              )}

              <a
                onClick={() => {
                  logout();
                }}
                href="javascript:void(0)"
              >
                <span>Logout</span>
              </a>
            </div>
          </nav>
        ) : (
          ""
        )}
        <Routes>
          <Route path="/">
            {sessionStorage["user"] ? (
              <Route index element={<LandingPage />} />
            ) : (
              <Route index element={<Login />} />
            )}
            <Route path="bookingPreference" element={<BookingPreference />} />
            <Route path="success" element={<Success />} />
            <Route path="failure" element={<Failure />} />
            <Route path="viewBookings" element={<Bookings />} />
            <Route path="venue" element={<VenuePage />} />
          </Route>

          <Route path="/admin">
            <Route
              path="allBookings"
              element={
                user.email == "elclasicoturf@gmail.com" ? (
                  <AllBookings />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  );
}

export default App;
