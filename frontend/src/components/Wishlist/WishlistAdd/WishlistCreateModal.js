import { useState } from "react"
import "./WishlistCreateModal.css"

const WishlistCreateModal = ({ setShowModal }) => {
    const [name, setName] = useState("")

    const updateName = (e) => {
        setName(e.target.value)
    }

    return (
        <div className="create-modal-outer-container">
            <div className="create-modal-heading-container">
                <button onClick={event => { event.stopPropagation(); setShowModal(false) }}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <div>Create wishlist</div>
                <div></div>
            </div>
            <form>
                <div id="create-modal-name-container">
                    <label className={name.length > 0 ? "name-label-filled" : ""}>Name</label>
                    <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={updateName}
                        maxLength={50}
                    />
                </div>
                <div className="create-modal-counter-container">
                    <div className="create-modal-counter">{name.length}/50 characters</div>
                    <div className={name.length >= 50 ? "create-modal-counter-container-warning" : "create-modal-counter-container-warning-hidden"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false" style={{ display: "block", height: "16px", width: "16px", fill: "currentcolor" }}><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
                        <p>Over character limit</p>
                    </div>
                </div>
            </form>
            <div>
                <div>Clear</div>
                <div>Create</div>
            </div>
        </div>
    )
}

export default WishlistCreateModal
