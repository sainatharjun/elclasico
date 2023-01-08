import './Login.css';
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react'
import validator from 'validator'

function Login() {
    /* eslint-disable */
    var userObj;
    let register = async () => {
        let name = $('#r_name').val();
        let email = $('#r_email').val();
        let phone = $('#r_phone').val();
        let password = $('#r_password').val();
        let re_enter_password = $('#r_reenterpassword').val();
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert('Incorrect email');
            return;
        }
        if (password.length < 6) {
            alert('Password should be atleast 6 characters long');
            return;
        }
        if (password != re_enter_password) {
            alert('Passwords do not match.');
            return;
        }
        await fetch('https://wild-pink-woodpecker-vest.cyclic.app/auth/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ "email": email, "name": name, "phoneNumber": phone, "password": password })
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage['user'] = JSON.stringify(res.data);
                document.cookie = 'user=' + JSON.stringify(res.data)
                window.location.reload();
            })
            .catch((err) => console.log(err))
    }
    let login = async () => {
        // let name=$('#name').val();
        let email = $('#l_email').val();
        let password = $('#l_password').val();
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert('Incorrect email');
            return;
        }
        if (password.length < 6) {
            alert('Password should be atleast 6 characters long');
            return;
        }
        await fetch('https://wild-pink-woodpecker-vest.cyclic.app/auth/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ "email": email, "password": password })
        })
            .then(res => res.json())
            .then(res => {
                sessionStorage['user'] = JSON.stringify(res.data);
                document.cookie = 'user=' + JSON.stringify(res.data)
                window.location.reload();
            })
            .catch((err) => console.log(err))
    }
    let handleOpenModal = (id) => {
        $('#' + id).css('display', 'block');
    }

    let handleCloseModal = () => {
        $('.modalContainer').hide();
        window.location.reload();
    }
    let handleResponse = async function (res) {
        $('#lottiePlayer').show();
        $('.logo').hide()
        $('.welcome').hide()
        $('.welcomeText').hide()
        $('#signInDiv').hide()

        userObj = jwt_decode(res.credential);
        await fetch('https://wild-pink-woodpecker-vest.cyclic.app/auth/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ "email": userObj.email })
        })
            .then(res => res.json())
            .then(res => {
                if (!res.data) {
                    handleOpenModal();
                }
                else {
                    sessionStorage['user'] = JSON.stringify(res.data);
                    document.cookie = 'user=' + JSON.stringify(res.data)
                    window.location.reload();
                }
            })
            .catch((err) => console.log(err))

    }
    var phoneno = /^(0|[1-9][0-9]*)$/;
    let validatePhoneNumber = (event) => {
        let number = event.key;
        const isValidPhoneNumber = validator.isNumeric(number)
        if (!isValidPhoneNumber || $('#r_phone').val().length == 10)
            event.preventDefault();
    }
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '218984651478-6lcir8b5fgveufh1vm7lup65li6fb6ul.apps.googleusercontent.com',
            callback: handleResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: "Outline", size: "large" }
        );
    }, [])
    return (
        <div id="Login" className="container">
            <lottie-player id="lottiePlayer" src="images/Loader.json" background="transparent" speed="1" style={{ width: '300px', height: '100%', display: 'none' }} loop autoplay></lottie-player>
            <img className='logo' src="images/el_classico_logo.png" alt="Logo" />
            <p className='welcome'>Welcome to <span className='elclasico'>Elclasico</span> </p>
            <p className='welcomeText' style={{ textAlign: 'center' }}>Sign in to make a booking</p>
            <div style={{'display':'flex','flexDirection':'row','width':'200px','justifyContent':'space-between','margin':'0 auto'}}>
                <button className="btn btn-outline-primary" onClick={() => { handleOpenModal('loginModal') }} style={{ margin: '0 auto' }}>
                    Login
                </button>
                <button className="btn btn-primary" onClick={() => { handleOpenModal('registerModal') }} style={{ margin: '0 auto' }}>
                    Sign Up
                </button>
            </div>




            <div id="registerModal" className='modalContainer'>
                <div className='modal'>
                    <div>
                        Name:
                        <input id="r_name" placeholder='Name' type="text" className='form-control' />
                        <br />
                        Email:
                        <input id="r_email" placeholder='Email' type="email" className='form-control' />
                        <br />
                        Phone Number:
                        <input id="r_phone" placeholder='Phone Number' pattern="\d*" onKeyPress={() => { validatePhoneNumber(event) }} type="text" className='form-control' />
                        <br />
                        Password:
                        <input id="r_password" placeholder='Password' type="password" className='form-control' />
                        <br />
                        Re-enter Password:
                        <input id="r_reenterpassword" placeholder='Re-enter Password' type="password" className='form-control' />
                    </div>
                    <div style={{ float: 'right', marginTop: '15px' }}>
                        <button className='btn btn-danger' onClick={() => handleCloseModal()}>Cancel</button>
                        &nbsp;
                        <button onClick={() => { register() }} className='btn btn-primary'>Register</button>
                    </div>
                    <div>
                        <div style={{ float: 'right', fontSize: '14px', marginTop: '15px' }}>
                            By signing up you accept to receive emails from elclasicoturf.in
                        </div>
                    </div>
                </div>
            </div>
            <div id="loginModal" className='modalContainer'>
                <div className='modal'>
                    <div>
                        Email:
                        <input id="l_email" placeholder='Email' type="email" className='form-control' />
                        <br />
                        Password:
                        <input id="l_password" placeholder='Password' type="password" className='form-control' />
                    </div>
                    <div style={{ float: 'right', marginTop: '15px' }}>
                        <button className='btn btn-danger' onClick={() => handleCloseModal()}>Cancel</button>
                        &nbsp;
                        <button onClick={() => { login() }} className='btn btn-primary'>Login</button>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>);

}

export default Login;