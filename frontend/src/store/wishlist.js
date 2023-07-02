import { csrfFetch } from "./csrf";

const GET_WISHLISTS = 'wishlist/getWishlists'
const CREATE_WISHLIST = 'wishlist/createWishlist'
const EDIT_WISHLIST = 'wishlist/editWishlist'
const DELETE_WISHLIST = 'wishlist/deleteWishlist'

const getWishlistsAction = (wishlists) => {
    return {
        type: GET_WISHLISTS,
        wishlists: wishlists.Wishlists
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

export const getWishlistsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/wishlists`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getWishlistsAction(data))
        return data
    }
}

export const createWishlistThunk = (wishlist) => async dispatch => {
    const response = await csrfFetch(`/api/wishlists`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(wishlist)
    });

    if (response.ok) {
        const wishlist = await response.json();
        dispatch(createWishlistAction(wishlist));
    } else {
        const errors = await response.json();
        return errors
    }
}

export const updateWishlistThunk = (wishlistId) => async dispatch => {
    const response = await csrfFetch(`/api/${wishlistId}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(wishlistId)
    });

    if (response.ok) {
        const wishlist = await response.json();
        dispatch(editWishlistAction(wishlist));
    } else {
        const errors = await response.json();
        return errors
    }
}

export const deleteWishlistThunk = (wishlistId) => async dispatch => {
    const response = await csrfFetch(`/api/${wishlistId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const wishlist = await response.json()
        dispatch(deleteWishlistAction(wishlist))
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = []; // should this be an obj or arr?

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WISHLISTS: {
            return action.wishlists;
        }
        case CREATE_WISHLIST: {
            const newState = { ...state }
            newState[action.wishlist.id] = action.wishlist
            return newState
        }
        default:
            return state
    }
}

export default wishlistReducer;
