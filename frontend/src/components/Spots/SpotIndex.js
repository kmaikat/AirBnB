import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getAllSpots } from "../../store/spotReducer";
import './SpotIndex.css'


export default function SpotsIndex() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spot.Spots))

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if (spots.length === 0) return null;

    return (
        <div className="spotIndex">
        <ul className="spot">
            {spots.map(spot => (
                <NavLink to={`spots/${spot.id}`} className="eachSpot">
                    <div className="previewImage">
                        <img src={`${spot.previewImage}`} alt="spot preview"/>
                    </div>
                    <div className="description">
                        <div>
                            <p>{spot.address}</p>
                            <p>Hosted by</p>
                            <p>${spot.price} night</p>
                            <p></p>
                        </div>
                        <div>
                            <p className="rating"><i className="fa-solid fa-star"></i>{Math.round(spot.avgRating)}</p>
                        </div>
                    </div>
                </NavLink>
            ))}
        </ul>
        </div>
    );
}
