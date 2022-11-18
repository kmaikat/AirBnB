import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteASpotThunk, getSpotByIdThunk } from "../../store/spotReducer";
import './SpotShow.css'
import { Link } from "react-router-dom";
import ReviewIndex from "../Reviews/ReviewIndex";

export default function SpotShow() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const spot = useSelector(state => state.spot.oneSpot);

    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
    }, [dispatch])

    const handleDelete = async () => {
        const deleteResponse = await dispatch(deleteASpotThunk(spotId))
        if (deleteResponse.ok) {
            history.push("/")
        } else {
            setErrors([deleteResponse.message])
        }
        // useEffect for errors for a form
        // for errors from a button click, create error state and set errors to returned errors
    }

    if (!spot) return null
    return (
        <div>
            <div className="spot-header">
                <div className="spot-header-name">
                    {spot.name}
                </div>
                <div className="spot-header-reviews">
                    <div>
                        <i className="fa-solid fa-star"></i>
                        {Math.round(spot.avgStarRating)} · {spot.numReviews} Reviews
                    </div>
                    <div>
                        {spot.city}, {spot.state}, {spot.country}
                    </div>
                </div>
            </div>
            <div className="spot-images">
                <div>
                    <img src={`${spot.SpotImages[0]?.url}`} className="main-preview"></img>
                </div>
                <div>
                    {spot.SpotImages.slice(1).map(image => {
                        <div>
                            <img src={`${image.url}`}></img>
                        </div>
                    })}
                </div>

            </div>
            <div className="spot-details">

                <div>
                    <div>
                        {spot.description}

                    </div>
                    <div>
                        <div>${spot.price} night</div>
                        <div>
                            <i className="fa-solid fa-star"></i>
                            {Math.round(spot.avgStarRating)} · {spot.numReviews} Reviews
                        </div>

                    </div>

                </div>
                <div>
                    <button ><Link to={`/spot/${spotId}/edit`}>Edit</Link></button>
                </div>
                <div>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                <div>
                    <ReviewIndex spot={spot} />
                </div>
            </div>
        </div>
    );
}
