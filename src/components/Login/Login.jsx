import './Login.css';
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react'
import validator from 'validator' 

function Login() {
     /* eslint-disable */
     var userObj;
     let register=async()=>{
        let name=$('#name').val();
        let email=$('#email').val();
        let phone=$('#phone').val();
        await fetch('https://elclasico-test.herokuapp.com/auth/register',{
            headers: {
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:JSON.stringify({"email":email,"name":name,"phoneNumber":phone})
        })
        .then(res=>res.json())
        .then(res=>{
            sessionStorage['user']=JSON.stringify(res.data);
            window.location.reload();
        })
        .catch((err)=>console.log(err))
     }
     let handleOpenModal = ()=> {
        $('.modalContainer').css('display','block');
    }
      
    let handleCloseModal = ()=> {
        $('.modalContainer').hide();
        window.location.reload();
    }
    let handleResponse=async function(res){
        $('#lottiePlayer').show();
        $('.logo').hide()
        $('.welcome').hide()
        $('.welcomeText').hide()
        $('#signInDiv').hide()

        userObj=jwt_decode(res.credential);
        await fetch('https://elclasico-test.herokuapp.com/auth/login',{
            headers: {
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:JSON.stringify({"email":userObj.email})
        })
        .then(res=>res.json())
        .then(res=>{
            if(!res.data){
                handleOpenModal();
            }
            else{
                sessionStorage['user']=JSON.stringify(res.data);
                document.cookie='user='+JSON.stringify(res.data)
                window.location.reload();
            }
        })
        .catch((err)=>console.log(err))

    }
    var phoneno = /^(0|[1-9][0-9]*)$/;
    let validatePhoneNumber = (event) => {
        let number=event.key;
        const isValidPhoneNumber = validator.isNumeric(number)
        if(!isValidPhoneNumber || $('#phone').val().length==10)
        event.preventDefault();
       }
      useEffect(()=>{
        google.accounts.id.initialize({
            client_id:'218984651478-6lcir8b5fgveufh1vm7lup65li6fb6ul.apps.googleusercontent.com',
            callback: handleResponse
        });
    
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {theme:"Outline",size:"large"}
        );
    },[])
    return (
    <div id="Login" className="container">
        <lottie-player id="lottiePlayer" src="images/Loader.json" background="transparent" speed="1" style={{ width: '300px', height: '100%' , display:'none'}} loop autoplay></lottie-player>
        <img className='logo' src="images/el_classico_logo.png" alt="Logo" />
        <p className='welcome'>Welcome to <span className='elclasico'>Elclasico</span> </p>
        <p className='welcomeText' style={{textAlign:'center'}}>Sign in to make a booking</p>
        <button className="abcRioButtonLightBlue" onClick={()=>{handleOpenModal()}} style={{margin:'0 auto'}}>
            Sign In
        </button>




        <div className='modalContainer'>
            <div className='modal'>
                <div>
                    Username:
                    <input id="name" placeholder='Username' type="text" className='form-control' />
                    <br />
                    Email:
                    <input id="email" placeholder='Email' type="email" className='form-control' />
                    <br />
                    Phone Number:
                    <input id="phone" placeholder='Phone Number' pattern="\d*" onKeyPress={()=>{validatePhoneNumber(event)}} type="text" className='form-control' />
                </div>
                <div style={{float:'right',marginTop:'15px'}}>
                <button className='btn btn-danger' onClick={()=>handleCloseModal()}>Cancel</button>
                &nbsp;
                    <button onClick={()=>{register()}} className='btn btn-primary'>Register</button>                    
                </div>
                <div>
                <div style={{float:'right',fontSize:'14px',marginTop:'15px'}}>
                By signing up you accept to receive emails from elclasicoturf.in
                </div>
                </div>
            </div>
        </div>
    </div> );
    
}

export default Login;