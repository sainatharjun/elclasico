import BookingCard from './BookingCard';
import { Link } from "react-router-dom";
import $ from 'jquery';
import { useEffect } from 'react';
import { useState } from 'react';



function Bookings() {
    const mlist = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    const dlist = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let [c_bookingID,setC_BookingId]=useState();
    let cancelBooking=async()=>{
        console.log(c_bookingID)
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
    let handleOpenModal = (obj)=> {
        $('#location').text(obj.location);
        $('#date').text(obj.date);
        $('#st').text(obj.startTime);
        $('#et').text(obj.endTime);
        setC_BookingId(obj.bookingId)
        $('.modalContainer').css('display','block');
        
    }
      
    let handleCloseModal = ()=> {
        $('.modalContainer').hide();
    }

    let user=JSON.parse(sessionStorage['user']);
    var [data,setData]=useState();
    let [loaded,setIsLoaded]=useState(false)
    useEffect(()=>{
        fetch("https://elcasico-backend.onrender.com/bookings/userBookings?id="+user._id)
        .then(res => res.json())
        .then(
          (result) => {
            let temp=result.data;
            setData(temp);
            setIsLoaded(true)
          },
          (error) => {
            console.log(error)
          }
        )
    },[])
    if(loaded){
        return (
            <div id="Bookings" style={{justifyContent:'flex-start'}} className="container stripScreen">
            {
                data.length?data.map(el => (
                <BookingCard venuePhone={el.venue.phoneNumber} location={el.venue.name} startTime={el.slots[0].startTime} endTime={(parseInt(el.slots[el.slots.length-1].startTime)>=10?'':'0')+parseInt(parseInt(el.slots[el.slots.length-1].startTime)+1)+":00"} dateObj= {new Date(el.bookingDate)} date={dlist[new Date(el.bookingDate).getDay()]+", "+new Date(el.bookingDate).getDate()+" "+mlist[new Date(el.bookingDate).getMonth()]} price={parseInt(el.amount)-parseInt(el.discountAmount)} bookingId={el._id} cancelModal={handleOpenModal} />
                )):<h4 style={{textAlign:'center'}}>No Bookings made yet</h4>
            }
                <div className='modalContainer'>
                    <div className='modal'>
                        <div className='cancellationHeading'>
                            <b>Booking Cancellation</b>
                            <span className='closeModalSpan'>X</span>
                        </div>
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
                        <div style={{width:'100%',textAlign:'center',marginTop:'15px'}}>
                            <button className='btn btn-primary' onClick={()=>cancelBooking(c_bookingID)}>Yes, Cancel</button>
                        </div>
                    </div>
                </div>
            </div> );
    }
    else{
        return <lottie-player src="images/Loader.json"  background="transparent"  speed="1"  style={{width: '300px', height: '100%'}}  loop autoplay></lottie-player>
    }
    
}

export default Bookings;