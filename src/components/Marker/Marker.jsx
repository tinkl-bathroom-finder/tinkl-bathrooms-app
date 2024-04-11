import { useState } from "react";
import { useSelector } from "react-redux";

import BathroomItemMap from "../BathroomItem/BathroomItemMap";

// Google Maps API
import { MarkerF, InfoWindowF} from "@react-google-maps/api"

function Marker({bathroom, MarkerF, InfoWindowF}){
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);

      // Define your custom icon
  const customIcon = {
    url: (require('./toilet-marker2.png')), // path to your custom icon
    scaledSize: new google.maps.Size(50, 50), // adjust the size as needed
    origin: new google.maps.Point(0, 0)
  };

    return(
        <>
        <MarkerF
        icon={customIcon}
        id={bathroom.id}
        position={({lat: bathroom.latitude, lng: bathroom.longitude})}
        onClick={() => setInfoWindowOpen(true)}
        >
            {infoWindowOpen && (
                <InfoWindowF
                    onCloseClick={() => setInfoWindowOpen(false)}
                    position={({lat: bathroom?.latitude, lng: bathroom?.longitude})}
                    // maxwidth="200px"
                >
                    <>
                    <BathroomItemMap key={bathroom.id} bathroom={bathroom}/>
                    </>
                 </InfoWindowF>
            )}
        </MarkerF>

        </>
    )
}

export default Marker;