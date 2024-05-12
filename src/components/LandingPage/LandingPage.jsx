import TurfCard from "../TurfCard/TurfCard";
import "./LandingPage.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function LandingPage(props) {
  var user=JSON.parse(sessionStorage['user'])
  var name = user.name;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [venues, setVenues] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://elcasico-backend.onrender.com/venues")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.data[0]._id);
          setIsLoaded(true);
          setVenues(result.data);
          console.log(result.data)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so thatwe don't wallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <lottie-player
        src="images/Loader.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "100%" }}
        loop
        autoplay
      ></lottie-player>
    );
  } else {
    return (
      <div id="LandingPage" className="">
        <div className="greeting">
          <h2>
            Hey <span className="userName">{name&&name.includes(' ')?name.split(' ',1)[0]:name + "!"}</span>
          </h2>
          <h6 className="subTitleText">Let's kickoff</h6>
        </div>
        <div className="banner">
          <OwlCarousel
            className="owl-theme"
            items={1}
            stagePadding={200}
            center
            autoplay
            autoplayTimeout={3000}
            mouseDrag
            touchDrag
            dots={false}
            loop
            margin={10}
          >
            <div class="item">
              <img src="images/carousel1.jpg" alt="" />
            </div>
            <div class="item">
              <img src="images/carousel2.jpg" alt="" />
            </div>
            <div class="item">
              <img src="images/carousel3.jpg" alt="" />
            </div>
            <div class="item">
              <img src="images/carousel4.jpg" alt="" />
            </div>
          </OwlCarousel>
        </div>
        <div className="turfCardContainer">
          {venues.map((venue) => (
            <Link
              className="TurfCard"
              to="/venue"
              state={{
                locality: venue.name,
                venue_id: venue._id,
                venue:venue,
                discount: 0,
              }}
            >
              <TurfCard
                venue_images={venue.imageUrls}
                venue_id={venue._id}
                location={venue.name}
                startTime={venue.startTime}
                endTime={venue.endTime}
                price={venue.avgCost}
                discount="none"
                discountPrice="0"
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default LandingPage;
