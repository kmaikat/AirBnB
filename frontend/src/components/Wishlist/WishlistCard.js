import { Link } from "react-router-dom"

const WishlistCard = ({wishlist}) => {
    return (
        <div>
            <Link to={`/wishlists/${wishlist.id}`}>
                <div>
                    <img src="https://www.mockuptiger.com/wp-content/uploads/2018/03/image-665.jpg"></img>
                </div>
                <div>{wishlist.name}</div>
            </Link>
        </div>
    )
}

export default WishlistCard
