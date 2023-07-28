import "./TripCard.css"
const TripCard = ({ booking }) => {
    return (
        <div className="trip-card-container">
            <img src={booking.Spot.previewImage}/>
            <div className="trip-card-header">
                <p>{booking.Spot.city}</p>
                <p>Entire home hosted by {booking.Spot.Owner.firstName}</p>
            </div>
            <div className="trip-card-date-address-container">
                <div>
                    <div>Nov</div>
                    <div>9 - 12</div>
                    <div id="trip-card-last-line-style">2021</div>
                </div>
                <div>
                    <div>{booking.Spot.address}</div>
                    <div>{booking.Spot.city}, {booking.Spot.state}</div>
                    <div id="trip-card-last-line-style">{booking.Spot.country}</div>
                </div>
            </div>
            <div className="trip-card-footer">
                <i class="fa-solid fa-book-open"></i>
                <div>Your check in details: Getting there, getting inside, and wifi</div>
            </div>
        </div>
    )
}

export default TripCard
