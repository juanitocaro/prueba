import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';  // Asegúrate de que esta ruta sea correcta

const app = express();
const PORT = 4000;

// Configurar CORS para permitir el frontend en localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Ruta raíz para prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

// Rutas de usuario (API)
app.use('/api/users', usersRouter);  // Aquí usamos el router de users.js

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
