import { csrfFetch } from "./csrf";

/* type */
const GET_REVIEWS = 'review/getReviews'
const CREATE_REVIEW = 'review/createReview'
const EDIT_REVIEW = 'review/editReview'
const DELETE_REVIEW = 'review/deleteReview'

/* action */
const getReviewsAction = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}
const createReviewAction = (reviews) => {
    return {
        type: CREATE_REVIEW,
        reviews
    }
}
const editReviewAction = (reviews) => {
    return {
        type: EDIT_REVIEW,
        reviews
    }
}
const deleteReviewAction = (reviews) => {
    return {
        type: DELETE_REVIEW,
        reviews
    }
}

/* thunk */
export const getReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getReviewsAction(data));
        return data
    }

}
export const createReviewThunk = (spotId, review) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createReviewAction
            (data));
        return data
    }

}
export const editReviewThunk = (reviewId, review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    });
    console.log("in the thunk",response)

    if (response.ok) {
        const data = await response.json();
        dispatch(editReviewAction(data));
        return data
    }

}
export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteReviewAction(data));
        return data
    }

}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            return action.reviews
        }
        case CREATE_REVIEW: {
            const newState = {...state}
            return newState
        }
        case EDIT_REVIEW: {
            const newState = {...state}
            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            return newState
            // delete newState.review
        }
        default:
            return state
    }
}

export default reviewReducer
