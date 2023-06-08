import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import { useMemo } from "react"
import "./WishlistMapIndex.css"
import styles from "./Map"

const WishlistMapIndex = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const center = useMemo(() => ({ lat: 43, lng: -80 }), []);

    if (!isLoaded) return <div>Please wait for the map to load</div>

    return (
        <GoogleMap zoom={13} center={center} mapContainerClassName="map-container" options={{styles: styles}}>
        </GoogleMap>
    )
}

export default WishlistMapIndex
