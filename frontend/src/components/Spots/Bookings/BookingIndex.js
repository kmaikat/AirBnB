import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deleteASpotThunk } from "../../../store/spotReducer"
import "./BookingIndex.css"
import { useState } from "react"
import Calendar from "./Calendar"

const BookingIndex = ({ spot, user, setErrors, spotId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [showCalendar, setShowCalendar] = useState(false)

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

    const handleCalendar = () => {
        setShowCalendar(true)
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
                                    <div>8/17/2305</div>
                                </div>
                                <div className="booking-calendar-dates-content">
                                    <div>CHECKOUT</div>
                                    <div>8/19/2350</div>
                                </div>
                            </div>
                            {showCalendar &&
                                <div className="calendar-container" >
                                    DANGNABBIT IS THIS THING WORKIGN
                                    <Calendar/>
                                </div>
                            }
                            <div>
                                <div className="booking-guest-data">
                                    <div>Guests</div>
                                    <div>12 guests</div>
                                </div>
                                <div className="booking-guest-carat">
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>

                            </div>
                        </div>
                        {/* <div>
                            <div>reserve</div>
                            <div>you wont be charged yet</div>
                        </div>
                        <div>
                            <div>602 a night</div>
                            <div>cleaning fee</div>
                            <div>service fee</div>
                        </div> */}
                    </div>
                }
            </div>
        </div>
    )
}

export default BookingIndex
