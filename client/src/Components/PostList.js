import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './PostList.css'; // Ensure you have Tailwind CSS setup in your project

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's authentication status
  const navigate = useNavigate(); // Initialize the navigate function

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      setPosts(prevPosts => [...prevPosts, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchPosts(); // Fetch posts if the user is logged in
    } else {
      setIsLoggedIn(false);
    }
  }, [fetchPosts]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight * 0.9 && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Function to handle click event when user is not logged in
  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    setIsLoggedIn(false); // Update authentication status
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 py-6 shadow-lg">
        <h1 className="text-4xl text-center font-extrabold text-purple-500">MelodyVerse</h1>
      </header>
      <main className="p-6">
        {/* Conditionally render based on user's authentication status */}
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="absolute top-6 right-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <div key={post.id} className="post-card bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
                  <h2 className="text-2xl font-bold text-purple-400 mb-2">{post.title}</h2>
                  <p className="text-gray-300">{post.body}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center mt-6">
            <button onClick={handleLoginRedirect} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Please Log In First
            </button>
          </div>
        )}
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="loader"></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PostList;
