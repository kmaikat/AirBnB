import { useDispatch, useSelector } from "react-redux"
import { addSpotToWishlistThunk, deleteSpotFromWishlistThunk } from "../../store/wishlist"

const WishlistShowInfoHeart = ({wishlistInfo, card}) => {
    const savedSpots = useSelector(state => state.session.user.savedSpots)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)

    const saveSpot = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (card.Spot.id in savedSpots) {
            const spotSubmission = {
                spotId:card.Spot.id
            }

            dispatch(deleteSpotFromWishlistThunk(spotSubmission))
        } else {
            const spotSubmission = {
                userId,
                wishlistId:wishlistInfo.id,
                spotId:card.Spot.id
            }

            dispatch(addSpotToWishlistThunk(spotSubmission))
        }
    }
    return (
        <button>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={saveSpot} id="eachspot-heart"  viewBox="0 0 32 32" style={{display: "block", fill: card.Spot.id in savedSpots? "red" : "gray", height: "24px", width: "24px", stroke: "white", ["stroke-width"]: 2, overflow: "visible"}}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
        </button>
    )
}

export default WishlistShowInfoHeart
