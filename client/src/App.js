import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import Signup from './Components/Signup';
import PostList from './Components/PostList';
import Home from './Components/Home';
import RouteLayout from './RouteLayout';
import PasswordReset from './Components/PasswordReset';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RouteLayout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="posts" element={<PostList />} /> {/* Protected route for PostList */}
          <Route path="reset-password" element={<PasswordReset />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
