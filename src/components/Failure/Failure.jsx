import '../Success/Success.css'
import { useState } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

function Success(props) {
    const location=useLocation();
    const locality=location.state.locality;
    const date=location.state.date;
    const month=location.state.month;
    const slot=location.state.slot;
    return  (
        <div className='stripScreen'>
            <img src="images/confirm-icon.svg" className='confirmIcon' alt="" />
            <h4 className='BPHeader success-header'>Booking Success</h4>
            <div className='modal' style={{top:'5%',backgroundColor:'inherit', width:'100%',margin:0}}>
            <span style={{fontSize:'22px',display:'block',margin:'auto',textAlign:'center'}}>Slot Details</span>
                <br />
                <table style={{width:'100%'}}>
                    <tr>
                        <td>
                            Venue
                        </td>
                        <td>
                            {locality}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Date
                        </td>
                        <td>
                            {date} {month}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Slot
                        </td>
                        <td>
                            {slot} - {parseInt(slot)<10?'0':''}{parseInt(slot)+1}:00
                        </td>
                    </tr>
                </table>
            </div>
            <div className='finalLinks'>
                <Link to="/viewBookings">
                <p style={{color:'red'}}>View Booking</p>
                </Link>
                <br />
                <Link to="/">
                <p>Go to Homepage</p>
                </Link>
            </div>
        </div>
    )
}

export default Success;