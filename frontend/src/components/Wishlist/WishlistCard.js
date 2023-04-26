import { Link } from "react-router-dom"
import "./WishlistCard.css"

const WishlistCard = ({wishlist}) => {
    return (
        <div className="wishlist-container">
            <Link to={`/wishlists/${wishlist.id}`}>
                <div className="wishlist-photo-container">
                    <img src="https://digitalassets.daltile.com/content/dam/Daltile/DAL_images/median/web/DAL_MN41_24x24_Beige_Matte.jpg/jcr:content/renditions/cq5dam.web.2000.2000.jpeg"></img>
                </div>
                <p className="wishlist-index-name">{wishlist.name}</p>
            </Link>
        </div>
    )
}

export default WishlistCard
