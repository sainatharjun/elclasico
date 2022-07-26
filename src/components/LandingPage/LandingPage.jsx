import TurfCard from '../TurfCard/TurfCard';
import './LandingPage.css';

function LandingPage() {
    var name="Arjun";
    return (
    <div id="LandingPage" className="">
        <div className='greeting'>
            <h2>Hello <span className='userName'>{name}</span></h2>
        </div>
        <div className='banner'></div>
        <div className='greeting'>
            <h4>Choose your turf</h4>
        </div>
        <div className='turfCardContainer'>
            <TurfCard location="Selaiyur" startTime="6" endTime="11" startPrice="700" endPrice="800" discount="block" discountPrice="100"/>
            <TurfCard location="Potheri" startTime="6" endTime="11" startPrice="700" endPrice="800" discount="none"/>
            <TurfCard location="Chengalpattu" startTime="6" endTime="11" startPrice="700" endPrice="800" discount="block" discountPrice="100"/>
        </div>
    </div> );
}

export default LandingPage;