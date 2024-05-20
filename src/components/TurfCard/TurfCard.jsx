import "./TurfCard.css";
import OwlCarousel from "react-owl-carousel";

function TurfCard(props) {
  const getBookNowCtaText = (discount, price) => {
    if (discount) return `Book now with ₹ ${price} off`;
    return "Book Now";
  };

  return (
    <div>
      <img className="turfImage" src="https://elclasicoturf.in/images_be/DSC_0365.jpg" height={200} width={'100%'}/>
      <div className="turfCardContent">
        {/* <img
          className="turfCardLogo"
          src="images\el_classico_logo.png"
          alt=""
        /> */}
        <div className="rhs">
          <h5>{props.location}</h5>
          <div className="clockContainer">
          <img src="images\clock 1.svg" alt="clock" />
          <p>
            {props.startTime} {props.startTime !== '24x7' && '-'} {props.endTime}
          </p>
        </div>
        </div>
      </div>
      <div className="container2">
        <div className="price">
            <p style={{margin:0}}>
            <img src="images\rupee.svg" style={{marginBottom:'4px', marginRight:'4px'}} alt="rupee" />
              {props.price}
            </p>
          </div>
        <div className="sportContainer">
          <img
            className="activityImageStyle"
            src="images\football.png"
            alt="football"
          />
          <img src="images\cricket.png" alt="football" />
        </div>
      </div>

      <div style={{ display: props.discount }} className="discountContainer">
        <div className="discount"> {getBookNowCtaText(props.discount,props.discountPrice)}</div>
      </div>
    </div>
  );
}

export default TurfCard;
