import { useState } from 'react'
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function SignUp() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
        }

        try {
            const result = await signUp.create({
                emailAddress: email,
                password,

            });

            await setActive({ session: result.createdSessionId });
            navigate("/home");
        } catch (err) {
            setError(error.errors ? error.errors[0].message : "Signup failed");

        }
    };
    return (
       <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <form onSubmit={handleSubmit} className='bg-white p-8 rounded-xl shadow-md w-full max-w-md'>
            <h1 className='text-2xl font-semibold mb-3 text-center'>Sign Up</h1>

            <input type='email' placeholder='Email' className='w-full border border-gray-300 rounded-lg p-2 mb-3'
            value={email} onChange={(e)=> setEmail(e.target.value)} required/>

            <input type='password' placeholder='Password' className='w-full border border-gray-300 rounded-lg p-2 mb-3'
            value={password} onChange={(e)=> setPassword(e.target.value)} required/>

            <button type='submit' className='w-full border bg-[#0c4160] text-[#ccd8e4] text-bold text-xl py-2 rounded-md cursor-pointer '>Sign Up</button>

            <p className='text-center text-sm mt-4'> Already have an account? {""}
                <Link to="/log-in" className= "text-blue-600 hover:underline">Log In</Link>
            </p>
        </form>
    </div>
    );
}
