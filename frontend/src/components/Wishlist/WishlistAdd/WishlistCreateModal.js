import { useState } from "react"
import "./WishlistCreateModal.css"
import { useDispatch, useSelector } from "react-redux"
import { addSpotToWishlistThunk, createWishlistThunk } from "../../../store/wishlist"

const WishlistCreateModal = ({ setShowModal, spotId}) => {
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)

    const updateName = (e) => {
        setName(e.target.value)
    }

    const submitWishlistName = async (event) => {
        event.preventDefault();

        // create the wishlist
        const submission = {
            userId,
            name
        }
        // add the spot to the wishlist
        const wishlist = await dispatch(createWishlistThunk(submission))

        if (!wishlist.errors) {
            const spotSubmission = {
                userId,
                spotId,
                wishlistId: wishlist.data.id
            }

            const wishlistItem = await dispatch(addSpotToWishlistThunk(spotSubmission))

            if (!wishlistItem.errors) {
                setShowModal(false)
            } else {
                console.log(wishlistItem.errors)
            }

        } else {
            console.log(wishlist.errors)
        }
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
            <form id="creat-wishlist-form" onSubmit={submitWishlistName}>
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
                    <button className="create-modal-create-button" type="submit" onClick={(event) => event.stopPropagation()}>Create</button>
                </div>
            </form>
        </div>
    )
}

export default WishlistCreateModal
