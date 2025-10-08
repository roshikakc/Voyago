import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/logo.png';
// import { FaHouseUser } from "react-icons/fa";

const Header = () => {

    // logging check
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <header>
            <div className='nav flex items-center justify-between py-1 px-6 w-full bg-[#C3CEDA] border-t-[1px] border-b-[1px] border-gray-300'>

                {/* logo */}
                <div className='flex item-center gap-3'>
                    <Link to='/home'>
                        <img src={logo} alt='Logo' className='w-24 h-24 object-contain' />
                    </Link>
                </div>

                {/* Nav links */}
                <ul className='flex items-center gap-4'>
                    <li>
                        <Link to="/home" className='text-[20px] text-[#0c4160] font-[600] '>Home</Link>
                    </li>
                    <li>
                        <Link to="/destination" className='text-[20px] text-[#0c4160] font-[600]'>Destination</Link>
                    </li>
                </ul>

                {/* Auth buttons */}
                <div className='flex items-center gap-3'>
                    {isLoggedIn ? (
                        <Link to='/profile'>
                            <FaHouseUser className='text-white w-8 h-8 cursor-pointer' />
                        </Link>
                    ) : (
                        <>
                            <Link to=""> <button className='btn'>Log in</button>
                            </Link>
                            <Link to=""> <button className='btn'>Sign up</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;
