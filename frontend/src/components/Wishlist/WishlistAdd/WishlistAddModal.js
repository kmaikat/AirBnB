import { useSelector } from "react-redux"
import WishlistAddCard from "./WishlistAddCard"
import "./WishlistAddModal.css"

function WishlistAddModal({ setShowModal }) {
    const wishlists = useSelector(state => state.wishlists)

    return (
        <div className="add-modal-outer-container">
            <div className="add-modal-heading-container">
                <button onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <div>Add to wishlist</div>
                <div></div>
            </div>
            <div className="add-modal-wishlists-container">
                {wishlists.map(wishlist => (<WishlistAddCard key={wishlist.id} wishlist={wishlist} />))}
            </div>
            <div className="add-modal-options">
                <button id="add-modal-create-button" onClick={() => setShowModal(false)}>Create new wishlist</button>
            </div>
        </div>
    )
}

export default WishlistAddModal
