import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";

export default function ReviewIndex({ spot }) {
    const dispatch = useDispatch();
    const ownerId = spot.ownerId
    const reviews = useSelector(state => state.review.Reviews)
    const user = useSelector(state => state.session.user)
    let userReview;
    useEffect(() => {
        dispatch(getReviewsThunk(ownerId));
    }, [dispatch])

    if (!reviews) return (
        null
    );

    if (reviews && user) {
        userReview = reviews.find(review => user.id === review.User.id);
    }


    return (
        <div>
            <div className="review-heading">
                <div>
                    <p className="review-rating"> {reviews.length === 0 ? (<div>No reviews (yet)</div>) : <> <i className="fa-solid fa-star"></i>
                        {spot.avgStarRating.toFixed(2)}</>}

                    </p>
                </div>
                <div>
                    {spot.numReviews} Reviews
                </div>
            </div>
            <div>
                {!userReview ?
                    <button>
                        <Link to={`/spot/${spot.id}/reviews/create`}>Write a Review</Link>
                    </button> :
                    <button>
                        <Link to={{ pathname: `/spot/${spot.id}/reviews/${userReview.id}/edit`, userReview}}>Edit Review</Link>
                    </button>
                }
            </div>
            <ul>
                {reviews.map(spot => (
                    <div>
                        <div>{spot.User.firstName}</div>
                        <div>{new Date(spot.createdAt).toLocaleString("en-US", { month: "long" })}</div>

                        <div>{spot.review}</div>

                    </div>
                ))}
            </ul>

        </div>
    )
}
