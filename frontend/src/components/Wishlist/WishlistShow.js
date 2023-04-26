import { useParams } from "react-router-dom"

const WishlistShow = () => {
    const {wishlistId} = useParams()
    
    return (
        <div>
            <div>WishlistName</div>
        </div>
    )
}

export default WishlistShow
