import { csrfFetch } from "./csrf";

const GET_WISHLISTS = 'wishlist/getWishlists'
const GET_ONEWISHLIST = 'wishlist/getOneWishlist'
const CREATE_WISHLIST = 'wishlist/createWishlist'
const EDIT_WISHLIST = 'wishlist/editWishlist'
const DELETE_WISHLIST = 'wishlist/deleteWishlist'

const getWishlistsAction = (wishlists) => {
    return {
        type: GET_WISHLISTS,
        wishlists: wishlists.Wishlists
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

const initialState = [];

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WISHLISTS: {
            return action.wishlists;
        }
        default:
            return state
    }
}

export default wishlistReducer;
