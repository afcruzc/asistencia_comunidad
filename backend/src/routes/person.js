import express from 'express';
import Person from '../models/Person.js';
import mongoose from 'mongoose';

const router = express.Router();

// Obtener todas las personas
router.get('/', async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

// Crear una persona
router.post('/', async (req, res) => {
  try {
    const existing = await Person.findOne({
      $or: [
        { name: req.body.name },
        { personId: req.body.personId }
      ]
    });
    if (existing) {
      return res.status(400).json({ error: 'Ya existe una persona con este nombre o ID' });
    }
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear persona', details: err.message });
  }
});

// Obtener una persona por ID
router.get('/:id', async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person) return res.status(404).json({ error: 'No encontrado' });
  res.json(person);
});

// Actualizar una persona
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const existing = await Person.findOne({
      $or: [
        { name: req.body.name },
        { personId: req.body.personId }
      ],
      _id: { $ne: id }
    });
    if (existing) {
      return res.status(400).json({ error: 'Ya existe otra persona con este nombre o ID' });
    }
    const person = await Person.findByIdAndUpdate(id, req.body, { new: true });
    if (!person) return res.status(404).json({ error: 'No encontrado' });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar persona', details: err.message });
  }
});

// Eliminar (borrado lógico) una persona
router.delete('/:id', async (req, res) => {
  const person = await Person.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
  if (!person) return res.status(404).json({ error: 'No encontrado' });
  res.json({ message: 'Persona eliminada (lógico)' });
});

export default router; 