import { csrfFetch } from "./csrf";

/* type */
const GET_SPOTS = 'spot/getAllSpotsAction'
const GET_SPOT_BY_ID = 'spot/getSpotByIdAction'
const CREATE_SPOT = 'spot/createSpotAction'
const EDIT_SPOT = 'spot/editSpotAction'
const DELETE_SPOT = 'spot/deleteSpotAction'
const CREATE_IMAGE = 'spot/createImageAction'

/* action creator */
const loadSpotsAction = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

const loadSpotByIDAction = (spot) => {
    return {
        type: GET_SPOT_BY_ID,
        spot
    }
}

const createSpotAction = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const editSpotAction = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}

const deleteSpotAction = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const createImageAction = (spotId) => {
    return {
        type: CREATE_IMAGE,
        spotId

    }
}


/* thunk */
export const getAllSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpotsAction(data));
        return data
    }

}

export const getSpotByIdThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpotByIDAction(data));
        return data
    }
}

export const createASpotThunk = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(createSpotAction(spot));
        return spot;
    }
}

export const editASpotThunk = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(editSpotAction(spot));
        return response;
    }
}

export const deleteASpotThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteSpotAction(spot));
        return response;
    }

}

export const createImageThunk = (spotId, imageUrl) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        body: JSON.stringify(imageUrl)
    })

    if (response.ok) {
        const image = await response.json();
        dispatch(createImageAction(image));
        return response;
    }
}


const initialState = { Spots: {}, page: 1, size: 20 }

/* reducer */
const spotReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SPOTS: {
            return action.spots
        }
        case GET_SPOT_BY_ID: {
            const newState = { ...state };
            newState.oneSpot = action.spot
            return newState
        }
        case CREATE_SPOT: {
            const newState = { ...state };
            return newState
        }
        case EDIT_SPOT: {
            const newState = { ...state }
            return newState
        }
        case DELETE_SPOT: {
            const newState = { ...state }
            delete newState.Spots[action.spotId]
            delete newState.oneSpot
            return newState
        }
        case CREATE_IMAGE: {
            const newState = {...state}
            return newState
        }
        default:
            return state
    }
}

export default spotReducer;
