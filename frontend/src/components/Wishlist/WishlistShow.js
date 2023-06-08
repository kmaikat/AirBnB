import { useParams } from "react-router-dom"
import "./WishlistShow.css"
import WishlistMapIndex from "./WishlistMap/WishlistMapIndex"

const WishlistShow = () => {

    return (
        <div id="wishlist-outer-container">
            <div id="wishlist-information-container">Spots</div>
            <div id="wishlist-map-container"><WishlistMapIndex/></div>
        </div>
    )
}

export default WishlistShow
