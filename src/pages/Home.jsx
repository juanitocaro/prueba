import React, { useState, useEffect } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);         // Estado para almacenar los datos del usuario
  const [newUsername, setNewUsername] = useState(''); // Estado para manejar el nuevo nombre de usuario
  const [newPassword, setNewPassword] = useState(''); // Estado para manejar la nueva contraseña
  const [message, setMessage] = useState('');     // Estado para mostrar mensajes de éxito o error

  // Fetch para obtener el usuario logueado al cargar el componente
  useEffect(() => {
    fetch('http://localhost:3001/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,  // Usar el token guardado en el localStorage
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error('Error fetching user data: ', err));
  }, []);

  // Función para actualizar el nombre de usuario
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

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);  // Actualiza los datos del usuario en el estado
        setMessage('Nombre de usuario actualizado exitosamente');
        setNewUsername('');     // Limpiar el campo del nombre
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Error al actualizar el nombre de usuario');
      }
    } catch (error) {
      setMessage('Error en la actualización del nombre de usuario');
      console.error(error);
    }
  };

  // Función para actualizar la contraseña
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

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);  // Actualiza los datos del usuario en el estado
        setMessage('Contraseña actualizada exitosamente');
        setNewPassword('');     // Limpiar el campo de la contraseña
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Error al actualizar la contraseña');
      }
    } catch (error) {
      setMessage('Error en la actualización de la contraseña');
      console.error(error);
    }
  };

  // Si el usuario no está logueado, muestra un mensaje
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl mb-6">Bienvenido, {user.username}</h1>

        {/* Mensajes de éxito o error */}
        {message && <p className="text-center text-red-500">{message}</p>}

        {/* Formulario para cambiar nombre de usuario */}
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

        {/* Formulario para cambiar contraseña */}
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
      </div>
    </div>
  );
};

export default Home;
