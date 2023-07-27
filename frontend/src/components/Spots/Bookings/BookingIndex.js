import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deleteASpotThunk } from "../../../store/spotReducer"
import "./BookingIndex.css"
import { useState } from "react"
import Calendar from "./Calendar"

const BookingIndex = ({ spot, user, setErrors, spotId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    const [showCalendar, setShowCalendar] = useState(false)

    const handleDelete = async () => {
        const deleteResponse = await dispatch(deleteASpotThunk(spotId))
        if (deleteResponse.ok) {
            history.push("/")
        } else {
            setErrors([deleteResponse.message])
        }
    }

    const handleCalendar = () => {
        setShowCalendar(true)
    }

    const daysBetween = (Date.parse(toValue) - Date.parse(fromValue)) / (1000 * 3600 * 24 ) || 1
    const priceByDays = spot.price * daysBetween;
    const serviceFee = spot.price * .75;

    const handleBooking = () => {
        console.log("leeedle leedle lee")
    }


    return (
        <div className="spot-details-right">
            <div className="spot-details-right-container">
                <div className="spot-details-right-top">
                    <div className="spot-details-right-price"> <span id="right-spot-price">${spot.price}</span> night</div>
                    <div className="spot-details-right-reviews">
                        {spot.numReviews > 0 && <>
                            <div>
                                <i className="fa-solid fa-star"></i>

                                {Number(spot.avgStarRating).toFixed(2) || "New"}
                            </div>
                            <div>
                                {spot.numReviews > 0 && <>{spot.numReviews} Reviews</>}
                            </div>
                        </>
                        }
                    </div>
                </div>
                {user && user.id === spot.Owner.id ?
                    <div className="spot-details-right-bottom">

                        <Link to={`/spot/${spotId}/edit`} className="submit" id="spot-edit"> <button>Edit</button></Link>

                        <button className="submit" id="spot-delete" onClick={handleDelete}>Delete</button>

                    </div> :
                    <div>
                        <div className="booking-calendar-container">
                            <div className="booking-calendar-dates-container" onClick={handleCalendar}>
                                <div className="booking-calendar-dates-content">
                                    <div>CHECK-IN</div>
                                    <div>{fromValue ? fromValue : 'Add date'}</div>
                                </div>
                                <div className="booking-calendar-dates-content">
                                    <div>CHECKOUT</div>
                                    <div>{toValue ? toValue : 'Add date'}</div>
                                </div>
                            </div>
                            <div className="booking-guest-data-container">
                                <div className="booking-guest-data">
                                    <div>GUESTS</div>
                                    <div>16 guests</div>
                                    <div className="booking-guest-carat">
                                        <i className="fa-solid fa-angle-down"></i>
                                    </div>
                                </div>
                            </div>
                            {showCalendar &&
                                <div className="calendar-container" >
                                    <Calendar fromValue={fromValue} setFromValue={setFromValue} toValue={toValue} setToValue={setToValue} setShowCalendar={setShowCalendar} />
                                </div>
                            }
                        </div>
                        <div className="reserve-container">
                            <button onClick={handleBooking} className="reserve-button">Reserve</button>
                            <div>You won't be charged yet</div>
                        </div>
                        <div className="math-container">
                            <div>
                                <p>{spot.price} x {daysBetween} nights</p>
                                <p>${priceByDays}</p>
                            </div>
                            <div>
                                <p>Airbnb sevice fee</p>
                                <p>${serviceFee}</p>
                            </div>
                            <div className="math-total">
                                <p>Total before taxes</p>
                                <p>${priceByDays + serviceFee}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default BookingIndex
