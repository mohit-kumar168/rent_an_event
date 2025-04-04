import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import Nav from './Nav';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/rentanevent/traveller/login', 
        { email: username, password },
        { withCredentials: true }
      );
      if (response.data.responseMessage === 'Login Successful') {
        localStorage.setItem('userEmail', username);
        navigate('/'); // Redirect after login
      }
    } catch (err) {
      const errorMessage = err.response?.data?.responseMessage || 'Login failed';
      if (errorMessage.includes('User not found')) {
        setError("User not found. Please sign up.");
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <>
      <Nav />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Log In</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                LOG IN
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
              >
                RESET
              </button>
            </div>
            <Link to="/" className="block text-center mt-4 text-blue-500 hover:underline">
              Go Home
            </Link>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-700">New here?</p>
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
