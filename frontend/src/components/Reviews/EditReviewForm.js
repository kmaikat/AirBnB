import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteReviewThunk, editReviewThunk } from "../../store/review"
import { useHistory, useLocation, useParams } from "react-router-dom"

export default function EditReviewForm() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const location = useLocation();
    const userReview = location.userReview ?? {};

    const [stars, setStars] = useState(userReview.stars);
    const [feedback, setFeedback] = useState(userReview.review);
    const [errors, setErrors] = useState([]);

    console.log("***************", userReview)
    if (!userReview.stars) return history.push(`/spots/${2}`)
    const onSubmit = async (e) => {
        e.preventDefault();

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
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    Tell us about your experience
                </div>
                <ul>{errors.map(error => (<li key={error}>{error}</li>))}</ul>
                <div>
                    <label>Rate your stay on a scale of 1-5</label>
                    <select
                        onChange={e => setStars(e.target.value)}
                        value={stars}
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
                    <textarea value={feedback} onChange={event => setFeedback(event.target.value)} placeholder="I loved it here .." />
                </div>
                <div>
                    <button onClick={handleDelete}>Delete this review</button>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
