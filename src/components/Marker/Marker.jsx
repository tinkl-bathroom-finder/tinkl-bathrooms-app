import { useState } from "react";
import { useSelector } from "react-redux";

// Google Maps API
import { MarkerF, InfoWindowF} from "@react-google-maps/api"

function Marker({bathroomObject}){
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    return(
        <>
        <MarkerF>
            {infoWindowOpen && (
                <InfoWindowF
                    onCloseClick={() => setInfoWindowOpen(false)}
                    position={({lat: 44.978145599365234, lng: -93.26353454589844})}
                >
                    <>
                    <h2>Test window text</h2>
                    </>
                 </InfoWindowF>
            )}

        </MarkerF>
        </>
    )
}

export default Marker;