import "./BookingPreference.css";
import "date-carousel/date-carousel.js";
import { useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import { useEffect } from "react";
import moment from "moment";

function BookingPreference(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const locality = location.state.locality;
  const venue_id = location.state.venue_id;
  const discount = location.state.discount;
  const today = new Date();
  const [dates, setDates] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [date, setDate] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDay() + 1);
  const [count, setCount] = useState(0);
  const [timeSlot, setTimeSlot] = useState([]);
  const [price, setPrice] = useState(0);
  const year = today.getFullYear();
  const momentToday = moment(today);
  let nowHour = today.getHours();

  const dlist = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thurs",
    "Fri",
    "Sat"
  ]
  const mlist = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateHandler = function (e) {
    $(".dates").removeClass("active");
    $(e.target.closest(".dates")).addClass("active");
    setDate(e.target.closest(".dates").dataset.date);
    setMonth(e.target.closest(".dates").dataset.month);
    setDay(e.target.closest(".dates").dataset.day);
    setCount(e.target.closest(".dates").dataset.count);
  };

  const sportStateFun = (sportState) => {
    if (sport == 'cricket') {
      setSport('football');
      $('.sportButton').removeClass('active');
      $('.SBfootball').addClass('active')
    }
    else {
      setSport('cricket')
      $('.sportButton').removeClass('active');
      $('.SBcricket').addClass('active')
    }
  }
  const [sport, setSport] = useState('football');
  let handleOpenModal = () => {
    if (timeSlot != '')
      $('.modalContainer').css('display', 'block');
  }

  let handleCloseModal = () => {
    $('.modalContainer').hide();
  }
  let compareSlot = (a, b) => {
    return parseInt(a.startTime) - parseInt(b.startTime);
  }
  let handleTimeslot = (e) => {
    if (document.getElementsByClassName('picked').length > 0) {
      var pickedLen = document.getElementsByClassName('picked').length - 1;
      var lastIndex = parseInt(document.getElementsByClassName('picked')[pickedLen].dataset.index);
      var firsIndex = parseInt(document.getElementsByClassName('picked')[0].dataset.index)
      var currentIndex = parseInt(e.target.closest('.slotBtn').dataset.index);
    }
    else {
      var lastIndex = 0;
      var firstIndex = 0;
      var currentIndex = 0;
    }
    if (!$(e.target.closest('.slotBtn')).hasClass('picked')) {
      if (currentIndex == lastIndex + 1 || currentIndex == firsIndex - 1 || document.getElementsByClassName('picked').length == 0) {
        let tempSlot = timeSlot;
        $(e.target.closest('.slotBtn')).addClass('picked');
        setPrice(price + parseInt(e.target.closest('.slotBtn').dataset.price));
        tempSlot.push({
          "startTime": e.target.closest('.slotBtn').dataset.value,
          "weekDayCode": day,
          "duration": 60
        });
        tempSlot.sort(compareSlot)
        setTimeSlot(tempSlot);
      }
    }
    else {
      if (currentIndex == lastIndex || currentIndex == firsIndex || document.getElementsByClassName('picked').length == 1) {
        $(e.target).closest('.slotBtn').removeClass('picked')
        setPrice(price - parseInt(e.target.closest('.slotBtn').dataset.price));
        let temp = timeSlot;
        temp.forEach((t, i) => {
          if (t.startTime == e.target.closest('.slotBtn').dataset.value) {
            temp.splice(i, 1)
          }
        })
        setTimeSlot(temp);
      }
    }
    $('#slotPreview').html(`
    ${timeSlot.length > 0 ? tConvert(timeSlot[0].startTime) : ''} -${" "}
    ${timeSlot.length > 0 ? timeSlot[timeSlot.length - 1].startTime != "" ? tConvert(((parseInt(timeSlot[timeSlot.length - 1].startTime) + 1 < 10 ? '0' : '') + (parseInt(timeSlot[timeSlot.length - 1].startTime) + 1) + ":00") == "24:00" ? "00:00" : ((parseInt(timeSlot[timeSlot.length - 1].startTime) + 1 < 10 ? '0' : '') + (parseInt(timeSlot[timeSlot.length - 1].startTime) + 1) + ":00")) : '' : ''}
            
    `)
  }
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [slots, setSlots] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount

  useEffect(() => {
    fetch("https://elcasico-backend.onrender.com/slots?venueId=" + venue_id + "&weekDayCode=*")
      .then(res => res.json())
      .then(
        (result) => {
          setTimeout(() => {
            $('.dates:first-child').addClass('active')
          }, 100);
          setIsLoaded(true);
          setSlots(result.data);
        },
        //Note: it's important to handle errors here
        // instead of a catch() block so thatwe don't wallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
          setIsLoaded(true);
          setError(error);
        }
      )
    let i = 7;
    let d = 0;
    let j = 1;
    let nowDate = today.getDate()
    let nowMonth = today.getMonth() + 1;
    let lastDay;
    let dates = []
    let temp;
    setDates([])
    if ((nowMonth <= 7 && nowMonth % 2 != 0) || (nowMonth >= 8 && nowMonth % 2 == 0))
      lastDay = 31;
    else
      lastDay = 30;
    if (nowMonth == 2) {
      lastDay = 28;
    }
    let flag = 0;
    while (i > 0) {
      if (nowDate + d > lastDay && flag == 0) {
        d = 0;
        nowDate = 1;
        nowMonth++;
        flag = 1;
      }
      temp = momentToday.add(1, 'day').day();
      temp = temp ? temp : 7;
      dates.push({ date: nowDate + d, month: nowMonth, day: temp })

      d++;
      i--;
      j++;
    }
    setDates(dates);
  }, [])



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
  const confirmBooking = async function () {
    $('.confirm-btn').attr('disabled', true)
    let user = JSON.parse(sessionStorage['user']);
    let tempDate = today;
    tempDate.setDate(date);
    tempDate.setMonth(month - 1);
    tempDate.setFullYear(year);
    tempDate.setMinutes(0);
    tempDate.setHours(0);
    tempDate.setSeconds(0);
    tempDate.setMinutes(tempDate.getMinutes() + 330);
    await fetch("https://elcasico-backend.onrender.com/bookings/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(
        {
          name: user.name,
          venueName: locality,
          phoneNumber: user.phoneNumber,
          amount: price,
          voucherName: null,
          discountAmount: discount,
          venue: venue_id,
          bookingDate: tempDate.toISOString(),
          user: user._id,
          slots: timeSlot
        }
      )
    }).then(res => res.json()).then(res => {
      $('.confirm-btn').attr('disabled', false)
      sessionStorage['bookingData'] = JSON.stringify({ 'locality': locality, 'date': date, 'month': mlist[month - 1], 'slot': timeSlot })
      if (res.is_success) {
        navigate("/success");
        // $('#successLink').trigger('click');
      }
      else {
        navigate("/failure")
        // $('#failureLink').trigger('click');
      }
    })
    .catch(err=>{
      navigate("/failure");
    });
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <lottie-player src="images/Loader.json" background="transparent" speed="1" style={{ width: '300px', height: '100%' }} loop autoplay></lottie-player>
  } else {
    return (

      <div id="BookingPreference" className='stripScreen'>
        <Link to="/">
          <img
            src="images/left-arrow.svg"
            style={{ height: "20px", marginBottom: "20px" }}
            alt=""
            srcset=""
          />
        </Link>
        <h4 className="BPHeader">{locality}</h4>
        <h5 className="fadedText">Select Sport</h5>
        <div className="sportButtonDiv">
          <button
            onClick={sportStateFun}
            className="sportButton active SBfootball"
          >
            <img src="images/football.png" alt="football" />
            <span style={{ marginLeft: 10 }}>Football</span>
          </button>
          <button onClick={sportStateFun} className="sportButton SBcricket">
            <img src="images/cricket.png" alt="cricket" />
            <span style={{ marginLeft: 10 }}>Box Cricket</span>
          </button>
        </div>
        <h5 className="fadedText">Select Date</h5>
        <div className="calendar">
          <div id="bookingDate">
            {dates.map((d, i) => (
              <div
                onClick={(event) => {
                  dateHandler(event);
                }}
                id={d.day}
                data-date={d.date}
                data-day={d.day}
                data-month={d.month}
                data-count={i}
                className="dates"
              >
                <p>{mlist[d.month - 1]}</p>
                {d.date}
                <p style={{fontWeight:300}}>
                {dlist[d.day - 1]}
                </p>
              </div>
            ))}
          </div>
        </div>
        <h5 className="fadedText">Select Time Slot</h5>
        <div id="timeSlots">
          {
            slots[count].slots.map(s => (
              day == today.getDay() + 1 ? parseInt(s.id) > nowHour ? <div className='slotBtn' onClick={(event) => handleTimeslot(event)} data-index={s.id} data-value={s.time} data-price={s.cost}>{tConvert(s.time)} - {tConvert(((parseInt(s.time) + 1 < 10 ? '0' : '') + (parseInt(s.time) + 1) + ":00") == "24:00" ? "00:00" : ((parseInt(s.time) + 1 < 10 ? '0' : '') + (parseInt(s.time) + 1) + ":00"))}</div> : null :
                <div className='slotBtn' onClick={(event) => handleTimeslot(event)} data-index={s.id} data-value={s.time} data-price={s.cost}>{tConvert(s.time)} - {tConvert(((parseInt(s.time) + 1 < 10 ? '0' : '') + (parseInt(s.time) + 1) + ":00") == "24:00" ? "00:00" : ((parseInt(s.time) + 1 < 10 ? '0' : '') + (parseInt(s.time) + 1) + ":00"))}</div>
            ))
          }
        </div>
        <div className='priceDiv'>
          <h4>Price Details</h4>
          <div className='row'>
            <div className='col col_left'>
              <p className='fadedText'>
                Slot Cost
              </p>
            </div>
            <div className='col col_right'>
              <p className='fadedText'>
                Rs.{price}
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col col_left'>
              <p className='fadedText'>
                Discount
              </p>
            </div>
            <div className='col col_right'>
              <p className='fadedText'>
                Rs.{discount}
              </p>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col col_left'>
              <p className='fadedText'>
                Total
              </p>
            </div>
            <div className='col col_right'>
              <p className='fadedText'>
                Rs.{price - discount}
              </p>
            </div>
          </div>
        </div>
        <p style={{color:'red'}}>
          *The above cost needs to be paid at the venue
        </p>
        <div className="confirmButtonContainer">
        <button
          style={{
            width:'max-content'
          }}
          onClick={() => {
            handleOpenModal();
          }}
          className="btn btn-primary"
        >
          
            Confirm Booking
        </button>
        </div>
        <div className="modalContainer">
          <div className="modal">
            <b>Are you sure you wan't to book this slot?</b>
            <br />
            Slot Details
            <br />
            <table style={{ width: "100%" }}>
              <tr>
                <td>Venue</td>
                <td>{locality}</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>
                  {date} {mlist[month - 1]}
                </td>
              </tr>
              <tr>
                <td>Slot</td>
                <td>
                  {timeSlot.length > 0 ? tConvert(timeSlot[0].startTime) : ''} -{" "}
                  {timeSlot.length > 0 ? timeSlot[timeSlot.length - 1].startTime != "" ? tConvert(((parseInt(timeSlot[timeSlot.length - 1].startTime) + 1 < 10 ? '0' : '') + (parseInt(timeSlot[timeSlot.length - 1].startTime) + 1) + ":00") == "24:00" ? "00:00" : ((parseInt(timeSlot[timeSlot.length - 1].startTime) + 1 < 10 ? '0' : '') + (parseInt(timeSlot[timeSlot.length - 1].startTime) + 1) + ":00")) : '' : ''}
                </td>
              </tr>
            </table>
            <div style={{ float: "right", marginTop: "15px" }}>
              <button
                className="btn btn-danger"
                onClick={() => handleCloseModal()}
              >
                Cancel
              </button>
              &nbsp;
              {/* <Link to="/success" state={{'locality':locality,'date':date, 'month':mlist[month-1],'slot':timeSlot}}> */}
              <button
                onClick={() => {
                  confirmBooking();
                }}
                className="btn confirm-btn btn-primary"
              >
                Yes, Confirm
              </button>
              {/* </Link> */}
              <Link
                style={{ display: "none!important" }}
                id="successLink"
                to="/success"
                state={{
                  locality: locality,
                  date: date,
                  month: mlist[month - 1],
                  slot: timeSlot,
                }}
              ></Link>
              <Link
                style={{ display: "none!important" }}
                id="failureLink"
                to="/failure"
                state={{
                  locality: locality,
                  date: date,
                  month: mlist[month - 1],
                  slot: timeSlot,
                }}
              ></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingPreference;
