import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function SignUpPage() {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        //validation
        if (!name.trim()){
            alert("Please enter your name.");
            return;
        }

        if(!emailRegex.test(email)){
            alert("Please enter a valid email addreess.");
            return;
        }

        if(password.length<6){
            alert("Password must be at least 6 characters long.");
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/signup", {
                name,email, password
            });

            alert(res.data.message || "Signup successful!");
            navigate('/log-in');
        }
        catch (e) {
            console.error("Signup error:", e);
            alert(e.response?.data?.message || "Signup failed.");

        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 pb-60'>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-xl shadow-md w-full max-w-md'>
                <h1 className='text-2xl font-semibold mb-3 text-center'>Sign Up</h1>

                <input type='text' placeholder='Username' className='w-full border border-gray-300 rounded-lg p-2 mb-3'
                    value={name} onChange={(e) => setname(e.target.value)} required />

                <input type='email' placeholder='Email' className='w-full border border-gray-300 rounded-lg p-2 mb-3'
                    value={email} onChange={(e) => setEmail(e.target.value)} required />

                <input type='password' placeholder='Password' className='w-full border border-gray-300 rounded-lg p-2 mb-3'
                    value={password} onChange={(e) => setPassword(e.target.value)} required />



                <button type='submit' className='w-full border bg-[#0c4160] text-[#ccd8e4] text-bold text-xl py-2 rounded-md cursor-pointer '>Sign Up</button>

                <p className='text-center text-sm mt-4'> Already have an account? {""}
                    <Link to="/log-in" className="text-blue-600 hover:underline">Log In</Link>
                </p>
            </form>
        </div>
    );
}

