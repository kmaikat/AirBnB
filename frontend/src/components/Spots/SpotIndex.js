import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import { getAllSpotsThunk } from "../../store/spotReducer";
import './SpotIndex.css'


export default function SpotsIndex() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spot.Spots))
    // data flow for when you want a page to load passively, the page should load data by itself
    // component loads initially
    // state is empty
    // useEffect dispatches thunk to grab data from the database
    // thunk dispatches action to put data in state
    // useSelector notices change in state and rerenders page with data

    // data flow for create, update, and delete
    // component loads initially
    // there is a form or button on the page a user can interact with
    // when a user submits a form or click a button, we will send a thunk to update, create, or delete
    // in other words, the thunk is being dispatched on an onSubmit function or onClick function
    // thunk dispatches action to create, update, or delete in state
    // useSelector notices change in state and rerenders page with data
    // or we might push to another page after user submits a form or buttom
    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    if (spots.length === 0) return null;

    const saveSpot = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div id="spotIndex">
            {spots.map(spot => (
                <Link to={`spots/${spot.id}`} className="eachspot-content">
                    <div className="eachspot-content-image-container">
                        {spot.previewImage ?
                            (<img src={`${spot.previewImage}`} alt="spot preview" />) :
                            (<img src="https://creativeclickmedia.com/wp-content/uploads/2018/04/wireframe-box-270x203.jpg" alt="spot preview frame" />)}
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={saveSpot} id="eachspot-heart"  viewBox="0 0 32 32" style={{display: "block", fill: "gray", height: "24px", width: "24px", stroke: "white", ["stroke-width"]: 2, overflow: "visible"}}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
                    </div>
                    <div className="eachspot-content-description">
                        <div className="eachspot-content-description-left">
                            <p className="eachspot-content-description-location">{spot.city}, {spot.state}</p>
                            <p className="eachspot-content-description-hosted">Available Now!</p>
                            <p>
                                <span className="eachspot-content-description-price">${spot.price}</span> night
                            </p>
                        </div>
                        <div>
                            <p className="eachspot-content-rating"><i className="fa-solid fa-star"></i>{(spot.avgRating ? (Number(spot.avgRating)).toFixed(2) : (<p>new</p>))}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
