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

const initialState = {Spots: {}, page: 1, size: 20}

/* reducer */
const spotReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SPOTS:{
            const newState = {...state};
            action.spots.Spots.forEach(spot => {
                newState.Spots[spot.id] = {...spot}
            });
            return newState
        }
        default:
            return state
    }
}

export default spotReducer;
