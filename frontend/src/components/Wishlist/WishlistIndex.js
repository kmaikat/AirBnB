import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWishlistsThunk } from "../../store/wishlist";
import "../Wishlist/WishlistIndex.css"
import WishlistCard from "./WishlistCard";
const WishlistIndex = () => {
    const dispatch = useDispatch();

    const wishlists = useSelector(state => state.wishlists)

    useEffect(() => {
        dispatch(getWishlistsThunk())
    }, [dispatch])

    return (
        <div id="wishlist-window">
            <div id="wishlist-index-heading">Wishlists</div>
            {/* if there are no wishlist, it would instruct you to make wishlists */}
            {/* if there are wishlists, then there will be cards */}
            {!wishlists ?
                <div id="wishlist-index-initial-instructions">
                    <p>
                        Create your first wishlist
                    </p>
                    <p>
                        As you search, tap the heart icon to save your favorite places to stay or things to do to a wishlist.
                    </p>
                </div> : <div className="wishlist-container">{wishlists.map(wishlist => (<WishlistCard key={wishlist.id} wishlist={wishlist}/>))}</div>
            }
        </div>
    )
}

export default WishlistIndex
