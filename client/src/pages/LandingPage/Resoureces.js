import React, { Fragment } from 'react'

const Resoureces = () => {
    return (
        <Fragment>
            <div className='flex flex-col py-2 px-2'>
                <h1 className="text-xl font-bold text-purple-700" >Resoureces</h1>
                <h1 className="text-start lg:text-lg">There are numbers of main resoureces used in social media prototype</h1>
                <div className='my-2 w-full h-auto py-2 px-2 justify-center items-center space-y-2'>
                    <div className='flex justify-between'>
                        <h1 className="text-lg  text-blue-400" >Authentication</h1>
                        <h1 className="text-lg  text-black" >10 APIs</h1>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className="text-lg  text-blue-400" >FIle upload</h1>
                        <h1 className="text-lg  text-black" >4 APIs</h1>
                    </div>
                </div>
                <button className='bg-purple-700 text-white w-12 h-8 rounded-sm lg:w-14 lg:h-10'>Try it</button>
            </div>
        </Fragment>
    )
}

export default Resoureces