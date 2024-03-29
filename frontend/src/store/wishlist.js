import { csrfFetch } from "./csrf";
import { restoreUser } from "./session";

const GET_WISHLISTS = 'wishlist/getWishlists'
const CREATE_WISHLIST = 'wishlist/createWishlist'
const EDIT_WISHLIST = 'wishlist/editWishlist'
const DELETE_WISHLIST = 'wishlist/deleteWishlist'

const ADD_SPOT = 'wishlist/addSpot'
const DELETE_SPOT = 'wishlist/deleteSpot'

const getWishlistsAction = (wishlists) => {
    return {
        type: GET_WISHLISTS,
        wishlists: wishlists
    }
}

const createWishlistAction = (wishlists) => {
    return {
        type: CREATE_WISHLIST,
        wishlists
    }
}

const editWishlistAction = (wishlist) => {
    return {
        type: EDIT_WISHLIST,
        wishlist
    }
}

const deleteWishlistAction = (wishlist) => {
    return {
        type: DELETE_WISHLIST,
        wishlist
    }
}

const addSpotAction = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

const deleteSpotAction = (spot) => {
    return {
        type: DELETE_SPOT,
        spot
    }
}

export const getWishlistsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/wishlists`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getWishlistsAction(data))
        dispatch(restoreUser())
        return data
    }
}

export const createWishlistThunk = (wishlistName) => async dispatch => {
    const response = await csrfFetch(`/api/wishlists/`, {
        method: "POST",
        body: JSON.stringify(wishlistName)
    });

    const wishlist = {};

    if (response.ok) {
        wishlist.data = await response.json();
        dispatch(getWishlistsThunk())
        dispatch(restoreUser())
    } else {
        wishlist.errors = await response.json();
    }
    return wishlist;
}

export const updateWishlistThunk = ({ wishlistId, name }) => async dispatch => {
    const response = await csrfFetch(`/api/wishlists/${wishlistId}`, {
        method: "PUT",
        body: JSON.stringify({name})
    });


    const wishlist = {}

    if (response.ok) {
        wishlist.data = await response.json();
        dispatch(getWishlistsThunk());
    } else {
        wishlist.errors = await response.json();
    }

    return wishlist
}

export const deleteWishlistThunk = (wishlistId) => async dispatch => {
    const response = await csrfFetch(`/api/wishlists/${wishlistId}`, {
        method: "DELETE"
    });

    const deleteWishlist = {}
    if (response.ok) {
        deleteWishlist.ok = await response.json()
        dispatch(getWishlistsThunk())
        dispatch(restoreUser())
    } else {
        deleteWishlist.errors = await response.json()
    }
    return deleteWishlist
}

export const addSpotToWishlistThunk = ({wishlistId, spotId}) => async dispatch => {
    const response = await csrfFetch(`/api/wishlists/${wishlistId}/add-spot`, {
        method: "POST",
        body: JSON.stringify({spotId})
    })

    const wishlistItem = {}

    if (response.ok) {
        dispatch(getWishlistsThunk())
        dispatch(restoreUser())
        wishlistItem.data = await response.json()
    } else {
        wishlistItem.errors = await response.json()
    }

    return wishlistItem;
}

export const deleteSpotFromWishlistThunk = ({spotId}) => async dispatch => {
    const response = await csrfFetch(`/api/wishlists/delete/${spotId}`, {
        method: "DELETE",
        body: JSON.stringify({spotId})
    })

    const wishlistItem = {}

    if (response.ok) {
        dispatch(getWishlistsThunk())
        dispatch(restoreUser())
        wishlistItem.data = await response.json()
    } else {
        wishlistItem.errors = await response.json()
    }
}


const initialState = []; // should this be an obj or arr?

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WISHLISTS: {
            return action.wishlists;
        }
        case CREATE_WISHLIST: {
            const newState = [...state]
            return newState
        }
        default:
            return state
    }
}

export default wishlistReducer;
