import express from 'express';
import prisma from '../config/prisma.js';  // Correcta referencia a prisma

const router = express.Router();

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios', detalle: error.message });
  }
});

// POST - Crear un usuario nuevo
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const newUser = await prisma.user.create({
      data: { name, email, password }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario', detalle: error.message });
  }
});

export default router;
