import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createASpotThunk, createImageThunk } from "../../store/spotReducer"


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
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState([]);

    if (!user) return history.push("/")

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const newSpot = await dispatch(createASpotThunk({
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

            console.log(newSpot)
            dispatch(createImageThunk(newSpot.id, {
                url: image,
                preview: true
            }))

        } catch (errors) {
            const data = await errors.json();
            setErrors(data.errors);
            return;
        }

        return history.push("/")
    }

    return (
        <div className="spots-form">
            <div className='loginsignup-form'>
                <div className="signuplogin-form-header">
                    <div className="signuplogin-form-title">
                        <h2>Create a Spot</h2>
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
                        className="form-mid-input"
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="Country"
                    />
                    <input
                        className="form-last-input"
                        type="url"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        placeholder="Image Url"
                    />
                    <button type="submit" className="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
