import React, { useState } from 'react';

export const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setMessage('Todos los campos son obligatorios');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Usuario creado con éxito: ${data.name}`);
        setForm({ name: '', email: '', password: '' });
      } else {
        setMessage(data.error || 'Error al registrar usuario');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error al conectar con el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && <p className="text-red-400 text-sm text-center">{message}</p>}
      
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 rounded bg-white/20 border border-white/40 text-white placeholder-white/70"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 rounded bg-white/20 border border-white/40 text-white placeholder-white/70"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 rounded bg-white/20 border border-white/40 text-white placeholder-white/70"
      />

      <button
        type="submit"
        className="w-full bg-white text-purple-600 font-semibold py-2 rounded hover:bg-purple-100 transition"
      >
        Registrarse
      </button>
    </form>
  );
};

