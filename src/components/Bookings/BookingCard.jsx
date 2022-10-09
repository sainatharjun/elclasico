import '../TurfCard/TurfCard.css';
import './Bookings.css';
import { Link } from "react-router-dom";

function BookingCard(props) {
    var name="Arjun";
    const tConvert =(time)=> {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }
    return (
      <div id="bookingCard">
        <div className="priceImageStyleStyle">
          <img
            className="turfCardLogo"
            src="images\el_classico_logo.png"
            alt=""
          />
          <div className="lhs">
            <h6>{props.location}</h6>
            <div className="sportContainer">
              <img src="images\football.png" alt="football" />
              <img src="images\cricket.png" alt="cricket" />
            </div>
          </div>
          <div className="rhs bookingRHS">
            <div className="timings">
              <img src="images\clock 1.svg" alt="clock" />
              <p>
                {tConvert(props.startTime)} - {tConvert(props.endTime)}
              </p>
            </div>
            <div className="timings">
              <img src="images\clock 1.svg" alt="clock" />
              <p>{props.date}</p>
            </div>
            <div className="price">
              <img src="images\₹.svg" alt="clock" />
              <p>{props.price}</p>
            </div>
          </div>
        </div>
        <div className="cancelContainer">
          <div
            className="cancel"
            onClick={() => {
              props.cancelModal(props);
            }}
          >
            Click here to cancel the booking
          </div>
        </div>
      </div>
    );
}

export default BookingCard;