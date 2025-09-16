import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Leader from '../models/Leader.js';
import Group from '../models/Group.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Registro de líder (solo admin debería usar esto en producción)
router.post('/register', async (req, res) => {
  const { name, email, password, groupId } = req.body;
  if (!name || !email || !password || !groupId) return res.status(400).json({ error: 'Faltan campos' });
  const group = await Group.findById(groupId);
  if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });
  const existing = await Leader.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email ya registrado' });
  const hash = await bcrypt.hash(password, 10);
  const leader = await Leader.create({ name, email, password: hash, group: groupId });
  res.status(201).json({ id: leader._id, name: leader.name, email: leader.email, group: leader.group });
});

// Login de líder
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const leader = await Leader.findOne({ email }).populate('group');
  if (!leader) return res.status(401).json({ error: 'Credenciales inválidas' });
  const valid = await bcrypt.compare(password, leader.password);
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
  const token = jwt.sign({ id: leader._id, group: leader.group._id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, leader: { id: leader._id, name: leader.name, email: leader.email, group: leader.group } });
});

// Middleware de autenticación
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.leader = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Perfil del líder autenticado
router.get('/me', auth, async (req, res) => {
  const leader = await Leader.findById(req.leader.id).populate('group');
  if (!leader) return res.status(404).json({ error: 'No encontrado' });
  res.json({ id: leader._id, name: leader.name, email: leader.email, group: leader.group });
});

export { auth };
export default router; 