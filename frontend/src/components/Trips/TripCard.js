import { Link } from "react-router-dom/cjs/react-router-dom.min"
import {getMonth, getDate, getYear, format} from 'date-fns'
import "./TripCard.css"
const TripCard = ({ booking }) => {
    const bookingMonth = format(new Date(booking.startDate), "MMM")
    const startDay = getDate(new Date(booking.startDate)) + 1
    const endDay = getDate(new Date(booking.endDate)) + 1
    const year = getYear(new Date(booking.startDate))

    console.log(bookingMonth)

    return (
        <Link to={`/spots/${booking.Spot.id}`}>
        <div className="trip-card-container">
            <img src={booking.Spot.previewImage}/>
            <div className="trip-card-header">
                <p>{booking.Spot.city}</p>
                <p>Entire home hosted by {booking.Spot.Owner.firstName}</p>
            </div>
            <div className="trip-card-date-address-container">
                <div>
                    <div>{bookingMonth}</div>
                    <div>{startDay} - {endDay}</div>
                    <div id="trip-card-last-line-style">{year}</div>
                </div>
                <div>
                    <div>{booking.Spot.address}</div>
                    <div>{booking.Spot.city}, {booking.Spot.state}</div>
                    <div id="trip-card-last-line-style">{booking.Spot.country}</div>
                </div>
            </div>
            <div className="trip-card-footer">
                <i className="fa-solid fa-book-open"></i>
                <div>Your check in details: Getting there, getting inside, and wifi</div>
            </div>
        </div>
        </Link>
    )
}

export default TripCard
