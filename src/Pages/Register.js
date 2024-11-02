import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Redux/Actions/AuthActions';
import Login from '../assets/login.jpg';
import NavBar from '../Components/NavBar';

function Register() {
    const [inputData, setInputData] = useState({
        name: '',
        age: '',
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState({}); // Improved readability

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, registered } = useSelector((state) => state.auth);

    useEffect(() => {
        if (registered) {
            navigate('/login');
        }
    }, [registered, navigate]);

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const validateForm = (input) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { name, age, email, password } = input;

        if (!name.trim()) errors.name = 'Name is required';
        if (!age) errors.age = 'Age is required';
        else if (isNaN(age) || age < 18) errors.age = 'Enter a valid age (18+)';
        
        if (!email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Invalid email format';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        } else if (!/(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/.test(password)) {
            errors.password = 'Password must contain a letter and a symbol';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(inputData);
        setFormError(errors);

        if (Object.keys(errors).length === 0) {
            dispatch(registerUser(inputData)).then((res) => {
                if (res && res.success) {
                    setInputData({ name: '', age: '', email: '', password: '' }); // Clear form on success
                    navigate('/');
                }
            });
        }
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="flex-1 bg-[#fad5d5] text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                            <img src={Login} alt="Login" />
                        </div>
                    </div>
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl text-[#F5AAAA] xl:text-3xl mx-auto font-extrabold">
                                Register
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="mx-auto max-w-xs">
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            className="w-full px-8 py-4 my-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="text"
                                            name="name"
                                            value={inputData.name}
                                            onChange={handleChange}
                                            placeholder="Name"
                                        />
                                        {formError.name && <p className="text-red-500">{formError.name}</p>}

                                        <input
                                            className="w-full px-8 py-4 my-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="number"
                                            name="age"
                                            value={inputData.age}
                                            onChange={handleChange}
                                            placeholder="Age"
                                        />
                                        {formError.age && <p className="text-red-500">{formError.age}</p>}

                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="email"
                                            name="email"
                                            value={inputData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                        />
                                        {formError.email && <p className="text-red-500">{formError.email}</p>}

                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="password"
                                            name="password"
                                            value={inputData.password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                        />
                                        {formError.password && <p className="text-red-500">{formError.password}</p>}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="mt-5 tracking-wide font-semibold bg-[#F5AAAA] text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        >
                                            {loading ? 'Registering...' : 'Register'}
                                        </button>

                                        {error && <p className="text-red-500 pt-4 text-center">{error.message}</p>}

                                        <p className="mt-6 text-xs text-gray-600 text-center">
                                            If you already have an account, <br />
                                            <Link to="/login" className="text-cyan-500 underline">
                                                Login
                                            </Link>
                                        </p>

                                        <p className="mt-6 text-xs text-gray-600 text-center">
                                            I agree to abide by Templatana's
                                            <a href="#" className="border-b border-gray-500 border-dotted">
                                                Terms of Service
                                            </a>{' '}
                                            and its{' '}
                                            <a href="#" className="border-b border-gray-500 border-dotted">
                                                Privacy Policy
                                            </a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
