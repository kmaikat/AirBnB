import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createASpotThunk } from "../../store/spotReducer"


export default function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [errors, setErrors] = useState([]);

    if (!user) return null

    const onSubmit = async (e) => {
        e.preventDefault();
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

        return history.push(`/`)
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Create a Spot 🐥</h1>
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
