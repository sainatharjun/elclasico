import Admincard from "./Admincard";
import "./admin.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import $ from 'jquery';
import moment from 'moment';

function AllBookings() {
    const openModal = () => {
        $('.modalContainer').show();
    }
    const today = new Date();
    const mlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [dates, setDates] = useState([]);
    const handleCloseModal=()=>{
        $('.modalContainer').hide();
    }
    const momentToday=moment(today);
    const dateHandler=(e)=>{
        alert('ok')
    }
    useEffect(() => {
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
    return (
        <div style={{ height: '100%' }} className="stripScreen">
            <h3 className="adminDate">24th June, Monday</h3>
            <div onClick={() => { openModal() }} className="adminCalendar">
                <img src="../images/calendar.svg" alt="" />
            </div>
            <Admincard></Admincard>

            <div className='modalContainer'>
                <div className='modal'>
                    <h5>Pick a date to view bookings</h5>
                    <br />
                    <div id='bookingDate'>
                        {
                            dates.map(d => (
                                <div onClick={(event) => { dateHandler(event) }} id={d.day} data-date={d.date} data-day={d.day} data-month={d.month} className='dates'>{d.date}<h5>{mlist[d.month - 1]}</h5></div>
                            ))
                        }
                    </div>
                    <div style={{ float: 'right', marginTop: '15px' }}>
                        <button className='btn btn-danger' onClick={() => handleCloseModal()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllBookings;