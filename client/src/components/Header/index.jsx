import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/image/logo.png';
import { FaHouseUser } from "react-icons/fa";
import axios from "axios";
import {useAuth} from '../AuthContext'

const Header = () => {
    const { user, isAuthenticated, logout, loading } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logout click");
        logout();
        navigate("/");
    };

    if (loading) return null; // or spinner

    return (
        <header>
            <div className='nav flex items-center justify-between py-1 px-6 w-full bg-[#C3CEDA] border-t-[1px] border-b-[1px] border-gray-300'>

                {/* logo */}
                <Link to='/home'>
                    <img src={logo} alt='Logo' className='w-24 h-24 object-contain' />
                </Link>

                {/* Nav links */}
                <ul className='flex items-center gap-4'>
                    <li>
                        <Link to="/home" className='text-[20px] text-[#0c4160] font-[600]'>Home</Link>
                    </li>
                    <li>
                        <Link to="/destination" className='text-[20px] text-[#0c4160] font-[600]'>Destination</Link>
                    </li>
                </ul>

                {/* Auth buttons */}
                <div className='relative'>
                    {isAuthenticated ? (
                        <div>
                            <button
                                className='flex items-center gap-2 text-[#0c4160]'
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <FaHouseUser size={30} />
                                <span className='text-[20px] font-[600] text-[#0c4160]'>
                                    {user?.username || user.name || "User"}
                                </span>
                            </button>

                            {dropdownOpen && (
                                <div className='absolute right-0 mt-2 w-40 bg-white border rounded shadow-md'>
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            navigate("/profile")
                                        }}
                                        className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <Link to="/login" className='px-5 py-2 font-bold rounded-lg bg-[#0c4160] text-[#ccd8e4] hover:bg-[#134a7c] transition'>
                                Log in
                            </Link>
                            <Link to="/signup" className='px-5 py-2 font-bold rounded-lg bg-[#0c4160] text-[#ccd8e4] hover:bg-[#134a7c] transition'>
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

