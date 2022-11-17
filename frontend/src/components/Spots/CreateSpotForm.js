import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createASpot } from "../../store/spotReducer"
import { useEffect } from "react"

export default function CreateSpotForm() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    // const [errors, setErrors] = useState([])

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        console.log({
            name,
            description,
            price,
            address,
            city,
            state,
            country
        })

        return history.push("/")
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>create a spot TT-TT</h1>
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
