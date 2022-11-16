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

    // if () return null

    return (
        <div>
            <div className="spotCardHeader">
                title here
                <div className="spotCardTitle">
                    {spot.address}
                </div>
                <div className="spotCardOverview">
                    <div>
                        <i className="fa-solid fa-star"></i>
                        {Math.round(spot.avgStarRating)} · {spot.numReviews} Reviews
                    </div>
                    <div>
                        {spot.city}, {spot.state}
                    </div>
                </div>
            </div>
            <div>
                pics
            </div>
            <div>
                info
            </div>
        </div>
    );
}
