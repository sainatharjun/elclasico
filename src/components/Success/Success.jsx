import './Success.css'
import { useState } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

function Success(props) {
    const bookingData = JSON.parse(sessionStorage['bookingData']);
    const locality = bookingData.locality;
    const date = bookingData.date;
    const month = bookingData.month;
    const slot = bookingData.slot;
    const tConvert = (time) => {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }
    return (
        <div className='stripScreen'>
            <img src="images/confirm-icon.svg" className='confirmIcon' alt="" />
            <h4 className='BPHeader success-header'>Booking Success</h4>
            <div className='modal' style={{ top: '5%', backgroundColor: 'inherit', width: '100%', margin: 0 }}>
                <span style={{ fontSize: '22px', display: 'block', margin: 'auto', textAlign: 'center' }}>Slot Details</span>
                <br />
                <table style={{ width: '100%' }}>
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
                            {tConvert(slot[0].startTime)} - {tConvert(((parseInt(slot[slot.length - 1].startTime) + 1 < 10 ? '0' : '') + (parseInt(slot[slot.length - 1].startTime) + 1) + ":00") == "24:00" ? "00:00" : ((parseInt(slot[slot.length - 1].startTime) + 1 < 10 ? '0' : '') + (parseInt(slot[slot.length - 1].startTime) + 1) + ":00"))}
                        </td>
                    </tr>
                </table>
            </div>
            <div className='finalLinks'>
                <Link to="/viewBookings">
                    <p style={{ color: 'red' }}>View Booking</p>
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