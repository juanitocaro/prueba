import React, { useState } from 'react';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { Container } from '../components/Container';

export const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState({ text: '', isError: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validar email: contiene @ y termina en .com
  const isValidEmail = (email) => {
    return email.includes('@') && email.endsWith('.com');
  };

  // Validar contraseña: min 6, mayúscula, minúscula, número
  const isValidPassword = (password) => {
    return (
      password.length > 5 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const handleSubmit = () => {
    console.log("🚀 Procesando registro...");

    if (!isValidEmail(form.email)) {
      setMessage({ text: '❌ Email inválido (debe tener @ y terminar en .com)', isError: true });
      return;
    }

    if (!isValidPassword(form.password)) {
      setMessage({
        text: '❌ Contraseña inválida (mín. 6 caracteres, mayúscula, minúscula, número)',
        isError: true,
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage({ text: '❌ Las contraseñas no coinciden', isError: true });
      return;
    }

    console.log("✅ Registro exitoso.");
    setMessage({ text: '✅ Registro completado con éxito!', isError: false });
  };

  return (
    <Container>
      <h2>Registro</h2>
      <TextInput label="Email:" type="email" name="email" value={form.email} onChange={handleChange} />
      <TextInput label="Contraseña:" type="password" name="password" value={form.password} onChange={handleChange} />
      <TextInput label="Confirmar Contraseña:" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
      <Button text="Registrarse" onClick={handleSubmit} />
      {message.text && (
        <p style={{ color: message.isError ? 'red' : 'green', marginTop: '10px' }}>{message.text}</p>
      )}
    </Container>
  );
};
