import React from 'react';
import Logo from '../image/social-media.png';

{/* <div className="bg-black w-12 h-12 rounded-sm">
    <img src={Logo} alt="" className="bg-white" />
</div> */}

const Navbar = () => {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className="w-12 h-12 rounded-sm">
                    <img src={Logo} alt="" className="" />
                </div>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <a className="mr-5 hover:text-gray-900">Home</a>
                    <a className="mr-5 hover:text-gray-900">Docs</a>
                    <a className="mr-5 hover:text-gray-900">Github</a>
                    <a className="mr-5 hover:text-gray-900">Buy me a coffee</a>
                </nav>
            </div>
        </header>
    )
}

export default Navbar