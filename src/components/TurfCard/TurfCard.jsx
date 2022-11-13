import "./TurfCard.css";

function TurfCard(props) {
  const getBookNowCtaText = (discount, price) => {
    if (discount) return `Book now with ₹ ${price} off`;
    return "Book Now";
  };

  return (
    <div>
      <div className="turfCardContent">
        <img
          className="turfCardLogo"
          src="images\el_classico_logo.png"
          alt=""
        />
        <div className="rhs">
          <h5>{props.location}</h5>
          <div className="price">
            <img src="images\rupee.svg" alt="rupee" />
            <p>
              {props.price}
            </p>
          </div>
        </div>
      </div>
      <div className="container2">
        <div className="clockContainer">
          <img src="images\clock 1.svg" alt="clock" />
          <p>
            {props.startTime} - {props.endTime}
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
