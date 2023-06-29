import { useSelector } from "react-redux"
import WishlistAddCard from "./WishlistAddCard"
import "./WishlistAddModal.css"
import { useState } from "react"

function WishlistAddModal({ setShowModal }) {
    const wishlists = useSelector(state => state.wishlists)
    const [modalState, setModalState] = useState("initial")
    const [name, setName] = useState("")

    const updateName = (e) => {
        setName(e.target.value)
    }

    return (
        <>
        { modalState === "initial" &&
        <div className="add-modal-outer-container">
            <div className="add-modal-heading-container">
                <button onClick={(event) => {event.stopPropagation(); setShowModal(false)}}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <div>Add to wishlist</div>
                <div></div>
            </div>
            <div className="add-modal-wishlists-container">
                {wishlists.map(wishlist => (<WishlistAddCard key={wishlist.id} wishlist={wishlist} />))}
            </div>
            <div className="add-modal-options">
                <button id="add-modal-create-button" onClick={() => setModalState("create")}>Create new wishlist</button>
            </div>
        </div>
        }
        { modalState === "create" &&
            <div className="create-modal-outer-container">
            <div className="create-modal-heading-container">
                <button onClick={event => { event.stopPropagation(); setModalState("initial") }}>
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

                <div className="create-modal-options-container">
                    <button className="create-modal-clear-button" onClick={() => setName("")}>Clear</button>
                    <button className="create-modal-create-button">Create</button>
                </div>
            </form>
        </div>

        }
        </>
    )
}

export default WishlistAddModal
