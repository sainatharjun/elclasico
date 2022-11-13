import './Login.css';
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react'

function Login() {
     /* eslint-disable */
     var userObj;
     let register=async()=>{
        let phone=$('#phone').val();
        await fetch('https://elclasico-test.herokuapp.com/auth/register',{
            headers: {
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:JSON.stringify({"email":userObj.email,"name":userObj.name,"phoneNumber":phone})
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
    $('#phone').on('keyup',function (event) {
        console.log((document.getElementById('phone').value.match(phoneno)))
        var keycode = event.keycode;
        if (!(document.getElementById('phone').value.match(phoneno))||$('#phone').val().length==10) {
            event.preventDefault();
        }
    });
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
        <div id='signInDiv' style={{margin:'0 auto'}}></div>




        <div className='modalContainer'>
            <div className='modal'>
                <center>
                    Please enter your phone phone number:
                    <input id="phone" type="text" className='form-control' />
                </center>
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