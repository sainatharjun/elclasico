import '../TurfCard/TurfCard.css';
import './Bookings.css';
import { Link } from "react-router-dom";

function BookingCard(props) {
    var name="Arjun";

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
                {props.startTime} - {props.endTime}
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