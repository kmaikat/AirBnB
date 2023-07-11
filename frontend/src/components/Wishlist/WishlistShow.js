import { useParams } from "react-router-dom"
import "./WishlistShow.css"
import WishlistMapIndex from "./WishlistMap/WishlistMapIndex"
import WishlistShowInfo from "./WishlistShowInfo"

const WishlistShow = () => {

    return (
        <div id="wishlist-outer-container">
            <div id="wishlist-information-container"><WishlistShowInfo/></div>
            <div id="wishlist-map-container"><WishlistMapIndex/></div>
        </div>
    )
}

export default WishlistShow
