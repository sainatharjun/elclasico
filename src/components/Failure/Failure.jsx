import '../Success/Success.css'
import { useState } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

function Failure(props) {
    return  (
        <div className='stripScreen'>
            <img src="images/wrong-icon.svg" className='confirmIcon' alt="" />
            <h4 className='BPHeader success-header'>Something Went Wrong</h4>
            <div className='finalLinks'>
                <Link to="/">
                <p>Go to Homepage</p>
                </Link>
            </div>
        </div>
    )
}

export default Failure;