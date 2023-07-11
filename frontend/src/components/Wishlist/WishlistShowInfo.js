import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./WishlistShowInfo.css"
import WishlistSettingsButton from "./WishlistSettings/WishlistSettingsButton";
import { useDispatch, useSelector } from "react-redux";
import { addSpotToWishlistThunk, deleteSpotFromWishlistThunk } from "../../store/wishlist";
import WishlistShowInfoHeart from "./WishlistShowInfoHeart";

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
                <div onClick={_ => history.push("/wishlists")}><i className="fa-solid fa-arrow-left"></i></div>
                <WishlistSettingsButton wishlistInfo={wishlistInfo}/>
            </div>
            <div className="wishlist-spots-show-title">{wishlistInfo.name}</div>
            <div className="wishlist-spots-grid">
                {wishlistInfo.WishlistItems.map(card => (
                <div className="wishlist-spot-card" onClick={_ => history.push("/spots/" + card.Spot.id)}>
                    <div className="wishlist-spot-card-image">
                        <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80"></img>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" onClick={saveSpot} id="eachspot-heart"  viewBox="0 0 32 32" style={{display: "block", fill: card.Spot.id in savedSpots? "red" : "gray", height: "24px", width: "24px", stroke: "white", ["stroke-width"]: 2, overflow: "visible"}}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg> */}
                        <WishlistShowInfoHeart wishlistInfo={wishlistInfo} card={card}/>
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
