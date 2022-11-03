import React, { Fragment } from 'react'

const ExampleCode = () => {
    return (
        <Fragment>
            <div className='flex flex-col items-start py-2 px-2'>
                <h1 className="text-xl font-bold text-purple-700" >Example Code</h1>
                <div className='flex flex-col my-2 bg-purple-100 w-full h-auto justify-center items-center py-2 px-2 md:justify-start md:items-start'>
                    <h1 className="text-center lg:text-md">fetch('https://fakestoreapi.com/products/1')</h1>
                    <h1 className="text-center lg:text-md">.then(res =>res.json())</h1>
                    <h1 className="text-center lg:text-md">.then(json => console.log(json))</h1>
                </div>
                <button className='bg-purple-700 text-white w-12 h-8 rounded-sm lg:w-14 lg:h-10'>Try it</button>
            </div>
        </Fragment>
    )
}

export default ExampleCode