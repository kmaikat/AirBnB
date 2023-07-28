import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getBookingsThunk } from "../../store/booking";
import TripCard from "../Trips/TripCard";
import "./TripCard.css"
import "./TripIndex.css"

const TripsIndex = () => {
    const bookings = useSelector(state => state.bookings.Bookings);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookingsThunk())
    }, [dispatch])

    return (
        <div>
            <div className="trips-header">Trips</div>
            <div className="trips-index-container">
                {bookings? <div className="trip-grid">{ bookings.map(booking => (<TripCard booking={booking}/>))} </div> : "none"}
            </div>
        </div>
    )
}

export default TripsIndex;
