import { useState } from "react"
import { DeleteModal } from "../../../context/DeleteModal"
import WishlistDeleteModal from "./WishlistDeleteModal"

function WishlistDeleteButton() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className="wishlist-index-delete-button" onClick={() => {
                console.log(showModal)
                setShowModal(true)
            }}>
                <i className="fa-solid fa-x"></i>
            </button>
            {showModal && (
                <DeleteModal onClose={() => setShowModal(false)}>
                    <WishlistDeleteModal />
                </DeleteModal>
            )
            }
        </>

    )
}

export default WishlistDeleteButton
