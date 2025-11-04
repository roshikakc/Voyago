import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/image/logo.png';
import { FaHouseUser } from "react-icons/fa";
import axios from "axios";

const Header = () => {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

       useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await axios.get("http://localhost:5000/api/auth/me", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(res.data);
                } catch (err) {
                    console.error("Failed to fetch user:", err);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        fetchUser();

        window.addEventListener("userLogin", fetchUser);

        return () => window.removeEventListener("userLogin", fetchUser);
    }, []);

const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
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
                <li>
                    <Link to="/plan" className='text-[20px] text-[#0c4160] font-[600]'>Plan</Link>
                </li>
                <li>
                    <Link to="/itinerary" className='text-[20px] text-[#0c4160] font-[600]'>Itinerary</Link>
                </li>
                <li>
                    <Link to="/profile" className='text-[20px] text-[#0c4160] font-[600]'>Profile</Link>
                </li>
                <li>
                    <Link to="/destinationdetailspage" className='text-[20px] text-[#0c4160] font-[600]'>Details</Link>
                </li>
            </ul>

            {/* Auth buttons */}
            <div className='relative'>
                {user ? (
                    <div className='relative'>
                        <button className='flex items-center gap-2 text-[#0c4160'
                            onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <FaHouseUser size={30} />
                            <span className='text-[20px] text-[#000] font-[600]'>{user.name}</span>
                        </button>
                        {dropdownOpen && (
                            <div className='absolute right-0 mt-2 w-20 w-40 bg-white border rounded shadow-md'>
                                <button onClick={() => navigate("/profile")}
                                    className='block w-full text-left px-4 py-2 hover:bg-gray-100'>Profile</button>
                                <button onClick={handleLogout}
                                    className='block w-full text-left px-4 py-2 hover:bg-gray-100'>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='flex items-center gap-3'>
                        {/* when user is signed in */}


                        <Link to="/login" className='btn hover:bg-[#0000]!'>
                            Log in
                        </Link>

                        <Link to="/signup"> <button className='btn'>Sign up</button>
                        </Link>

                    </div>
                )}
            </div>
        </div>
    </header>
);
};

export default Header;
