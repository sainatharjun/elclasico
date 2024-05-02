import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./venuePage.css"
import { Link, useLocation } from "react-router-dom";
import GoogleReview from "./GoogleReview";
function VenuePage(props) {
  const location = useLocation();
  const venue = location.state.venue;
  console.log(venue)
  return (
    <div className="venuePageContent">
            <Carousel showThumbs={false}>
                <div>
                    <img height={300} width={400} src="images/carousel1.jpg" alt="" />
                </div>
                <div>
                    <img height={300} width={400} src="images/carousel2.jpg" alt="" />
                </div>
                <div>
                    <img height={300} width={400} src="images/carousel3.jpg" alt="" />
                </div>
                <div>
                    <img height={300} width={400} src="images/carousel4.jpg" alt="" />
                </div>
            </Carousel>
            <div className="mainContainer">
                <h3>{venue?.name}</h3>
                <a href=""className="viewInMap">View in map</a>
                <div style={{ marginTop:'36px'}}>
                    <h5>Available Activities</h5>
                    <div className="flexHorDiv" style={{justifyContent:'flex-start', gap:'24px'}}>
                        <div className="flexVertDiv">
                        <img
                            src="images\football.png"
                            alt="football"
                        />
                        Football
                        </div>
                        <div className="flexVertDiv">
                        <img
                            src="images\cricket.png"
                            alt="cricket"
                        />
                        Box Cricket
                        </div>
                    </div>
                </div>
                <div style={{ marginTop:'36px'}}>
                    <h5>Ameneties at the venue</h5>
                    <div className="flexHorDiv" style={{justifyContent:'flex-start', alignItems:'flex-start', gap:'96px'}}>
                        <div className="flexVertDiv">
                            <div>Parking</div>
                            <div>Parking</div>
                            <div>Parking</div>
                        </div>
                        <div className="flexVertDiv">
                        <div>Parking</div>
                        <div>Parking</div>
                        <div>Parking</div>
                        <div>Parking</div>
                        
                        </div>
                    </div>
                </div>
                <div style={{ marginTop:'36px'}}>
                    <h5>Google Reviews</h5>
                    <GoogleReview name={"sainath arjun"} review={"lorem ipsum lorem ipsum lorem ipsum lorem ipsum"} rating={5}/>
                </div>
                <Link
                    to="/bookingPreference"
                    state={{
                        locality: venue.name,
                        venue_id: venue._id,
                        discount: 0,
                    }}
                    >
                <button style={{marginTop:'12px'}} className="btn btn-primary">Book a slot</button>
                </Link>
            </div>

      
    </div>
  );
}

export default VenuePage;
