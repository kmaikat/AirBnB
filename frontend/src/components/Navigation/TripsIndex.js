import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getBookingsThunk } from "../../store/booking";

const TripsIndex = () => {
    const bookings = useSelector(state => state.bookings.Bookings);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookingsThunk())
    }, [dispatch])

    return (
        <div>
            <div className="trips-header">Trips</div>
            <div>
                {bookings? bookings.map(booking => (<div key={booking.id}>{booking.spotId}</div>)) : "none"}
            </div>
        </div>
    )
}

export default TripsIndex;
