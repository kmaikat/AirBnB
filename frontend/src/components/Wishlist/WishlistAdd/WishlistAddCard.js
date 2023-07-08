import { useDispatch, useSelector } from "react-redux"
import "./WishlistAddCard.css"
import { addSpotToWishlistThunk } from "../../../store/wishlist"
const WishlistAddCard = ({wishlist, spotId, setShowModal}) => {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user.id)
    const wishlistId = wishlist.id
    const handleAdd = async (event) => {
        const spotSubmission = {
            userId,
            wishlistId,
            spotId
        }

        const wishlistItem = await dispatch(addSpotToWishlistThunk(spotSubmission))

        if (!wishlistItem.errors) {
            setShowModal(false)
        } else {
            console.log(wishlistItem.errors)
        }
    }

    return (
        <div className="add-wishlist-card-container" onClick={handleAdd}>
                <div className="add-wishlist-photo-container">
                    <img src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-600995968631545713/original/a2fd2a55-f108-4d04-a464-902213af458a.jpeg?im_w=1200"></img>
                </div>
                <p className="wishlist-index-name">{wishlist.name}</p>
                <p className="wishlist-index-saved-number">{wishlist.WishlistItems.length} saved</p>
        </div>
    )
}

export default WishlistAddCard
