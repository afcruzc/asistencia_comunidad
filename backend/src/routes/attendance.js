import express from 'express';
import Attendance from '../models/Attendance.js';

const router = express.Router();

// Obtener todas las asistencias
router.get('/', async (req, res) => {
  const attendances = await Attendance.find().populate('meeting').populate('person');
  res.json(attendances);
});

// Crear una asistencia
router.post('/', async (req, res) => {
  const attendance = new Attendance(req.body);
  await attendance.save();
  res.status(201).json(attendance);
});

// Obtener una asistencia por ID
router.get('/:id', async (req, res) => {
  const attendance = await Attendance.findById(req.params.id).populate('meeting').populate('person');
  if (!attendance) return res.status(404).json({ error: 'No encontrado' });
  res.json(attendance);
});

// Actualizar una asistencia
router.put('/:id', async (req, res) => {
  const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!attendance) return res.status(404).json({ error: 'No encontrado' });
  res.json(attendance);
});

// Eliminar una asistencia
router.delete('/:id', async (req, res) => {
  const attendance = await Attendance.findByIdAndDelete(req.params.id);
  if (!attendance) return res.status(404).json({ error: 'No encontrado' });
  res.json({ message: 'Asistencia eliminada' });
});

export default router; 