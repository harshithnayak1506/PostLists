// src/components/Signup.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'tailwindcss/tailwind.css';  // Ensure you have Tailwind CSS setup in your project

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password is too short - should be 6 chars minimum.').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  terms: Yup.bool().oneOf([true], 'Terms and Conditions must be accepted')
});

function Signup() {
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', values);
      console.log(response.data.message); // Log success message
      setSubmitting(false);
      resetForm();
      alert('Signup successful! A welcome email has been sent.');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      setSubmitting(false);
      if (error.response && error.response.status === 400) {
        alert('User with this email already exists. Please log in with this email.');
      } else {
        alert('An error occurred while signing up. Please try again later.');
      }
    }
  };
  

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 italic font-semibold text-lg fs-1">Signup</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-100">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="block w-full mt-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <ErrorMessage name="username" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-100">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="block w-full mt-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-100">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="block w-full mt-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-100">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="block w-full mt-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
              </div>
              <div className="mb-4 flex items-center ">
                <Field type="checkbox" name="terms" className="mr-2 " />
                <label htmlFor="terms" className="text-gray-100 hover:underline">Accept Terms and Conditions</label>
                <ErrorMessage name="terms" component="div" className="text-red-500 ml-2" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-3 bg-yellow-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <Link to="/reset-password" className="text--500 hover:underline">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
