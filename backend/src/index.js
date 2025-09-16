import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import personRoutes from './routes/person.js';
import groupRoutes from './routes/group.js';
import meetingRoutes from './routes/meeting.js';
import attendanceRoutes from './routes/attendance.js';
import leaderRoutes, { auth as leaderAuth } from './routes/leader.js';
import deletedPersonRoutes from './routes/deletedPerson.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/persons', personRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/leaders', leaderRoutes);
app.use('/api/deleted-persons', deletedPersonRoutes);

app.get('/api/test-db', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    res.json({ message: 'Conexión exitosa a MongoDB', collections: collections.map(c => c.name) });
  } catch (err) {
    res.status(500).json({ error: 'Error conectando a la BD', details: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('API backend funcionando');
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/asistencias', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en puerto ${PORT}`);
  });
})
.catch((err) => {
  console.error('Error conectando a MongoDB:', err);
}); 