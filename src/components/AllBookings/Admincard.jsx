import "../TurfCard/TurfCard.css"
import "./admin.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Admincard(props) {
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
    // add start time to the slot booking date
    props.dateObj.setHours(parseInt(props.startTime))
    return (
        <div className="adminCard">
            <div className="row">
                <div className="lhs col-7">
                    <h5>{props.name.split(' ',1)[0]}</h5>
                    <a style={{ color: 'black', textDecoration: 'none' }} href={'tel:' + props.phone}><h6><img style={{ display: 'inline', height: '20px' }} src="../images/phone.png" alt="football" />&nbsp;+91 {props.phone}</h6></a>
                </div>
                <div className='rhs col-5'>
                    <div className='timings'>
                        <img src="..\images\clock 1.svg" alt="clock" />
                        <p>{tConvert(props.startTime)} - {tConvert(props.endTime)}</p>
                    </div>
                    <div className='price'>
                        <img src="..\images\rupee.svg" alt="rupees" />
                        <p>{props.price}</p>
                    </div>
                </div>
            </div>
            {
                props.dateObj > new Date() ?
                    <div className="row"><div className="cancelContainer">
                    <div
                        className="cancel"
                        onClick={() => {
                            props.cancelModal(props);
                        }}
                    >
                        Click here to cancel the booking
                    </div>
                </div></div>
                    :
                    console.log(props.dateObj)
            }
        </div>
    )
}

export default Admincard;