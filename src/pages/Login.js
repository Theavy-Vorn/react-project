import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/actions/authAction';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogin } = useSelector(state => state.authReducer);

    const [user, setUser] = useState({
        email: 'theavyvorn@gmail.com',
        password: 'changeme',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (isLogin) {
            navigate('/');
        }
    }, [isLogin, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(user))
            .then(() => {
                console.log('Login successful');
            })
            .catch((err) => {
                console.error('Login failed', err);
            });
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        Remember me
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Sign In
                </button>
            </form>
        </main>
    );
}

export default Login;
