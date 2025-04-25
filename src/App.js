import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

const AuthSwitcher = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-4">
      <div className="w-full max-w-lg bg-white/10 border border-white/30 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-8 transition-all duration-300 ease-in-out">
        <h2 className="text-4xl font-bold mb-6 text-center">
          {isLogin ? 'Iniciar sesión' : 'Registro'}
        </h2>
        {isLogin ? <Login /> : <Register />}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-semibold text-white underline"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AuthSwitcher />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
);

export default App;
