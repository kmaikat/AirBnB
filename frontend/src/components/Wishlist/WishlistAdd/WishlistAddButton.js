import { useEffect, useState } from "react"
import { Modal } from "../../../context/Modal"
import WishlistAddModal from "./WishlistAddModal"
import { getWishlistsThunk } from "../../../store/wishlist"
import { useDispatch, useSelector } from "react-redux"
import WishlistCreateModal from "./WishlistCreateModal"

const WishlistAddButton = ({spotId}) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const wishlists = useSelector(state => state.wishlists)


    useEffect(() => {
        dispatch(getWishlistsThunk())
    }, [dispatch])

    const saveSpot = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setShowModal(true)
    }

    return (
        <>
            <button onClick={saveSpot}>
                <svg xmlns="http://www.w3.org/2000/svg" id="eachspot-heart" viewBox="0 0 32 32" style={{ display: "block", fill: "gray", height: "24px", width: "24px", stroke: "white", ["stroke-width"]: 2, overflow: "visible" }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
                {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {wishlists.length == 0 ? <WishlistCreateModal setShowModal={setShowModal} />: <WishlistAddModal setShowModal={setShowModal} spotId={spotId}/>}
                </Modal>
            )}
            </button>
        </>
    )
}

export default WishlistAddButton
