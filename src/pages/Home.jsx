import React, { useState, useEffect } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/user', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error('Error fetching user data:', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching all users:', err));
  }, []);

  const updateUsername = async () => {
    if (!newUsername) {
      setMessage('El nombre de usuario no puede estar vacío');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/user/username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setMessage('Nombre de usuario actualizado exitosamente');
        setNewUsername('');
      } else {
        setMessage(data.error || 'Error al actualizar el nombre de usuario');
      }
    } catch (error) {
      setMessage('Error en la actualización del nombre de usuario');
      console.error(error);
    }
  };

  const updatePassword = async () => {
    if (!newPassword) {
      setMessage('La contraseña no puede estar vacía');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setMessage('Contraseña actualizada exitosamente');
        setNewPassword('');
      } else {
        setMessage(data.error || 'Error al actualizar la contraseña');
      }
    } catch (error) {
      setMessage('Error en la actualización de la contraseña');
      console.error(error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl mb-6">Bienvenido, {user.username}</h1>
        {message && <p className="text-center text-red-500">{message}</p>}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Nuevo nombre de usuario:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full p-2 mt-2 border rounded-lg"
          />
          <button
            onClick={updateUsername}
            className="w-full mt-4 py-2 bg-green-500 text-white rounded-md"
          >
            Cambiar Nombre de Usuario
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Nueva contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 mt-2 border rounded-lg"
          />
          <button
            onClick={updatePassword}
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Cambiar Contraseña
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Todos los usuarios (desde DBeaver/Prisma)</h2>
          <ul className="space-y-1">
            {users.map((u) => (
              <li key={u.id} className="text-sm text-gray-700">
                • {u.name} - {u.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
