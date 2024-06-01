import React from 'react';
import Signup from './Signup';
import PostList from './PostList';

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 py-6 shadow-lg mb-6">
        <h1 className="text-4xl text-center font-extrabold text-purple-500">MelodyVerse</h1>
        <p className="text-center text-gray-400 mt-2">Welcome to MelodyVerse, where music meets community.</p>
      </header>
      <main className="container mx-auto p-6">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-4">Join Us Today</h2>
          <p className="text-center text-gray-300 mb-6">Sign up now to join our vibrant community and share your musical journey.</p>
          <div className="flex justify-center">
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-4">Latest Posts</h2>
          <p className="text-center text-gray-300 mb-6">Check out the latest posts from our community members.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
