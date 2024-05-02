import "./venuePage.css"
const GoogleReview = ({name, review, rating, img=null})=>{
    return <>
        <div className="flexHorDiv" style={{justifyContent:'flex-start', gap:'16px'}}>
            <div className="reviewImg">
                <img src={img} alt="review profile"></img>
            </div>
            <h6>{name}</h6>
        </div>
        <div className="flexVertDiv">
            {review}
        </div>
    </>
}
export default GoogleReview