import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";

export default function ReviewIndex({spot}) {
    const dispatch = useDispatch();
    const ownerId = spot.ownerId
    const reviews = useSelector(state => state.review.Reviews)

    useEffect(() => {
        dispatch(getReviewsThunk(ownerId))
    }, [dispatch])

    if (!reviews) return (
        <div>No reviews (yet)</div>
    );

    return (
        <div>
            <div className="review-heading">
                <div>
                    <p className="review-rating">
                        <i className="fa-solid fa-star"></i>
                        {spot.avgStarRating}
                    </p>
                </div>
                <div>
                    {spot.numReviews} Reviews
                </div>
            </div>
            <div>
                <button>
                    <Link to={`/spot/${spot.id}/reviews/create`}>Write a Review</Link>
                </button>
            </div>
            <ul>
               {reviews.map(spot => (
                <div>{spot.review}</div>
               ))}
            </ul>

        </div>
    )
}
