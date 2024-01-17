import { useState } from "react";
import { useSelector } from "react-redux";

import BathroomItem from "../BathroomItem/BathroomItem";

// Google Maps API
import { MarkerF, InfoWindowF} from "@react-google-maps/api"

function Marker({bathroom}){
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    return(
        <>
        <MarkerF
        id={bathroom.id}
        position={({lat: bathroom.latitude, lng: bathroom.longitude})}
        onClick={() => setInfoWindowOpen(true)}
        >
            {infoWindowOpen && (
                <InfoWindowF
                    onCloseClick={() => setInfoWindowOpen(false)}
                    position={({lat: bathroom?.latitude, lng: bathroom?.longitude})}
                    maxwidth="100px"
                >
                    <>
                    <BathroomItem key={bathroom.id} bathroom={bathroom}/>
                    </>
                 </InfoWindowF>
            )}

        </MarkerF>
        </>
    )
}

export default Marker;