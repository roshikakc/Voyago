import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/image/logo.png';

const Footer = () => {
    return (
        <footer className="border-t border-gray-300 py-4 px-6 flex items-center justify-center w-full">
            <Link to='/home'>
                <img src={logo} alt='Logo' className='w-24 h-24 object-contain' />
            </Link>

            <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} Voyago. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer;
