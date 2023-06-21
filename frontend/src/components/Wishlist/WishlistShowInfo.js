import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./WishlistShowInfo.css"

const WishlistShowInfo = () => {
    const [wishlistInfo, setWishlistInfo] = useState();
    const { wishlistId } = useParams();
    const history = useHistory();

    useEffect(_ => {
        (async function () {
            const info = await (await fetch('/api/wishlists/' + wishlistId)).json()
            setWishlistInfo(info.wishlist)
        }())
    }, {})

    if (!wishlistInfo) return null


    return (
        <div className="wishlist-spots-show-container">
            <div className="wishlist-spots-options">
                <div><i className="fa-solid fa-arrow-left"></i></div>
                <div><i className="fa-solid fa-ellipsis"></i></div>
            </div>
            <div className="wishlist-spots-show-title">{wishlistInfo.name}</div>
            <div className="wishlist-spots-grid">
                {wishlistInfo.WishlistItems.map(card => (
                <div className="wishlist-spot-card" onClick={_ => history.push("/spots/" + card.Spot.id)}>
                    {console.log(card)}
                    <div className="wishlist-spot-card-image">
                        <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80"></img>
                    </div>
                    <div className="wishlist-sport-card-info">
                        <div>{card.Spot.name}</div>
                        <div>5</div>
                    </div>
                    <div className="wishlist-spot-card-beds"># bed</div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default WishlistShowInfo
