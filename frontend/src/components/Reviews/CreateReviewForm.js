import { useState } from "react"
import { useDispatch } from "react-redux"
import { createReviewThunk } from "../../store/review"
import { useHistory, useParams } from "react-router-dom"
export default function CreateReviewForm() {
    const [stars, setStars] = useState('');
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const newSpot = await dispatch(createReviewThunk(spotId, {
                review: feedback,
                stars: stars[0]
            }))

        } catch (errors) {
            const data = await errors.json();
            console.log(data)
            setErrors(data.errors);
            return;

        }

        history.push(`/spots/${spotId}`)

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    Tell us about your experience
                </div>
                <div>
                    <label>Rate your stay on a scale of 1-5</label>
                    <select
                        onChange={e => setStars(e.target.value)}
                        value={stars}
                    >
                        <option value="" disabled>--Please choose an option--</option>
                        <option>1 - terrible</option>
                        <option>2 - could have been better</option>
                        <option>3 - it was okay</option>
                        <option>4 - good</option>
                        <option>5 - amazing!</option>
                    </select>
                </div>
                <div>
                    <textarea value={feedback} onChange={event => setFeedback(event.target.value)} placeholder="I loved it here .." />
                </div>
                < div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
