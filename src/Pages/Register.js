import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Features/Auth/AuthSlice';
import Login from '../assets/login.jpg'
import NavBar from '../Components/NavBar'
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [formError, setFormError] = useState(''); // To handle validation errors
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error,registered } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if (registered) {
            console.log(registered)
            navigate('/login');
        }
    }, [registered, navigate]);  // This will run when `registered` changes

    const handleSubmit = (e) => {
        e.preventDefault();

        // If everything is valid, dispatch the register action
        dispatch(registerUser({ name, email, password }));
    };
    return (
        <div>
            <NavBar />
            <div class="min-h-screen bg-gray-50 text-gray-900 flex justify-center">
                <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div class="flex-1 bg-[#fad5d5] text-center hidden lg:flex">
                        <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                            <img src={Login} />
                        </div>
                    </div>
                    <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

                        <div class="mt-12 flex flex-col items-cente">
                            <h1 class="text-2xl text-[#F5AAAA] xl:text-3xl mx-auto font-extrabold">
                                Register
                            </h1>
                            <div class="w-full flex-1 mt-8">

                                <div class="mx-auto max-w-xs">
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            class="w-full px-8 py-4 my-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="text" value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Name"
                                            required />
                                        <input
                                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            required />
                                        <input
                                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="password" value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            required />
                                        <button type="submit" disabled={loading}
                                            class="mt-5 tracking-wide font-semibold bg-[#F5AAAA] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            {/* <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg> */}
                                            {loading ? 'Registering...' : 'Register'}
                                        </button>
                                        <p class="mt-6 text-xs text-gray-600 text-center">If already have account<br/><Link to='/login'><span className='text-cyan-500 underline '>Login</span></Link></p>
                                        <p class="mt-6 text-xs text-gray-600 text-center">
                                            I agree to abide by templatana's
                                            <a href="#" class="border-b border-gray-500 border-dotted">
                                                Terms of Service
                                            </a>
                                            and its
                                            <a href="#" class="border-b border-gray-500 border-dotted">
                                                Privacy Policy
                                            </a>
                                        </p>
                                        {/* Display form validation errors */}
                                        {formError && <p style={{ color: 'red' }}>{formError}</p>}
                                        {/* Display backend errors */}
                                        {error && <p>{error.message}</p>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register
