// src/components/ResetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', { email, newPassword });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-100">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mt-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-100">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full mt-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              placeholder="Enter your new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
          >
            Reset Password
          </button>
          {message && <p className="mt-4 text-center text-white">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
