import { useState } from "react"
import { Modal } from "../../../context/Modal"

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
                        <div>hello</div>
                    </Modal>
                )
            }
        </>
    )
}

export default WishlistSettingsButton
