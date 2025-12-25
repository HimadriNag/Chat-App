import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  },[checkAuth] );
  // App.jsx
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
    <Navbar />
    <Toaster />
    <Routes>
    
      <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />

      
      <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
      <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />

      <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
     </div>
  );

}

export default App

