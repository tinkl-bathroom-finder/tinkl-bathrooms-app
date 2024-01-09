import React from 'react';
import { DotLoader } from 'react-spinners';

function DotSensor() {
    return (
        <div>
            <h3>Dot Sensor</h3>
            <div className='sweet-loading'>
                <DotLoader color={'#36d7b7'} loading={true} />
            </div>
        </div>
    )
}

export default DotSensor;