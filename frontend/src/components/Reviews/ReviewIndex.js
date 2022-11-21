import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getReviewsThunk } from "../../store/review";
import "../Spots/SpotShow.css"
export default function ReviewIndex({ spot }) {
    const dispatch = useDispatch();
    const ownerId = spot.ownerId
    const reviews = useSelector(state => state.review.Reviews)
    const user = useSelector(state => state.session.user)
    let userReview;
    useEffect(() => {
        dispatch(getReviewsThunk(spot.id));
    }, [dispatch])

    if (!reviews) return (
        null
    );

    if (reviews && user) {
        userReview = reviews.find(review => user.id === review.User.id);
    }

    console.log(spot)

    return (
        <div>
            <div className="review-heading">
                <div>
                    <p className="review-rating"> {spot.numReviews === 0 ? (<div>No reviews (yet)</div>) : <> <i className="fa-solid fa-star"></i>
                        {spot.avgStarRating.toFixed(2)} · {spot.numReviews} Reviews</>}

                    </p>
                </div>
            </div>

                <div className="review-outer-container">
                    {reviews.map(spot => (
                        <div className="review-container">
                            <div className="review-top">
                                <div className="review-top-left">
                                    <i className="fa-solid fa-circle-user"></i>
                                </div>
                                <div className="review-top-right">
                                    <div className="review-name">{spot.User.firstName}</div>
                                    <div className="review-date">{new Date(spot.createdAt).toLocaleString("en-US", { month: "long" })}</div>
                                </div>
                            </div>
                            <div className="review-bottom-description">
                                <div>{spot.review}</div>
                            </div>
                        </div>
                    ))}
                </div>
            <div className="review-edit-or-write">
                {!userReview ?
                    (user && <div><button>
                        <Link to={`/spot/${spot.id}/reviews/create`} id="write-review">Write a Review</Link>
                    </button></div>) :
                    <div>
                        <button>
                            <Link to={{ pathname: `/spot/${spot.id}/reviews/${userReview.id}/edit`, userReview }} id="write-review">Edit Review</Link>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
