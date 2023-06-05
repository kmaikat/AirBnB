import "./WishlistDeleteModal.css"
function WishlistDeleteModal({setShowModal}) {
    return (
        <div>
            <div className="delete-modal-exit-container">
                <button onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
            <div className="delete-modal-dialog-container">
                <p>Delete this wishlist?</p>
                <p>"A" will be permanently deleted.</p>
            </div>
            <div className="delete-modal-options">
                <button id="delete-modal-cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button id="delete-modal-delete-button" onClick={() => console.log("oy im deleting")}>Delete</button>
            </div>
        </div>
    )
}

export default WishlistDeleteModal
