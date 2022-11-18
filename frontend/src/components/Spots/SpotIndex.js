import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
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

    return (
        <div className="spotIndex">
            <ul className="spot">
                {spots.map(spot => (
                    <NavLink to={`spots/${spot.id}`} className="eachSpot">
                        <div className="previewImage">
                            <img src={`${spot.previewImage}`} alt="spot preview" />
                        </div>
                        <div className="description">
                            <div>
                                <p>{spot.city}, {spot.state}</p>
                                <p>Hosted by</p>
                                <p>${spot.price} night</p>
                                <p></p>
                            </div>
                            <div>
                                <p className="rating"><i className="fa-solid fa-star"></i>{Math.round(spot.avgRating)}</p>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </ul>
        </div>
    );
}
