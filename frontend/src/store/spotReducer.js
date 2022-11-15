import { bindActionCreators } from 'redux'

/* type */
const GET_SPOTS = 'spot/getAllSpots';

/* action creator */
const loadSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

/* thunk */
export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
        return data
    }

}

// normalize the data when yo come back you dummy

const initialState = {}

/* reducer */
const spotReducer = (state = initialState, action) => {

    switch (bindActionCreators.type) {
        case GET_SPOTS:{
            const newState = {...state};
            action.spots.forEach(spot => {
                newState[spot.id] = {...spot}
                return newState
            });
        }
        default:
            return state
    }
}

export default spotReducer;
