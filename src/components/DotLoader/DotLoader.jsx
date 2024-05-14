import React from 'react';
import { DotLoader } from 'react-spinners';

function DotSensor() {
    return (
        <div>
            <h3>Dot Sensor</h3>
            <div className='sweet-loading'>
                <DotLoader color={'#5272F2'} loading={true} />
            </div>
        </div>
    )
}

export default DotSensor;