import React, { useState } from 'react';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { Container } from '../components/Container';

export const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validar email: debe contener @ y terminar en .com
  const isValidEmail = (email) => {
    return email.includes('@') && email.endsWith('.com');
  };

  // Validar password: mínimo 6 caracteres, mayúscula, minúscula, número
  const isValidPassword = (password) => {
    return (
      password.length > 5 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const handleSubmit = () => {
    console.log("🔍 Validando datos...");

    if (!isValidEmail(form.email)) {
      setMessage({ text: '❌ Email inválido (debe tener @ y terminar en .com)', isError: true });
      return;
    }

    if (!isValidPassword(form.password)) {
      setMessage({ text: '❌ Contraseña inválida (mín. 6 caracteres, mayúscula, minúscula, número)', isError: true });
      return;
    }

    console.log("✅ Datos correctos. Login exitoso.");
    setMessage({ text: '✅ Inicio de sesión exitoso!', isError: false });
  };

  return (
    <Container>
      <h2>Login</h2>
      <h1 className="text-3xl font-bold underline ">
      
    </h1>
      <TextInput label="Email:" type="email" name="email" value={form.email} onChange={handleChange} />
      <TextInput label="Contraseña:" type="password" name="password" value={form.password} onChange={handleChange} />
      <Button text="Iniciar sesión" onClick={handleSubmit} />
      {message.text && (
        <p style={{ color: message.isError ? 'red' : 'green', marginTop: '10px' }}>{message.text}</p>
      )}
    </Container>
  );
};
