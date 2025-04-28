import React from 'react';
import Register from './Register'; // asegúrate de usar export default en Register.jsx

const RegisterView = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500/40 to-purple-600/40 p-4">
    <div className="w-full max-w-md bg-white/10 border border-white/30 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Registrarse</h2>
      <Register />
    </div>
  </div>
);

export default RegisterView;
