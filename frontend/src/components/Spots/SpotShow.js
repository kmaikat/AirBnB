import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotById } from "../../store/spotReducer";
import './SpotShow.css'

export default function SpotShow() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spot.oneSpot);

    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch])

    console.log("*********************************", spot)
    // spot not saving?


    return (
        <div>
            <div>
                <div className="spotCardHeader">
                    {/* {spot.address} */}
                </div>
                <div>
                    <div>
                        <i className="fa-solid fa-star"></i>
                        {/* {Math.round(spot.avgStarRating)} · {spot.numReviews} Reviews */}
                    </div>
                    <div>
                        {/* {spot.city}, {spot.state} */}
                    </div>
                </div>
            </div>
            <div>
                pic here
            </div>
            <div>
                info
            </div>
        </div>
    );
}
