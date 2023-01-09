import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteReviewThunk, editReviewThunk } from "../../store/review"
import { useHistory, useLocation, useParams } from "react-router-dom"



function formValidator(stars, feedback) {
    const errors = []

    if (stars < 0 || stars > 5) errors.push("Please select one of the valid options")
    if (!feedback) errors.push("Please provide some feedback")
    else if (feedback.length > 255) errors.push("Please keep your review under 255 characters")

    return errors;
}

export default function EditReviewForm() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const location = useLocation();
    const userReview = location.userReview ?? {};

    const [stars, setStars] = useState(userReview.stars);
    const [feedback, setFeedback] = useState(userReview.review);
    const [errors, setErrors] = useState([]);

    if (!userReview.stars) return history.push(`/spots/${2}`)
    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = formValidator(stars, feedback)

        if (errors.length > 0) {
            setErrors(errors)
            return
        }
        // try {
        await dispatch(editReviewThunk(userReview.id, {
            review: feedback,
            stars: stars
        }))

        // } catch (errors) {
        //     console.log("here")
        //     // const data = await errors.json();
        //     // setErrors(data.errors);
        //     return;

        // }

        history.push(`/spots/${spotId}`)

    }

    const handleDelete = async () => {
        const deleteResponse = await dispatch(deleteReviewThunk(userReview.id))
        if (deleteResponse.message === "Successfully deleted") {
            history.push(`/spots/${spotId}`)
        } else {
            setErrors(["Review couldn't be found"])
        }
    }

    return (
        <div className="spots-form">
            <div className="loginsignup-form" id="edit-review-form">
                <div className="signuplogin-form-header">
                    <div className="signuplogin-form-title">
                        <h2>Tell us about your experience</h2>
                    </div>
                </div>
            <form onSubmit={onSubmit}>
                <ul>{errors.map(error => (<li key={error}>{error}</li>))}</ul>
                <div>
                    <select
                        onChange={e => setStars(e.target.value)}
                        value={stars}
                        className="form-first-input"
                            id="create-review-select"
                    >
                        <option value="" disabled>--Please choose an option--</option>
                        <option value={1}>1 - terrible</option>
                        <option value={2}>2 - could have been better</option>
                        <option value={3}>3 - it was okay</option>
                        <option value={4}>4 - good</option>
                        <option value={5}>5 - amazing!</option>
                    </select>
                </div>
                <div>
                    <textarea id="create-review-text-area" className="form-last-input" value={feedback} onChange={event => setFeedback(event.target.value)} placeholder="I loved it here .." />
                </div>
                <div>
                    <button id='edit-delete' onClick={handleDelete} className="submit">Delete this review</button>
                </div>
                <div>
                    <button id='edit-submit' type="submit" className="submit">Submit</button>
                </div>
            </form>
        </div>
        </div>
    )
}
