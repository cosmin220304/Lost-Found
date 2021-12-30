import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from '../components/screens/Chat';
import Home from '../components/screens/Home';
import Login from '../components/screens/Login';
import Post from '../components/screens/Post';
import Profile from '../components/screens/Profile';

function routes() {
  const isAuth = false;

  if (!isAuth) {
    return <Login />;
  }

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/chat" element={<Chat />} />
      <Route exact path="/post" element={<Post />} />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default routes;
