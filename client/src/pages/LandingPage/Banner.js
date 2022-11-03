import React, { Fragment } from 'react';
import GithubPng from '../../image/github.png';
import BookPng from '../../image/book.png';
import Social_serenity from '../../image/social_serenity.png';

const Banner = () => {
    return (
        <Fragment>
            <div className="flex flex-col items-center md:flex-row ">
                <div className="flex flex-col py-2 px-2 items-center md:items-start">
                    <h1 className="text-xl font-bold lg:text-2xl" >Fake social media API</h1>
                    <h1 className="text-sm text-center md:text-start lg:text-lg" >Fake social media API for your social media website or app prototype</h1>
                    <div className="flex space-x-4 my-2">
                        <div className="bg-purple-700 w-36 h-10 rounded-sm flex items-center justify-between py-2 px-2 md:items-start lg:w-40 lg:h-12 lg:py-3 lg:px-3">
                            <h1 className="text-sm text-white" >View on github</h1>
                            <img src={GithubPng} alt="hello" className="w-6 h-6" />
                        </div>
                        <div className="bg-yellow-500 w-36 h-10 rounded-sm flex items-center justify-between py-2 px-2 lg:w-40 lg:h-12 lg:py-3 lg:px-3">
                            <h1 className="text-sm text-white" >Read docs</h1>
                            <img src={BookPng} alt="hello" className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                <div className="">
                    <img src={Social_serenity} />
                </div>

            </div>
            <div className="flex flex-col py-2 px-2 items-center my-2">
                <h1 className="text-md font-bold lg:text-lg" >Get tired of Lorem ipsum data?!</h1>
                <h1 className="text-md font-bold lg:text-lg" >Didn't you find any free social media API?!</h1>
                <h1 className="text-sm text-center lg:text-lg" >fakesocialmedia API is a free online REST API that you can use whenever you need Pseudo-real data for your social media website without running any server-side code. It's awesome for teaching purposes, sample codes, tests, etc.</h1>
            </div>
        </Fragment>
    )
}

export default Banner