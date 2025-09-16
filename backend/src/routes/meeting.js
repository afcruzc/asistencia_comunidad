import express from 'express';
import Meeting from '../models/Meeting.js';

const router = express.Router();

// Obtener todas las reuniones
router.get('/', async (req, res) => {
  const meetings = await Meeting.find();
  res.json(meetings);
});

// Crear una reunión
router.post('/', async (req, res) => {
  const meeting = new Meeting(req.body);
  await meeting.save();
  res.status(201).json(meeting);
});

// Obtener una reunión por ID
router.get('/:id', async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) return res.status(404).json({ error: 'No encontrado' });
  res.json(meeting);
});

// Actualizar una reunión
router.put('/:id', async (req, res) => {
  const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!meeting) return res.status(404).json({ error: 'No encontrado' });
  res.json(meeting);
});

// Eliminar una reunión
router.delete('/:id', async (req, res) => {
  const meeting = await Meeting.findByIdAndDelete(req.params.id);
  if (!meeting) return res.status(404).json({ error: 'No encontrado' });
  res.json({ message: 'Reunión eliminada' });
});

export default router; 