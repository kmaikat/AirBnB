import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import * as sessionActions from "../../store/spotReducer"
import { useEffect } from "react"

export default function EditSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(sessionActions.getSpotByIdThunk(spotId));
    }, [dispatch, spotId]);

    const spot = useSelector(state => state.spot.oneSpot) ?? {}
    useEffect(() => {

    }, [spot])


    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [errors, setErrors] = useState([]);

    if (!user) return history.push(`/spots/${spotId}`)

    const onSubmit = async (e) => {
        e.preventDefault();


        try {
            await dispatch(sessionActions.editASpotThunk({
                id: spot.id,
                name,
                description,
                price,
                lat: 10,
                lng: 10,
                address,
                city,
                state,
                country
            }))
        } catch (errors) {
            const data = await errors.json();
            setErrors(data.errors);
            return;
        }


        return history.push(`/spots/${spot.id}`)
    }

    return (
        <div className="spots-form">
            <div className='loginsignup-form'>
                <div className="signuplogin-form-header">
                    <div className="signuplogin-form-title">
                        <h2>Edit a Spot</h2>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="form">
                    <ul>
                        {errors.map(error => (<li key={error}>{error}</li>))}
                    </ul>
                    <input
                        className="form-first-input"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        className="form-mid-input"
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <input
                        className="form-mid-input"
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="Price"
                    />
                    <input
                        className="form-mid-input"
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Address"
                    />
                    <input
                        className="form-mid-input"
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="City"
                    />
                    <input
                        className="form-mid-input"
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="State"
                    />
                    <input
                        className="form-last-input"
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="Country"
                    />
                    <button type="submit" className="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
