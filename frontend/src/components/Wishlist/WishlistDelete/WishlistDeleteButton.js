import { useState } from "react"
import { DeleteModal } from "../../../context/DeleteModal"
import WishlistDeleteModal from "./WishlistDeleteModal"

function WishlistDeleteButton({wishlist}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className="wishlist-index-delete-button" onClick={() => { setShowModal(true) }}>
                <i className="fa-solid fa-x"></i>
            </button>
            {showModal && (
                <DeleteModal onClose={() => setShowModal(false)}>
                    <WishlistDeleteModal setShowModal={setShowModal} wishlist={wishlist}/>
                </DeleteModal>
            )
            }
        </>

    )
}

export default WishlistDeleteButton
