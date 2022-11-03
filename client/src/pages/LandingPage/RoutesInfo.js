import React, { Fragment } from 'react';

const RoutesInfo = () => {

    const routesArray = [
        {
            methodType: "Athentication",
            endPointName: "7 APIs",
            info: "Signup,Login,Alluser, reset password send email, reset password and editeprofile"
        },
        {
            methodType: "File Upload",
            endPointName: "3  APIs",
            info: "Upload file, download file, show file"
        },
        {
            methodType: "Post",
            endPointName: "4 APIs",
            info: "Create, Update, View all, By:id, Delete"
        },
        {
            methodType: "Post like",
            endPointName: "2 APIs",
            info: "Like and Unlike"
        },
        {
            methodType: "Post comment",
            endPointName: "4 APIs",
            info: "Create, Update, View all, Delete"
        },
        {
            methodType: "Loged in user",
            endPointName: "2 APIs",
            info: "Details, Post posted by loged in user"
        }
    ];

    return (
        <Fragment>
            <div className='flex flex-col py-2 px-2'>
                <h1 className="text-xl font-bold text-purple-700" >Routes</h1>
                <div className='w-full h-auto justify-center items-center space-y-2'>
                    {routesArray.map((val, index) => {
                        return (
                            <div key={index} className="my-2">
                                <div className='flex justify-between'>
                                    <h1 className="text-md  text-blue-400 lg:text-lg" >{val.methodType}</h1>
                                    <h1 className="text-md  text-white rounded-sm bg-purple-700 w-auto h-auto py-1 px-1 lg:text-lg" >{val.endPointName}</h1>
                                </div>
                                <p className="text-sm  text-black lg:text-md" >{val.info}</p>
                            </div>
                        )
                    })}

                </div>
                <button className='bg-purple-700 text-white w-12 h-8 rounded-sm my-2 lg:w-14 lg:h-10'>Try it</button>
            </div>
        </Fragment>
    )
}

export default RoutesInfo