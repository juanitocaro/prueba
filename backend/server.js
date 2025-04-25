import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

app.listen(4000, () => {
  console.log('Servidor backend corriendo en http://localhost:4000');
});
