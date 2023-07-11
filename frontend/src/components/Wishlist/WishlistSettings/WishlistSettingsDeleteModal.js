import { useDispatch } from "react-redux"
import { deleteWishlistThunk } from "../../../store/wishlist"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const WishlistSettingsDeleteModal = ({setShowModal, setModalState, wishlistInfo}) => {
    const dispatch = useDispatch()
    const wishlistId = wishlistInfo.id
    const history = useHistory()

    const handleDelete = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const deleteResponse = await dispatch(deleteWishlistThunk(wishlistId))

        if (deleteResponse) {
            setShowModal(false)
            history.push('/wishlists')
            // need to push to wishlist index
        }
    }
    return (
        <div>
            <div className="delete-modal-exit-container">
                <button onClick={() => setModalState("initial")}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
            <div className="delete-modal-dialog-container">
                <p>Delete this wishlist?</p>
                <p>{wishlistInfo.name} will be permanently deleted.</p>
            </div>
            <div className="delete-modal-options">
                <button id="delete-modal-cancel-button" onClick={() => setModalState("initial")}>Cancel</button>
                <button id="delete-modal-delete-button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default WishlistSettingsDeleteModal
