import React, { useState } from 'react';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { Container } from '../components/Container';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    return email.includes('@') && email.endsWith('.com');
  };

  const isValidPassword = (password) => {
    return (
      password.length > 5 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const handleSubmit = async () => {
    console.log("🔍 Validando datos...");

    if (!isValidEmail(form.email)) {
      setMessage({ text: '❌ Email inválido (debe tener @ y terminar en .com)', isError: true });
      return;
    }

    if (!isValidPassword(form.password)) {
      setMessage({ text: '❌ Contraseña inválida (mín. 6 caracteres, mayúscula, minúscula, número)', isError: true });
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ text: `❌ ${data.error}`, isError: true });
      } else {
        setMessage({ text: '✅ Inicio de sesión exitoso!', isError: false });
        // Redirección tras login
        setTimeout(() => {
          window.location.href = '/home';
        }, 1000);
      }
    } catch (error) {
      setMessage({ text: '❌ Error de conexión con el servidor', isError: true });
    }
  };

  return (
    <Container>
      <h2 className="bg-slate-700 text-cyan-500">Login</h2>
      <TextInput
        label="Email:"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <TextInput
        label="Contraseña:"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <Button text="Iniciar sesión" onClick={handleSubmit} />
      {message.text && (
        <p style={{ color: message.isError ? 'red' : 'green', marginTop: '10px' }}>
          {message.text}
        </p>
      )}
    </Container>
  );
};

export default Login;
