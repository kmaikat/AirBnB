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
const getBookingsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getBookingsAction(data))
        return data
    }
}
const initialState = []

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKINGS: {
            return action.bookings;
        }
        default:
            return state
    }
}

export default bookingReducer;
