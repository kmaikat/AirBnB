import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateWishlistThunk } from "../../../store/wishlist"


const WishlistRenameModal = ({setModalState, wishlistInfo, setShowModal}) => {
    const wishlistName = wishlistInfo.name
    const [name, setName] = useState(wishlistName)
    const dispatch = useDispatch()

    const updateName = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const submission = {
            wishlistId: wishlistInfo.id,
            name
        }

        const wishlist = await dispatch(updateWishlistThunk(submission))

        if (!wishlist.errors) {
            setShowModal(false)
        }

    }


    return (
        <div className="create-modal-outer-container">
            <div className="create-modal-heading-container">
                <button onClick={event => { event.stopPropagation(); setModalState("initial") }}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <div>Rename wishlist</div>
                <div></div>
            </div>
            <form onSubmit={handleSubmit}>
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
                    <button className="create-modal-clear-button" onClick={(event) => {event.stopPropagation();setName("")}}>Clear</button>
                    <button className="create-modal-create-button" type="submit">Save</button>
                </div>
            </form>
            </div>
    )
}

export default WishlistRenameModal
