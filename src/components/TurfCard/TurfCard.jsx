import './TurfCard.css';

function TurfCard(props) {
    var name="Arjun";

    return (
    <div>
        <div className='turfCardContent'>
            <img className='turfCardLogo' src="images\el_classico_logo.png" alt="" />
            <div className='lhs'>
                <h6>{props.location}</h6>
                <div className='sportContainer'>
                    <img src="images\football.png" alt="football" />
                    <img src="images\cricket.png" alt="football" />
                </div>
            </div>
            <div className='rhs'>
                <div className='timings'>
                    <img src="images\clock 1.svg" alt="clock" />
                    <p>{props.startTime} AM - {props.endTime} PM</p>
                </div>
                <div className='price'>
                <img src="images\₹.svg" alt="clock" />
                    <p>{props.startPrice} - {props.endPrice}</p>
                </div>
            </div>
        </div>
        <div style={{display:props.discount}} className='discountContainer'>
            <div className='discount'>
                &#8377;{props.discountPrice} Flat Off
            </div>
        </div>
    </div> );
}

export default TurfCard;