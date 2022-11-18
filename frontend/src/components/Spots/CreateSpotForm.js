import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { createASpotThunk } from "../../store/spotReducer"
import * as sessionActions from "../../store/spotReducer"
import { useEffect } from "react"

export default function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(sessionActions.getSpotByIdThunk(spotId));
    }, []);

    const spot = useSelector(state => state.spot.oneSpot) ?? {
        name: "",
        description: "",
        price: "",
        address: "",
        city: "",
        state: "",
        country: ""
    }
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

    console.log(spot)

    if (!user) return null

    const onSubmit = async (e) => {
        e.preventDefault();

        if (spot.id) {
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
        } else {
            try {
                await dispatch(createASpotThunk({
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

        }

        console.log(errors)

        return history.push(`/spots/${spot.id}`)
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>{spot.id ? "Edit a spot 🐥" : "Create a Spot 🐥"}</h1>
            <ul>
                {errors.map(error => (<li key={error}>{error}</li>))}
            </ul>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Description
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </label>
            <label>
                Price
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </label>
            <label>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}
