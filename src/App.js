import React, { useState } from 'react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-4">
      <div className="w-full max-w-lg bg-white/10 border border-white/30 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-8 transition-all duration-300 ease-in-out">
        
        {/* Título */}
        <h2 className="text-4xl font-bold mb-6 text-center transition-all duration-300 ease-in-out">
          {isLogin ? 'Iniciar sesión' : 'Registro'}
        </h2>

        {/* Formularios */}
        <div className="transition-all duration-500 ease-in-out">
          {isLogin ? <Login /> : <Register />}
        </div>

        {/* Botones para alternar entre Login y Register */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-semibold text-white/80 hover:text-white transition duration-300 ease-in-out underline hover:scale-105 transform"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
