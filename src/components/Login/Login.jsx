import './Login.css';

function Login() {
    return (
    <div id="Login" className="container">
        <img className='logo' src="images/el_classico_logo.png" alt="Logo" />
        <p className='welcome'>Welcome to <span className='elclasico'>Elclasico</span> </p>
        <div className = "g-signin2" data-onsuccess="onSignIn" ></div>
    </div> );
}

export default Login;