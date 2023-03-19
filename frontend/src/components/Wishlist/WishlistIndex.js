import "../Wishlist/WishlistIndex.css"
const WishlistIndex = () => {
    return (
        <div>
            <div id="wishlist-index-heading">Wishlists</div>
            {/* if there are no wishlist, it would instruct you to make wishlists */}
            {/* if there are wishlists, then there will be cards */}
            <div>
                <p>
                    Create your first wishlist
                </p>
                <p>
                    As you search, tap the heart icon to save your favorite places to stay or things to do to a wishlist.
                </p>
            </div>
        </div>
    )
}

export default WishlistIndex
