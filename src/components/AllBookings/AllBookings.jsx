import Admincard from "./Admincard";
import "./admin.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import $ from 'jquery';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AllBookings() {
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
    const [bookings, setBookings] = useState(null);
    const user = JSON.parse(sessionStorage['user'])
    useEffect(() => {
        fetch("https://elclasico-test.herokuapp.com/venues").then((res) => res.json())
            .then((v) => {
                setVenues(v.data);
                console.log(vId)
                fetch("https://elclasico-test.herokuapp.com/venues/getBookings", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(
                        {
                            venueId: vId,
                            date: selectedDate,

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
                {bookings ? bookings.map((booking) => (
                    <Admincard name={booking.user.name} startTime={booking.startTime} endTime={booking.endTime} price={booking.booking.amount - booking.booking.discountAmount} phone={booking.user.phoneNumber}></Admincard>
                )) : <h3 style={{ margin: '0 auto',textAlign:'center' }}>No bookings on this day</h3>}
                </div>
                <div className='modalContainer'>
                    <div style={{ top: '10%' }} className='modal'>
                        <h5>Pick a date to view bookings</h5>
                        <br />
                        <Calendar onChange={onChange} value={selectedDate} />
                        <div style={{ float: 'right', marginTop: '15px' }}>
                            <button className='btn btn-danger' onClick={() => handleCloseModal()}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllBookings;