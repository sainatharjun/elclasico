import Admincard from "./Admincard";
import "./admin.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import $ from 'jquery';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AllBookings() {
    let handleOpenModal = (obj)=> {
        console.log(obj)
        $('#location').text(obj.location);
        $('#date').text(obj.date);
        $('#st').text(obj.startTime);
        $('#et').text(obj.endTime);
        setC_BookingId(obj.bookingId)
        $('.cancelModalContainer').css('display','block');
        
    }
    let cancelBooking=async()=>{
        // console.log(c_bookingID)
        await fetch("https://elcasico-backend.onrender.com/bookings/cancel",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body:JSON.stringify(
                {bookingId:c_bookingID})
        })
        .then(res => res.json())
        .then((data)=>{console.log(data);window.location.reload()})
        .catch((err)=>console.log(err))
    }
    const [selectedDate, onChange] = useState(new Date());
    const openModal = () => {
        $('.modalContainer').show();
    }
    const handleVenueSelect=()=>{
        setVId($('#venues').val())
    }
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const mlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dlist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [venues, setVenues] = useState();
    const [vId, setVId] = useState('62b6abe01df98c58a3614c41');
    const handleCloseModal = () => {
        $('.modalContainer').hide();
    }
    const c_handleCloseModal = () => {
        $('.cancelModalContainer').hide();
    }
    const [c_bookingID,setC_BookingId]=useState(null)
    const [bookings, setBookings] = useState(null);
    const user = JSON.parse(sessionStorage['user']);
    let reqDate=new Date(new Date(selectedDate).setMinutes(330));
    useEffect(() => {
        fetch("https://elcasico-backend.onrender.com/venues").then((res) => res.json())
            .then((v) => {
                setVenues(v.data);
                console.log(new Date(new Date(selectedDate).setMinutes(330)).toISOString())
                fetch("https://elcasico-backend.onrender.com/venues/getBookings", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(
                        {
                            venueId: vId,
                            date: reqDate.toISOString()

                        }
                    )
                }).then(res => res.json()).then(res => {
                    if (res.is_success) {
                        if (res.data != null)
                            setBookings(res.data.slots);
                        else
                            setBookings(null)
                    };
                    setIsLoaded(true);
                })
            })

    }, [selectedDate, vId])
    if (isLoaded) {
        return (
            <div style={{ height: '100%', justifyContent:'flex-start' }} className="stripScreen">
                <h3 className="adminDate">{selectedDate.getDate()} {mlist[selectedDate.getMonth()]}, {dlist[selectedDate.getDay()]}</h3>
                <div onClick={() => { openModal() }} className="adminCalendar">
                    <img src="../images/calendar.svg" alt="" />
                </div>
                <select style={{ margin: '70px 0 30px' }} className="form-control" name="venues" id="venues" onChange={()=>handleVenueSelect()}>
                    {
                        venues.map((v) => (
                            <option value={v._id}>{v.name}</option>
                        ))
                    }
                </select>
                <div className="adminCardContainer">
                    {/* {console.log(bookings)} */}
                {bookings ? bookings.map((booking) => (
                    <Admincard date={new Date(booking.booking.bookingDate).getDate()+" "+mlist[new Date(booking.booking.bookingDate).getMonth()]} location={booking.booking.venueName} bookingId={booking.booking._id} cancelModal={handleOpenModal} name={booking.user.name} startTime={booking.startTime} endTime={booking.endTime} price={booking.booking.amount - booking.booking.discountAmount} phone={booking.user.phoneNumber} dateObj={new Date(selectedDate)}></Admincard>
                )) : <h3 style={{ margin: '0 auto',textAlign:'center' }}>No bookings on this day</h3>}
                </div>
                <div className='modalContainer'>
                    <div style={{ top: '10%' }} className='modal'>
                        <h5>Pick a date to view bookings</h5>
                        <br />
                        <Calendar onChange={onChange} value={selectedDate} />
                        <div style={{ float: 'right', marginTop: '15px' }}>
                            <button className='btn btn-success' onClick={() => handleCloseModal()}>OK</button>
                        </div>
                    </div>
                </div>
                <div className='cancelModalContainer'>
                    <div className='modal'>
                        <b>Are you sure you want to cancel this slot?</b>
                        <br />
                        Slot Details
                        <br />
                        <table style={{width:'100%'}}>
                            <tr>
                                <td>
                                    Venue
                                </td>
                                <td>
                                    <span id='location'></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Date
                                </td>
                                <td>
                                    <span id='date'></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Slot
                                </td>
                                <td>
                                    <span id='st'></span> - <span id='et'></span>
                                </td>
                            </tr>
                        </table>
                        <br />
                        <p style={{fontWeight:700}}>Are you sure you want to cancel this booking?</p>
                        <div style={{float:'right',marginTop:'15px'}}>
                        <button className='btn btn-primary' onClick={()=>c_handleCloseModal()}>No</button>
                        &nbsp;
                            <button className='btn btn-danger' onClick={()=>cancelBooking(c_bookingID)}>Yes, Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllBookings;