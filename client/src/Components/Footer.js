import React, { Fragment } from 'react';
import heart from '../image/heart.png';
import coffeecup from '../image/coffee-cup.png';

const Footer = () => {
    return (
        <Fragment>
            <footer className="flex justify-center flex-col items-center bg-purple-100 w-full h-20 py-2 px-2 mb-1">
                <div className="flex justify-center items-center my-2">
                    <h1 className="text-sm  text-black" >Made with </h1>
                    <img src={heart} className="w-4 h-4 mx-1" />
                    <h1 className="text-sm  text-black" >by Mohd shahid</h1>
                </div>
                <div className="flex justify-center items-center">
                    <img src={coffeecup} className="w-4 h-4 mx-1" />
                    <h1 className="text-sm  text-purple-500" >Buy me a coffee</h1>
                </div>
            </footer>
        </Fragment>
    )
}

export default Footer