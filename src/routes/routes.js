import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from '../components/screens/Chat';
import CreatePost from '../components/screens/CreatePost';
import Home from '../components/screens/Home';
import HomeDetails from '../components/screens/HomeDetails';
import Login from '../components/screens/Login';
import Post from '../components/screens/Post';
import Profile from '../components/screens/Profile';
import Register from '../components/screens/Register';
import { UserContext } from '../hooks/UserContext';

function AppRoutes() {
  const [user] = useContext(UserContext);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/home/:postId" element={<HomeDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:conversationId" element={<Chat />} />
      <Route path="/post/new" element={<CreatePost />} />
      <Route exact path="/post" element={<Post />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRoutes;
