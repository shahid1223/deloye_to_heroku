import React, { Fragment } from 'react'
import AuthenticationRoutesInfo from './AuthenticationRoutesInfo'

const DocumentionIndex = () => {
    return (
        <Fragment>
            <div className="flex flex-col justify-start items-start space-y-2">
                <h1 className="text-purple-900 font-bold text-2xl shadow-sm">How to use it</h1>
                <p className="text-gray-500 text-start text-sm shadow-sm">
                    fakeSocialMediaApi can be used with any type of Scial media project that needs login, post, line/unlike post data in JSON
                    format. you can use examples below to check how fakeSocialMediaApi works and feel free to enjoy it in your awesome
                    projects!
                </p>
            </div>
            <AuthenticationRoutesInfo />
        </Fragment>
    )
}

export default DocumentionIndex