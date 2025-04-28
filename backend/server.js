import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';

const app = express();
const PORT = 4000;

// Configurar CORS para permitir el frontend en localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas de usuario
app.use('/api/users', usersRouter);

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

