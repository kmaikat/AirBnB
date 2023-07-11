import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteASpotThunk, getSpotByIdThunk } from "../../store/spotReducer";
import './SpotShow.css'
import { Link } from "react-router-dom";
import ReviewIndex from "../Reviews/ReviewIndex";
import BookingIndex from "./Bookings/BookingIndex";

export default function SpotShow() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const spot = useSelector(state => state.spot.oneSpot);
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
    }, [dispatch])

    // const handleDelete = async () => {
    //     const deleteResponse = await dispatch(deleteASpotThunk(spotId))
    //     if (deleteResponse.ok) {
    //         history.push("/")
    //     } else {
    //         setErrors([deleteResponse.message])
    //     }
    //     // useEffect for errors for a form
    //     // for errors from a button click, create error state and set errors to returned errors
    // }


    if (!spot) return null

    for (let index = 1; index < 5; index++) {
        spot.SpotImages[index] ??= { url: "https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg" }
    }

    return (
        <div className="spot-outer-container">
            <div className="spot-header">
                <div className="spot-header-name">
                    {spot.name}
                </div>
                <div className="spot-header-reviews">
                    <div className="spot-header-rating-reviews">
                        <div>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="spot-header-review-text">
                            {Math.round(spot.avgStarRating) || "New"} · {spot.numReviews} Reviews
                        </div>
                    </div>
                    <div className="spot-header-spacer">.</div>
                    <div className="spot-header-location">
                        {spot.city}, {spot.state}, {spot.country}
                    </div>
                </div>
            </div>
            <div className="spot-images">
                <div className="spot-main-image">
                    <img src={`${spot.SpotImages[0]?.url}`} className="main-preview"></img>
                </div>
                <div className="spot-small-images">
                    {spot.SpotImages.slice(1).map(image => {
                        return <div className="small-image-container">
                            <img src={`${image.url}`}></img>
                        </div>
                    })}
                </div>

            </div>
            <div className="spot-details">
                <div className="spot-details-left">
                    <div className="spot-hosted-by">
                        <div>
                            <div>Entire home hosted by {spot.Owner.firstName}</div>
                            <div className="spot-rooms-guests">16 guests 5 bedrooms 10 beds 3 baths</div>
                        </div>
                    </div>
                    <div className="aircover-container">
                        <div className="air-cover-title">
                            <span className="air-cover-air">air</span>cover
                        </div>
                        <div className="air-cover-description">
                            Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                        </div>
                    </div>

                    <div className="spot-description">
                        {spot.description}
                    </div>

                </div>
                <BookingIndex spotId={spotId} setErrors-={setErrors} user={user} spot={spot}/>
            </div>
            <div className="reviews-container">
                <ReviewIndex spot={spot} />
            </div>
        </div >
    );
}
