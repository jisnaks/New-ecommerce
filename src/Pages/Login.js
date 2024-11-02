import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import login from '../assets/login.jpg';
import NavBar from '../Components/NavBar';
import { loginUser } from '../Redux/Actions/AuthActions';

function Login() {
    const { loading, error, loggedIn } = useSelector((state) => state.auth);
    const [inputDatas, setInputDatas] = useState({
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(error, 'error')
    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate]);

    const handleChange = (e) => {
        setInputDatas({ ...inputDatas, [e.target.name]: e.target.value });
    };

    const validateForm = (input) => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!input.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(input.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!input.password) {
            newErrors.password = 'Password is required';
        } else if (input.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(inputDatas);

        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        setFormErrors({});
        dispatch(loginUser(inputDatas));
        setInputDatas({ email: '', password: '' });
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="flex-1 bg-[#fad5d5] text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                            <img src={login} alt="Login Visual" />
                        </div>
                    </div>
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl text-[#F5AAAA] xl:text-3xl font-extrabold">Login</h1>
                            <div className="w-full flex-1 mt-8">
                                <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="email"
                                        name="email"
                                        value={inputDatas.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />
                                    {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        name="password"
                                        value={inputDatas.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                    />
                                    {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-5 tracking-wide font-semibold bg-[#F5AAAA] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </button>

                                    {error && (
                                        <p className="text-red-500 pt-4 text-center">{error} </p>
                                    )}

                                    <div className='pt-4 text-center'>
                                        <p>If not registered </p>
                                        <Link to="/register" className="text-blue-500 underline">
                                            Register here
                                        </Link>
                                    </div>

                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to abide by templatana's
                                        <a href="#" className="border-b border-gray-500 border-dotted"> Terms of Service </a>
                                        and its
                                        <a href="#" className="border-b border-gray-500 border-dotted"> Privacy Policy </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
