const WishlistAddCard = ({wishlist}) => {
    return (
        <div className="wishlist-card-container">
                <div className="wishlist-photo-container">
                    <img src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-600995968631545713/original/a2fd2a55-f108-4d04-a464-902213af458a.jpeg?im_w=1200"></img>
                </div>
                <p className="wishlist-index-name">{wishlist.name}</p>
                <p className="wishlist-index-saved-number">{wishlist.WishlistItems.length} saved</p>
        </div>
    )
}

export default WishlistAddCard
