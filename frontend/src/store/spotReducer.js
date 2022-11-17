import { csrfFetch } from "./csrf";

/* type */
const GET_SPOTS = 'spot/getAllSpots'
const GET_SPOT_BY_ID = 'spot/getSpotById'
const CREATE_SPOT = 'spot/createSpot'
const EDIT_SPOT = 'spot/editSpot'
const DELETE_SPOT = 'spot/deleteSpot'

/* action creator */
const loadSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

const loadSpotByID = (spot) => {
    return {
        type: GET_SPOT_BY_ID,
        spot
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}

const deleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        spot
    }
}


/* thunk */
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
        return data
    }

}

export const getSpotById = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpotByID(data));
        return data
    }
}

export const createASpot = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(createSpot(spot));
        return response;
    }
}

export const editASpot = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'PUT',
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(editSpot(spot));
        return response;
    }
}

export const deleteASpot = (id) => async dispatch => {
    const response = await csrfFetch('/api', {
        method: 'DELETE'
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteSpot(spot));
        return response;
    }

}


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
        case CREATE_SPOT: {
            const newState = {...state};
            return newState
        }
        case EDIT_SPOT: {
            const newState = {...state}
            return newState
        }
        case DELETE_SPOT: {
            const newState = {...state}
            delete newState.spot.Spots[action.id]
            delete newState.oneSpot
            return newState
        }
        default:
            return state
    }
}

export default spotReducer;

