import "../TurfCard/TurfCard.css"
import "./admin.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Admincard() {
  
    return  (
        <div className="adminCard">
            <div className="lhs">
                <h5>Arjun&nbsp;<img style={{display:'inline'}} src="../images/football.png" alt="football" /></h5>
                <h6><img style={{display:'inline',height:'20px'}} src="../images/phone.png" alt="football" />&nbsp;+91 967708047</h6>
            </div>
            <div className='rhs'>
                <div className='timings'>
                    <img src="..\images\clock 1.svg" alt="clock" />
                    <p>06:00 AM - 07:00 PM</p>
                </div>
                <div className='price'>
                <img src="..\images\₹.svg" alt="clock" />
                    <p>800</p>
                </div>
            </div>
        </div>
    )
}

export default Admincard;