

/* type */
const GET_SPOTS = 'spot/getAllSpots'
const GET_SPOT_BY_ID = 'spot/getSpotById'

/* action creator */
const loadSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

// load spot by id
const loadSpotByID = (spot) => {
    return {
        type: GET_SPOT_BY_ID,
        spot
    }
}



/* thunk */
export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
        return data
    }

}

export const getSpotById = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpotByID(data));
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
        case GET_SPOT_BY_ID: {
            const newState = {...state};
            newState.oneSpot = action.spot
            return newState
        }
        default:
            return state
    }
}

export default spotReducer;
