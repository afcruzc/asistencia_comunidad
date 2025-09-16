import express from 'express';
import DeletedPerson from '../models/DeletedPerson.js';

const router = express.Router();

// Obtener todas las personas eliminadas
router.get('/', async (req, res) => {
  try {
    const deletedPeople = await DeletedPerson.find().sort({ deletedAt: -1 });
    res.json(deletedPeople);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener personas eliminadas' });
  }
});

// Crear una persona eliminada (para historial)
router.post('/', async (req, res) => {
  try {
    const deletedPerson = new DeletedPerson(req.body);
    await deletedPerson.save();
    res.status(201).json(deletedPerson);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar persona eliminada' });
  }
});

export default router;