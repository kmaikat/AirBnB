import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deleteASpotThunk } from "../../../store/spotReducer"

const BookingIndex = ({spot, user, setErrors, spotId}) => {
    const dispatch = useDispatch()
    const history = useHistory()

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
                        {user && user.id === spot.Owner.id ? <div className="spot-details-right-bottom">

                            <Link to={`/spot/${spotId}/edit`} className="submit" id="spot-edit"> <button>Edit</button></Link>

                            <button className="submit" id="spot-delete" onClick={handleDelete}>Delete</button>

                        </div> : "hi"}
                    </div>
                </div>
    )
}

export default BookingIndex
