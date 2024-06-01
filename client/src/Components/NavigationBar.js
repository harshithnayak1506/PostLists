import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <div className="bg-dark py-4 flex justify-between items-center">
      <div className="text-purple-500 pl-8">
        <blockquote className="italic font-semibold text-lg">
          "Where words fail, music speaks."
        </blockquote>
      </div>
      <ul className="flex space-x-4 pr-8">
        <li className="nav-item">
          <Link
            className="nav-link active px-4 py-2 bg-green-500 text-white rounded-md border-2 border-green-700 hover:bg-green-600 transition duration-300"
            to=""
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active px-4 py-2 bg-green-500 text-white rounded-md border-2 border-green-700 hover:bg-green-600 transition duration-300"
            to="signup"
          >
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active px-4 py-2 bg-green-500 text-white rounded-md border-2 border-green-700 hover:bg-green-600 transition duration-300"
            to="login"
          >
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active px-4 py-2 bg-green-500 text-white rounded-md border-2 border-green-700 hover:bg-green-600 transition duration-300"
            to="posts"
          >
            Post List
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationBar;
