import express from 'express';
import Group from '../models/Group.js';

const router = express.Router();

// Obtener todos los grupos
router.get('/', async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

// Crear un grupo
router.post('/', async (req, res) => {
  const group = new Group(req.body);
  await group.save();
  res.status(201).json(group);
});

// Obtener un grupo por ID
router.get('/:id', async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).json({ error: 'No encontrado' });
  res.json(group);
});

// Actualizar un grupo
router.put('/:id', async (req, res) => {
  const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!group) return res.status(404).json({ error: 'No encontrado' });
  res.json(group);
});

// Eliminar un grupo
router.delete('/:id', async (req, res) => {
  const group = await Group.findByIdAndDelete(req.params.id);
  if (!group) return res.status(404).json({ error: 'No encontrado' });
  res.json({ message: 'Grupo eliminado' });
});

export default router; 