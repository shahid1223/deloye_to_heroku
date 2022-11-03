import React, { Fragment } from 'react';
import Cube from '../../image/cube.png'

const AuthenticationRoutesInfo = () => {
    return (
        <Fragment>
            <div className="my-6">
                <div className='flex items-center space-x-2'>
                    <img src={Cube} alt="cube" className="w-6 h-6" />
                    <h1 className="text-purple-900 font-bold text-2xl shadow-sm">Authentication</h1>
                </div>
                <h1 className="text-gray-900 font-bold text-xl my-4">/login</h1>
            </div>
        </Fragment>
    )
}

export default AuthenticationRoutesInfo