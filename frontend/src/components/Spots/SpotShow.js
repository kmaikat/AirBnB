import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function SpotShow() {
    const { spotId } = useParams();

    // const spot = useSelector(state => )
    // console.log("this is the spot: ", spot)

    return (
        <div>hello what up</div>
    );
}
