import "./WishlistSettingsModal.css"

const WishlistSettingsModal = ({ setShowModal }) => {
    return (
        <div className="wishlist-settings-container">
            <div className="wishlist-settings-header">
                <button onClick={(event) => { event.stopPropagation(); setShowModal(false) }}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <div>Settings</div>
                <div></div>
            </div>
            <div className="wishlist-settings-options-container">
                <div className="wishlist-settings-rename-container">
                    <div className="wishlist-settings-rename-left-container">
                        <i class="fa-solid fa-pen"></i>
                        <p>Rename</p>
                    </div>
                    <div className="wishlist-settings-rename-right-container"><i class="fa-solid fa-chevron-right"></i></div>
                </div>
                <div className="wishlist-settings-delete-container">
                    <div className="wishlist-settings-delete-left-container">
                        <i class="fa-solid fa-trash-can"></i>
                        <p>Delete</p>
                    </div>
                    <div className="wishlist-settings-delete-right-container"><i class="fa-solid fa-chevron-right"></i></div>
                </div>
            </div>
        </div>
    )
}

export default WishlistSettingsModal
