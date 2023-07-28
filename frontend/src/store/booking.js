import { csrfFetch } from "./csrf";
import { restoreUser } from "./session";

const GET_BOOKINGS = 'booking/getBookings'
const CREATE_BOOKING = 'booking/createBooking'

const getBookingsAction = (bookings) => {
    return {
        type: GET_BOOKINGS,
        bookings: bookings
    }
}

const createBookingAction = (bookings) => {
    return {
        type: CREATE_BOOKING,
        bookings: bookings
    }
}
export const getBookingsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`)

    if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(getBookingsAction(data))
        return data
    }
}

export const createBookingThunk = ({spotId, startDate, endDate}) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        body: JSON.stringify({startDate, endDate})
    })

    console.log(response)

    const booking = {}
    if (response.ok) {
        booking.data = await response.json()
        dispatch(createBookingAction())
        dispatch(getBookingsThunk())
    } else {
        booking.errors = await response.json();
    }

    return booking
}

const initialState = {}

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKINGS: {
            return action.bookings;
        }
        case CREATE_BOOKING: {
            const newState = {...state}
            return newState
        }
        default:
            return state
    }
}

export default bookingReducer;
