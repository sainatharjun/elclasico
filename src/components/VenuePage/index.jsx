import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./venuePage.css"
import { Link, useLocation } from "react-router-dom";
import GoogleReview from "./GoogleReview";
function VenuePage(props) {
  const location = useLocation();
  const venue = location.state.venue;
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
             <div>
             <h3>{venue?.name}</h3>
                <a href={venue?.mapUrl} className="viewInMap">View in map <img src="images/linkOpen.svg"/></a>
             </div>
                <div className="activityContainer">
                    <h5>Available Activities</h5>
                    <div className="flexHorDiv" style={{justifyContent:'flex-start', gap:'24px'}}>
                        <div className="activity">
                        <img
                            src="images\football.png"
                            alt="football"
                        />
                        Football
                        </div>
                        <div className="activity">
                        <img
                            src="images\cricket.png"
                            alt="cricket"
                        />
                        Box Cricket
                        </div>
                    </div>
                </div>
                <div className="pillConatiner">
                    <h5>Ameneties at the venue</h5>
                    <div className="pillsWrapConatiner">
                   
                        <div className="amenitiesLi"><img src={"images/amenities-tick.svg"} width={18}/>Parking</div>
                        <div className="amenitiesLi"><img src={"images/amenities-tick.svg"} width={18}/>Changing Room</div>
                        <div className="amenitiesLi"><img src={"images/amenities-tick.svg"} width={18}/>Washroom</div>
                        <div className="amenitiesLi"><img src={"images/amenities-tick.svg"} width={18}/>Drinking Water</div>
                        {/* <div className="flexVertDiv">
                        <div>Parking</div>
                        <div>Parking</div>
                        <div>Parking</div>
                        <div>Parking</div>
                        
                        </div> */}
                    </div>
                </div>
                {/* <div style={{ marginTop:'36px'}}>
                    <h5>Google Reviews</h5>
                    <GoogleReview name={"sainath arjun"} review={"lorem ipsum lorem ipsum lorem ipsum lorem ipsum"} rating={5}/>
                </div> */}
                <Link
                    to="/bookingPreference"
                    state={{
                        locality: venue.name,
                        venue_id: venue._id,
                        discount: 0,
                    }}
                    >
                <button className="btn btn-primary bookFloatingCta">Book a slot</button>
                </Link>
            </div>

      
    </div>
  );
}

export default VenuePage;
