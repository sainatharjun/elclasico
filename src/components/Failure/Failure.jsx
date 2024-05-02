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
            <img src="images/wrong-icon.svg" className='confirmIcon' alt="" />
            <h4 className='BPHeader success-header'>Something Went Wrong</h4>
            <div className='modal' style={{top:'5%',backgroundColor:'inherit', width:'100%',margin:0}}>
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