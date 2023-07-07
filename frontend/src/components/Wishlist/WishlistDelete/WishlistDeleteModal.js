import { useDispatch } from "react-redux"
import "./WishlistDeleteModal.css"
import { deleteWishlistThunk, getWishlistsThunk } from "../../../store/wishlist"
import { useEffect } from "react"

function WishlistDeleteModal({setShowModal, wishlist}) {
    const dispatch = useDispatch()
    const wishlistId = wishlist.id

    const handleDelete = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const deleteResponse = await dispatch(deleteWishlistThunk(wishlistId))

        if (deleteResponse) {
            console.log("yay i deleted")
            setShowModal(false)
        }
    }

    return (
        <div>
            <div className="delete-modal-exit-container">
                <button onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
            <div className="delete-modal-dialog-container">
                <p>Delete this wishlist?</p>
                <p>"A" will be permanently deleted.</p>
            </div>
            <div className="delete-modal-options">
                <button id="delete-modal-cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button id="delete-modal-delete-button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default WishlistDeleteModal
