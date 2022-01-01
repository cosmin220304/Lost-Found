import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from '../components/screens/Chat';
import Home from '../components/screens/Home';
import Login from '../components/screens/Login';
import Post from '../components/screens/Post';
import Profile from '../components/screens/Profile';
import { UserContext } from '../hooks/UserContext';

function AppRoutes() {
  const [user] = useContext(UserContext);

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:conversationId" element={<Chat />} />
      <Route path="/post" element={<Post />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRoutes;
