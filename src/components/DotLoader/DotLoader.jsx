import React from 'react';
import { DotLoader } from 'react-spinners';

function DotSensor() {
    return (
        <div>
            <div className='sweet-loading'>
                <DotLoader color={'#5272F2'} loading={true} />
            </div>
        </div>
    )
}

export default DotSensor;