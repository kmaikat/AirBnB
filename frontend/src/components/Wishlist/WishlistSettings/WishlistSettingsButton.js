import { useState } from "react"
import { Modal } from "../../../context/Modal"
import WishlistSettingsModal from "./WishlistSettingsModal"

const WishlistSettingsButton = () => {
    const [showModal,setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <WishlistSettingsModal setShowModal={setShowModal}/>
                    </Modal>
                )
            }
        </>
    )
}

export default WishlistSettingsButton
