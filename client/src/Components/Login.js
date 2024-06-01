import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', values);
      console.log(response.data.message); // Log success message
      setSubmitting(false);
      // Save the token in localStorage or any other secure storage
      localStorage.setItem('token', response.data.token);
      navigate('/posts'); // Redirect to posts page on successful login
    } catch (error) {
      console.error('Error logging in:', error);
      setSubmitting(false);
      if (error.response && error.response.status === 404) {
        alert('User not found');
      } else {
        alert('Username/password is incorrect');
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 italic font-semibold text-lg fs-1">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form aria-label="Login Form">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-100">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  aria-label="Email"
                  aria-required="true"
                  className="block w-full mt-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-100">Password</label>
                <div className="relative">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    aria-label="Password"
                    aria-required="true"
                    className="block w-full mt-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 flex items-center px-4 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12a7 7 0 0114 0c0 1.66-1.05 3.11-2.61 3.65-.1.03-.21.05-.32.05H7.93c-.11 0-.22-.02-.32-.05C6.05 15.11 5 13.66 5 12zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM12 10a2 2 0 100-4 2 2 0 000 4z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14v2m0 0v2m0-2h2m-2 0H8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
